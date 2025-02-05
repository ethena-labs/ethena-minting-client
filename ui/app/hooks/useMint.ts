import {
  PAIR_TOKENS,
  MINTING_TOKEN_NAME,
  MINTING_TOKEN_URL,
  DOMAIN,
  MINTING_ADDRESS,
  MINTING_ABI,
  TOKEN_AMOUNT_FIELD,
} from "@/app/constants/app-config";
import { Address } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { toast } from "react-toastify";
import { parseScientificOrNonScientificToBigInt } from "@/app/utils/parseScientificToBigInt";
import { useState } from "react";
import { TransactionToast } from "@/app/components/Toast";

export interface Rfq {
  collateral_asset: Address;
  [TOKEN_AMOUNT_FIELD]: string;
  gas: number;
  pair: string;
  collateral_amount: string;
  rfq_id: string;
  side: "MINT";
  size: number;
}

export const ORDER_TYPE = {
  Order: [
    { name: "order_id", type: "string" },
    { name: "order_type", type: "uint8" },
    { name: "expiry", type: "uint128" },
    { name: "nonce", type: "uint120" },
    { name: "benefactor", type: "address" },
    { name: "beneficiary", type: "address" },
    { name: "collateral_asset", type: "address" },
    { name: "collateral_amount", type: "uint128" },
    { name: [TOKEN_AMOUNT_FIELD], type: "uint128" },
  ],
} as const;

export const useMint = ({
  amount,
  selectedTokenAddress,
}: {
  amount: number;
  selectedTokenAddress: Address;
}) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const publicClient = usePublicClient();
  const tokenName = PAIR_TOKENS.find(
    (token) => token.address === selectedTokenAddress
  )?.name;
  const pair = `${tokenName}/${MINTING_TOKEN_NAME}`;

  const createMintOrder = (rfqData: Rfq) => {
    const expiry = Math.floor(Date.now() / 1000) + 60;

    return {
      order_id: rfqData.rfq_id,
      order_type: rfqData.side,
      expiry,
      nonce: expiry,
      benefactor: address as Address,
      beneficiary: address as Address,
      collateral_asset: selectedTokenAddress,
      collateral_amount: rfqData.collateral_amount,
      [TOKEN_AMOUNT_FIELD]: rfqData[TOKEN_AMOUNT_FIELD],
    };
  };

  const createOrderSigning = (order: ReturnType<typeof createMintOrder>) => {
    return {
      ...order,
      nonce: BigInt(order.nonce),
      order_type: 0,
      expiry: BigInt(order.expiry),
      [TOKEN_AMOUNT_FIELD]: parseScientificOrNonScientificToBigInt(
        order[TOKEN_AMOUNT_FIELD]
      ),
      collateral_amount: parseScientificOrNonScientificToBigInt(
        order.collateral_amount
      ),
    };
  };

  const onMint = async () => {
    if (!address || !walletClient) {
      return toast.error("No wallet connected");
    }

    setIsLoading(true);

    try {
      const rfq = await fetch(
        `${MINTING_TOKEN_URL}/rfq?pair=${pair}&type_=UI&side=MINT&size=${amount}&benefactor=${address}`
      );
      if (!rfq.ok) {
        throw new Error(`RFQ request failed: ${rfq.statusText}`);
      }
      const rfqData = await rfq.json();

      const order = createMintOrder(rfqData);
      console.log("order", order);
      const orderSigning = createOrderSigning(order);
      console.log("orderSigning", orderSigning);
      const signature = await walletClient.signTypedData({
        account: address as Address,
        domain: DOMAIN,
        types: ORDER_TYPE,
        primaryType: "Order",
        message: orderSigning,
      });

      if (!signature) {
        throw new Error("Error signing order");
      }

      const isValidSignature = await publicClient?.readContract({
        address: MINTING_ADDRESS,
        abi: MINTING_ABI,
        functionName: "verifyOrder",
        args: [
          orderSigning,
          {
            signature_type: 0,
            signature_bytes: signature,
          },
        ],
      });

      if (!isValidSignature) {
        throw new Error("Invalid signature");
      }

      const response = await fetch(
        `${MINTING_TOKEN_URL}/order?signature=${signature}`,
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

      if (!response.ok) {
        throw new Error(`Order submission failed: ${response.statusText}`);
      }

      const result = await response.json();

      if ("error" in result) {
        throw new Error(result.error);
      }

      toast.success(TransactionToast("Successfully minted!", result.tx));
      setIsLoading(false);
      return result.tx;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsLoading(false);
      return null;
    }
  };

  return { onMint, isLoading };
};
