import requests
from eth_account import Account
from eth_account.signers.local import LocalAccount
from eth_utils import to_hex, to_bytes
from web3 import Web3
import json
import time
import redis
from dotenv import load_dotenv
import os

load_dotenv()
CMC_API_KEY = os.getenv('CMC_API_KEY')
INFURA_API_KEY = os.getenv('INFURA_API_KEY')
GATEKEEPER_PKEY = os.getenv('GATEKEEPER_PKEY')
gatekeeper: LocalAccount = Account.from_key(GATEKEEPER_PKEY)

last_processed_block = 0
cmc = f'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY={CMC_API_KEY}&id=1027'

collateral_map = {
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84': 'stETH'
}

cumulative_loss_duration = 60 * 30 # 30 mins
allowed_cumulative_loss = 50000
trigger_threshold = 0.03 # Disables on chain mint/redeems if 3% threshold exceeded
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

w3 = Web3(Web3.HTTPProvider(f'https://mainnet.infura.io/v3/{INFURA_API_KEY}'))

with open('defi_mint_abi.json') as f:
    mint_abi = json.load(f)

defi_minting_contract = w3.eth.contract(address='0x980C680a90631c8Ea49fA37B47AbC3154219EC1a', abi=mint_abi)

def get_cmc_price():
    res = requests.get(cmc)
    if res.status_code != 200:
        return 0
    return round(json.loads(res.text)['data']['1027']['quote']['USD']['price'], 4)

def get_coingecko_price():
    return 0

def invalid_collateral_alert(order):
    pass

def slack_alert(alert_level, msg):
    print(alert_level, msg)

def disable_contract():
    nonce = w3.eth.get_transaction_count(gatekeeper.address)
    transaction = defi_minting_contract.functions.disableMintRedeem().build_transaction({
        'chainId': 1,
        'gas': 50000,
        'gasPrice': w3.to_wei(777, 'gwei'),
        'from': gatekeeper.address,
        'nonce': nonce
    })
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=GATEKEEPER_PKEY)
    sent_tx = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_hash = w3.to_hex(sent_tx)
    slack_alert('CONTRACT DISABLED', f'tx: {tx_hash}')


def check_cumulative_loss():
    total_loss = 0
    num_loss_tx = 0
    for key in r.scan_iter('loss*'):
        total_loss += float(r.get(key))
        num_loss_tx += 1
    if total_loss > allowed_cumulative_loss/10:
        print(f'Over last 30m, cumulative loss: {total_loss}. num loss tx: {num_loss_tx}')
    if total_loss > allowed_cumulative_loss:
        disable_contract()
        slack_alert('CONTRACT DISABLED', f'''Cumulative loss of ${total_loss}. Risk exceeded''')

if __name__ == '__main__':
    while True:
        try:
            time.sleep(1)
            current_block = w3.eth.get_block_number()
            if current_block <= last_processed_block:
                continue
            last_processed_block = current_block
            print("new block", current_block)
            eth_price = get_cmc_price()
            if eth_price == 0:
                eth_price = get_coingecko_price()
            if eth_price == 0:
                slack_alert("GATEKEEPER NOT WORKING", "Unable to retrieve cmc/coingecko eth price")
                continue
            print('ETH price now: $', eth_price)

            mints = defi_minting_contract.events.Mint().get_logs(fromBlock=current_block)
            redeems = defi_minting_contract.events.Redeem().get_logs(fromBlock=current_block)
            for mint in mints:
                if mint.args.collateral_asset not in collateral_map:
                    invalid_collateral_alert(mint)
                collateral_amount = round(mint.args.collateral_amount/10**18, 4)
                mint_price = round(mint.args.usde_amount/mint.args.collateral_amount, 4)
                usde_minted = round(mint.args.usde_amount/10**18, 4)
                if mint_price > eth_price:
                    loss = round((mint_price - eth_price) * collateral_amount, 2)
                    r.setex(f'loss-mint-{w3.to_hex(mint.transactionHash)}', cumulative_loss_duration, loss)
                    slack_alert('warning', f'''Loss of ${loss}. Minted {usde_minted} USDe with {collateral_amount}{collateral_map[mint.args.collateral_asset]}. Mint price: ${mint_price}.txhash {w3.to_hex(mint.transactionHash)}''')
                if mint_price > (1 + trigger_threshold)*eth_price:
                    disable_contract()

            for redeem in redeems:
                if redeem.args.collateral_asset not in collateral_map:
                    invalid_collateral_alert(redeem)
                collateral_amount = round(redeem.args.collateral_amount/10**18, 4)
                redeem_price = round(redeem.args.usde_amount/redeem.args.collateral_amount, 4)
                usde_redeemed = round(redeem.args.usde_amount/10**18, 4)
                if redeem_price < eth_price:
                    loss = round((eth_price - redeem_price) * collateral_amount, 2)
                    r.setex(f'loss-redeem-{w3.to_hex(redeem.transactionHash)}', cumulative_loss_duration, loss)
                    slack_alert('warning', f'''Loss of ${loss}. Redeemed {collateral_amount} {collateral_map[redeem.args.collateral_asset]} with {usde_redeemed} USDe. Redeem price: ${redeem_price}. txhash {w3.to_hex(redeem.transactionHash)}''')
                if redeem_price < (1 - trigger_threshold)*eth_price:
                    disable_contract()

            check_cumulative_loss()
        except Exception as e:
            slack_alert("GATEKEEPER EXCEPTION", e)

