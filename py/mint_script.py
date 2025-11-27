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


def load_abi(file_path):
    """
    Load and return the ABI (Application Binary Interface) from a JSON file.

    Args:
        file_path (str): The path to the JSON file containing the ABI.

    Returns:
        dict: The ABI loaded from the file.
    """
    with open(file_path, encoding="utf-8") as f:
        return json.load(f)


class SignatureType(IntEnum):
    EIP712 = 0
    EIP1271 = 1


@dataclass(init=True, order=True)
class Signature:
    signature_type: SignatureType
    signature_bytes: bytes


ETHENA_URL = "https://public.api.ethena.fi/"
ETHENA_PRIVATE_URL = "https://private.api.ethena.fi/"
ALLOW_INFINITE_APPROVALS = False
USDE_ABI = load_abi("py/usde_abi.json")
ERC20_ABI = load_abi("py/erc20_abi.json")
MINT_ABI = load_abi("py/mint_abi.json")
MINT_ADDRESS = Web3.to_checksum_address("0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3")
USDE_ADDRESS = Web3.to_checksum_address("0x4c9EDD5852cd905f086C759E8383e09bff1E68B3")
USDT_ADDRESS = Web3.to_checksum_address("0xdAC17F958D2ee523a2206206994597C13D831ec7")
# LLRewards multisig address
MULTISIG_ADDRESS = Web3.to_checksum_address(
    "0xf19c433C6b288e487b767595886321F89A3cBf17"
)

# # Partner Rewards multi-sig
# MULTISIG_ADDRESS = Web3.to_checksum_address(
#     "0xD0Ec8CC7414f27CE85f8dEce6B4a58225F273311"
# )

TYPE_ = "ALGO"

MINT_BLOCK_LIMIT = 200_000_000


if __name__ == "__main__":
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    # your own private key. If you trade through smart contract and use delegateSigner, the private key of your delegated signer
    # pylint: disable=no-value-for-parameter
    acc = Account.from_key(PRIVATE_KEY)
    MINTING_CONTRACT = w3.eth.contract(address=MINT_ADDRESS, abi=MINT_ABI)

    USDT_CONTRACT = w3.eth.contract(address=USDT_ADDRESS, abi=ERC20_ABI)

    while True:
        multisig_usdt_bal = int(
            USDT_CONTRACT.functions.balanceOf(MULTISIG_ADDRESS).call() / 10**6
        )

        multisig_usdt_bal = min(multisig_usdt_bal, MINT_BLOCK_LIMIT)

        print("Multisig USDT balance: ", multisig_usdt_bal)

        rfq_url = f"{ETHENA_URL}rfq?pair=USDT/USDe&type_={TYPE_}&side=MINT&size={multisig_usdt_bal}&benefactor={MULTISIG_ADDRESS}"
        response = requests.get(rfq_url, timeout=5)
        rfq_data = response.json()

        print("rfq_data", rfq_data)
        print(f"Multisig address: {MULTISIG_ADDRESS} | Delegated Signer: {acc.address}")

        # order object sent back to /order endpoint
        mint_order = {
            "order_id": str(rfq_data["rfq_id"]),
            "order_type": rfq_data["side"],
            "expiry": int(time.time() + 60),
            "nonce": int(time.time() + 60),
            "benefactor": MULTISIG_ADDRESS,
            "beneficiary": MULTISIG_ADDRESS,
            "collateral_asset": USDT_ADDRESS,
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
            str(
                mint_order["order_id"]
            ),  # string order_id, use RFQ ID from /rfq payload
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

        order_hash = MINTING_CONTRACT.functions.hashOrder(order_tuple).call()
        # Convert the hash to SignableMessage format
        # pylint: disable=no-member
        order_signed = acc.signHash(order_hash)
        order_rsv = (
            to_bytes(order_signed.r)
            + to_bytes(order_signed.s)
            + to_bytes(order_signed.v)
        )
        print("tuple", order_tuple)
        print("rsv", order_rsv)
        signature = Signature(SignatureType.EIP712, order_rsv)

        signature_hex = to_hex(signature.signature_bytes)
        print("hex", signature_hex)

        url = f"""{ETHENA_URL}order?signature={signature_hex}"""
        response = requests.post(url, json=mint_order, timeout=60)
        if "error" in response.json():
            print(response.json()["error"])
        else:
            tx_id = response.json()["tx"]
            print(f"https://etherscan.io/tx/{tx_id}")

        time.sleep(15)
