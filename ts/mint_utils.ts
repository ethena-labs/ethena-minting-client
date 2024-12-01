import "dotenv/config";
import {
  Address,
  createPublicClient,
  createWalletClient,
  Hex,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { ETHENA_MINTING_ABI } from "./minting_abi";
import {
  OrderSending,
  OrderSigning,
  Rfq,
  Side,
  SignatureType,
  Signature,
} from "./types";
import {
  DOMAIN,
  ETHENA_URL,
  RPC_URL,
  MINT_ADDRESS,
  ORDER_TYPE,
} from "./constants";

export async function getRfq(
  pair: string,
  type: string,
  side: "MINT" | "REDEEM",
  size: number,
  benefactor: Address
) {
  const response = await fetch(
    `${ETHENA_URL}rfq?pair=${pair}&type_=${type}&side=${side}&size=${size}&benefactor=${benefactor}`
  );
  return (await response.json()) as Rfq;
}

export async function createMintOrder(
  rfqData: Rfq,
  benefactor: Address,
  beneficiary: Address,
  collateralAsset: Address
): Promise<OrderSending> {
  const expiry = Math.floor(Date.now() / 1000) + 60;

  return {
    order_id: rfqData.rfq_id,
    order_type: Side.MINT,
    expiry,
    nonce: expiry,
    benefactor,
    beneficiary,
    collateral_asset: collateralAsset,
    collateral_amount: rfqData.collateral_amount,
    usde_amount: rfqData.usde_amount,
  };
}

export async function signOrder(
  order: OrderSigning,
  privateKey: string
): Promise<Signature> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(RPC_URL),
  });

  const walletClient = createWalletClient({
    chain: mainnet,
    transport: http(RPC_URL),
  });

  const account = privateKeyToAccount(privateKey as Hex);

  const orderHash = await publicClient.readContract({
    address: MINT_ADDRESS,
    abi: ETHENA_MINTING_ABI,
    functionName: "hashOrder",
    args: [
      {
        ...order,
      },
    ],
  });

  const signature = await walletClient.signTypedData({
    account,
    domain: DOMAIN,
    message: order,
    primaryType: "Order",
    types: ORDER_TYPE,
  });

  return {
    signature_type: SignatureType.EIP712,
    signature_bytes: signature,
  };
}

export async function submitOrder(order: OrderSending, signature: Signature) {
  const response = await fetch(
    `${ETHENA_URL}order?signature=${signature.signature_bytes}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...order,
      }),
    }
  );

  const result = await response.json();

  if ("error" in result) {
    console.error(result.error);
    throw new Error(result.error);
  }

  return result.tx;
}
