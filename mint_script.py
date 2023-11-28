import requests
from eth_account import Account
from eth_account.signers.local import LocalAccount
from eth_utils import to_hex, to_bytes
from web3 import Web3
import json
import time
from enum import Enum, IntEnum
from dataclasses import dataclass, asdict
import os
from dotenv import load_dotenv

load_dotenv()
ETH_NODE_URL = os.getenv('ETH_NODE_URL')
PKEY = os.getenv('PKEY')

# Example end to end mint of 0.04 stETH to USDe
# Enter your private key in line 45.

class SignatureType(IntEnum):
    EIP712 = 0


@dataclass(init=True, order=True)
class Signature:
    signature_type: 0
    signature_bytes: bytes


ethena_url = 'https://api.ethena.fi/'

if __name__ == "__main__":
    with open('defi_mint_abi.json') as f:
        mint_abi = json.load(f)

    with open('defi_usde_abi.json') as f:
        usde_abi = json.load(f)

    w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/841afbfb8c1446a2a5601c19f9dc7777'))

    defi_minting_contract = w3.eth.contract(address='0x2CC440b721d2CaFd6D64908D6d8C4aCC57F8Afc3', abi=mint_abi)
    usde_contract = w3.eth.contract(address='0x4c9EDD5852cd905f086C759E8383e09bff1E68B3', abi=usde_abi)
    stETH_address = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'

    rfq_pair = 'stETH/USDe'

    rfq_url = f'{ethena_url}rfq?pair={rfq_pair}&side=MINT&size=0.1'
    response = requests.get(rfq_url)
    rfq_data = response.json()

    # your own private key. If you trade through smart contract and use delegateSigner, the private key of your delegated signer
    acc: LocalAccount = Account.from_key(PKEY)
    print('rfq_data', rfq_data)
    print(acc.address)

    # order object sent back to /order endpoint
    mint_order = {
        "order_type": "MINT",
        "expiry": int(time.time() + 90),
        "nonce": int(time.time() + 90),
        "benefactor": acc.address,
        "beneficiary": acc.address,
        "collateral_asset": stETH_address,
        "collateral_amount": int(rfq_data['collateral_amount']),
        "usde_amount": int(rfq_data['usde_amount'])
    }

    # EIP712 signature struct
    # "Order(
    # uint8 order_type,
    # uint256 expiry,
    # uint256 nonce,
    # address benefactor,
    # address beneficiary,
    # address collateral_asset,
    # uint256 collateral_amount,
    # uint256 usde_amount)"

    # Tuple for signing
    order_tuple = (
        0 if mint_order['order_type'].upper() == "MINT" else 1,  # uint8 order_type, 0 for mint, 1 for redeem
        mint_order['expiry'],  # uint256 expiry, use current time + 60s
        mint_order['nonce'],  # uint256 nonce, use unique int for each order (eg timestamp)
        w3.to_checksum_address(mint_order['benefactor']),
        # address benefactor, address where token is taken out of. stETH for mint, USDe for redeem
        w3.to_checksum_address(mint_order['beneficiary']),
        # address beneficiary, address where incoming token is received. USDe for mint, stETH for redeem
        w3.to_checksum_address(mint_order['collateral_asset']),  # address collateral_asset, stETH address
        mint_order['collateral_amount'],  # uint256 collateral_amount, use exact value provided in RFQ
        mint_order['usde_amount']  # uint256 usde_amount, use exact value provided in RFQ
    )

    order_hash = defi_minting_contract.functions.hashOrder(order_tuple).call()
    order_signed = acc.signHash(order_hash)
    order_rsv = to_bytes(order_signed.r) + to_bytes(order_signed.s) + to_bytes(order_signed.v)
    print('tuple', order_tuple)
    print('rsv', order_rsv)
    signature = Signature(SignatureType.EIP712, order_rsv)

    signature_hex = to_hex(signature.signature_bytes)
    print('hex', signature_hex)

    url = f'''{ethena_url}order?signature={signature_hex}&rfq_id={rfq_data['rfq_id']}'''
    response = requests.post(url, json=mint_order)
    tx_id = response.json()
    print(tx_id)
