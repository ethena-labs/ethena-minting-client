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
AMOUNT = 25
USDE_ABI = load_abi("py/usde_abi.json")
MINT_ABI = load_abi("py/mint_abi.json")
MINT_ADDRESS = Web3.to_checksum_address(
    "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3"
)
USDE_ADDRESS = Web3.to_checksum_address(
    "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3"
)
USDT_ADDRESS = Web3.to_checksum_address(
    "0xdAC17F958D2ee523a2206206994597C13D831ec7"
)

def get_allowance(w3, collateral_address: str):
    """
    Retrieves the token allowance for the minting address.

    Args:
        w3 (Web3): The Web3 instance connected to the blockchain.
        collateral_address (str): The address of the ERC-20 token contract.

    Returns:
        int: The allowance value for the minting address.
    """
    # pylint: disable=no-value-for-parameter
    account = Account.from_key(PRIVATE_KEY)

    allowance_contract = w3.eth.contract(
        address=Web3.to_checksum_address(collateral_address), abi=USDE_ABI
    )

    allowance = allowance_contract.functions.allowance(
        account.address, MINT_ADDRESS
    ).call()
    return allowance

def big_int_amount(amount: int):
    """
    Converts an integer amount to a larger value by multiplying it by 10^6.

    Args:
        amount (int): The base integer value to be converted.

    Returns:
        int: The scaled-up value.
    """
    return amount * (10**6)

def approve(w3, collateral_address: str, private_key: str, amount: int):
    """
    Approves a specified amount of tokens for a spender to transfer on behalf of the caller.

    This function interacts with an ERC-20 token contract to approve the `MINTING_ADDRESS`
    to spend a specific `amount` of tokens from the caller's address.

    Args:
        w3 (Web3): An instance of the Web3 class to interact with the Ethereum blockchain.
        collateral_address (str): The address of the ERC-20 token contract.
        private_key (str): The private key of the caller's wallet used to sign the transaction.
        amount (int): The amount of tokens to approve for spending.

    Returns:
        str: The transaction hash of the sent approval transaction.

    Raises:
        Exception: If the transaction fails due to network or contract issues.
    """
    contract = w3.eth.contract(
        address=Web3.to_checksum_address(collateral_address), abi=USDE_ABI
    )
    print("SUBMITTING APPROVAL", amount)
    transaction = contract.functions.approve(MINT_ADDRESS, amount)
    account = Account.from_key(PRIVATE_KEY)  # pylint: disable=no-value-for-parameter

    tx = transaction.build_transaction(
        {
            "from": account.address,
            "value": 0,
            "nonce": w3.eth.get_transaction_count(account.address),
        }
    )

    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    # wait for the transaction to be mined
    w3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_hash.hex()

if __name__ == "__main__":
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    # your own private key. If you trade through smart contract and use delegateSigner, the private key of your delegated signer
    # pylint: disable=no-value-for-parameter
    acc = Account.from_key(PRIVATE_KEY)
    MINTING_CONTRACT = w3.eth.contract(address=MINT_ADDRESS, abi=MINT_ABI)

    allowance = get_allowance(w3, USDT_ADDRESS)
    print("ALLOWANCE", allowance)

    if allowance < big_int_amount(AMOUNT):
        print("ALLOWANCE IS LESS THAN AMOUNT")
        APPROVAL_AMOUNT = (
            (2**256) - 1 if ALLOW_INFINITE_APPROVALS else big_int_amount(AMOUNT)
        )

        print("APPROVAL AMOUNT", APPROVAL_AMOUNT)

        # Reset allowance to 0 first if there's an existing allowance (required for USDT)
        if allowance > 0:
            print("RESETTING ALLOWANCE TO 0 FIRST (REQUIRED FOR USDT)")
            reset_tx_hash = approve(w3, USDT_ADDRESS, PRIVATE_KEY, 0)
            print(f"Allowance reset submitted: https://etherscan.io/tx/{reset_tx_hash}")

        tx_hash = approve(w3, USDT_ADDRESS, PRIVATE_KEY, APPROVAL_AMOUNT)
        print(f"Approval submitted: https://etherscan.io/tx/{tx_hash}")

    TYPE_ = "ALGO"
    rfq_url = f"{ETHENA_URL}rfq?pair=USDT/USDe&type_={TYPE_}&side=MINT&size={AMOUNT}&benefactor={acc.address}"
    response = requests.get(rfq_url, timeout=5)
    rfq_data = response.json()

    print("rfq_data", rfq_data)
    print(acc.address)

    # order object sent back to /order endpoint
    mint_order = {
        "order_id": str(rfq_data["rfq_id"]),
        "order_type": rfq_data["side"],
        "expiry": int(time.time() + 60),
        "nonce": int(time.time() + 60),
        "benefactor": acc.address,
        "beneficiary": acc.address,
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

    order_hash = MINTING_CONTRACT.functions.hashOrder(order_tuple).call()
    # Convert the hash to SignableMessage format
    # pylint: disable=no-member
    order_signed = acc.signHash(order_hash)
    order_rsv = (
        to_bytes(order_signed.r) + to_bytes(order_signed.s) + to_bytes(order_signed.v)
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
