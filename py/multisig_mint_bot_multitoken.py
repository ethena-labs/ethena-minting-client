import json
import os
import time
from dataclasses import dataclass
from enum import IntEnum

import requests
from dotenv import load_dotenv, find_dotenv
from eth_account import Account
from eth_utils import to_hex, to_bytes
from web3 import Web3

env_path = find_dotenv()
load_dotenv(env_path)
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
RPC_URL = os.getenv("RPC_URL")


class SignatureType(IntEnum):
    EIP712 = 0
    EIP1271 = 1


@dataclass(init=True, order=True)
class Signature:
    signature_type: SignatureType
    signature_bytes: bytes


ethena_url = "https://public.api.ethena.fi/"
ethena_private_url = "https://private.api.ethena.fi/"
w3 = Web3(Web3.HTTPProvider(RPC_URL))
with open("py/mint_abi.json", encoding="utf-8") as f:
    mint_abi = json.load(f)

with open("py/usde_abi.json", encoding="utf-8") as f:
    usde_abi = json.load(f)

with open("py/erc20_abi.json", encoding="utf-8") as f:
    erc20_abi = json.load(f)

usdt_address = Web3.to_checksum_address("0xdAC17F958D2ee523a2206206994597C13D831ec7")
usdc_address = Web3.to_checksum_address('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
mint_address = Web3.to_checksum_address("0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3")
usde_address = Web3.to_checksum_address("0x4c9EDD5852cd905f086C759E8383e09bff1E68B3")
mint_token_map = {
    "USDT": {"address": usdt_address, "contract": w3.eth.contract(address=usdt_address, abi=erc20_abi), "decimals": 6},
    "USDC": {"address": usdc_address, "contract": w3.eth.contract(address=usdc_address, abi=erc20_abi), "decimals": 6}
}
defi_minting_contract = w3.eth.contract(address=mint_address, abi=mint_abi)
multisig = Web3.to_checksum_address("0xD0Ec8CC7414f27CE85f8dEce6B4a58225F273311")  # partner rewards multisig
type_ = "ALGO"
mint_block_limit = 10_000_000

if __name__ == "__main__":
    while True:
        try:

            for token in mint_token_map:
                multisig_mint_token_bal = int(mint_token_map[token]["contract"].functions.balanceOf(multisig).call() /
                                              10 ** mint_token_map[token]["decimals"])
                print(mint_token_map[token]["address"], "token bal", multisig_mint_token_bal)
                if multisig_mint_token_bal > mint_block_limit:
                    multisig_mint_token_bal = mint_block_limit
                if multisig_mint_token_bal < 1000:
                    time.sleep(10)
                    continue

                rfq_url = f"{ethena_url}rfq?pair={token}/USDe&type_={type_}&benefactor={multisig}&side=MINT&size={multisig_mint_token_bal}"
                response = requests.get(rfq_url, timeout=5)
                rfq_data = response.json()

                # your own private key. If you trade through smart contract and use delegateSigner, the private key of your delegated signer
                # pylint: disable=no-value-for-parameter
                acc = Account.from_key(PRIVATE_KEY)
                print("rfq_data", rfq_data)
                print(acc.address)

                # order object sent back to /order endpoint
                mint_order = {
                    "order_id": str(rfq_data["rfq_id"]),
                    "order_type": "MINT",
                    "expiry": int(time.time() + 60),
                    "nonce": int(time.time() + 60),
                    "benefactor": multisig,
                    "beneficiary": multisig,
                    "collateral_asset": mint_token_map[token]["address"],
                    "collateral_amount": int(rfq_data["collateral_amount"]),
                    "usde_amount": int(rfq_data["usde_amount"]),
                }

                # EIP712 signature struct
                # "Order(
                # string order_id,
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
                    str(mint_order["order_id"]),  # string order_id, use RFQ ID from /rfq payload
                    (
                        0 if mint_order["order_type"].upper() == "MINT" else 1
                    ),  # uint8 order_type, 0 for mint, 1 for redeem
                    mint_order["expiry"],  # uint256 expiry, use current time + 60s
                    mint_order[
                        "nonce"
                    ],  # uint256 nonce, use unique int for each order (eg timestamp)
                    w3.to_checksum_address(mint_order["benefactor"]),
                    # address benefactor, address where token is taken out of. stETH for mint, USDe for redeem
                    w3.to_checksum_address(mint_order["beneficiary"]),
                    # address beneficiary, address where incoming token is received. USDe for mint, stETH for redeem
                    w3.to_checksum_address(
                        mint_order["collateral_asset"]
                    ),  # address collateral_asset, stETH address
                    mint_order[
                        "collateral_amount"
                    ],  # uint256 collateral_amount, use exact value provided in RFQ
                    mint_order[
                        "usde_amount"
                    ],  # uint256 usde_amount, use exact value provided in RFQ
                )

                order_hash = defi_minting_contract.functions.hashOrder(order_tuple).call()
                # Convert the hash to SignableMessage format
                # pylint: disable=no-member
                order_signed = acc.unsafe_sign_hash(order_hash)
                order_rsv = (
                    to_bytes(order_signed.r) + to_bytes(order_signed.s) + to_bytes(order_signed.v)
                )
                print("tuple", order_tuple)
                print("rsv", order_rsv)
                signature = Signature(SignatureType.EIP712, order_rsv)

                signature_hex = to_hex(signature.signature_bytes)
                print("hex", signature_hex)

                url = f"""{ethena_url}order?signature={signature_hex}"""
                response = requests.post(url, json=mint_order, timeout=60)
                if "error" in response.json():
                    print(response.json()["error"])
                else:
                    tx_id = response.json()["tx"]
                    print(f"https://etherscan.io/tx/{tx_id}")
                time.sleep(15)

        except Exception as e:
            print(e)