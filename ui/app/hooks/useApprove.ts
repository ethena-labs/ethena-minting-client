import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { Address, erc20Abi, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
import { MINTING_ADDRESS, PAIR_TOKENS } from "@/app/constants/app-config";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { TransactionToast } from "@/app/components/Toast";

export const useApprove = ({
  amount,
  selectedTokenAddress,
}: {
  amount: number;
  selectedTokenAddress: Address;
}) => {
  const selectedToken = PAIR_TOKENS.find(
    (token) => token.address === selectedTokenAddress
  );
  const parsedAmount = BigInt(
    parseUnits(`${amount}`, selectedToken?.decimals ?? 6)
  );

  const { address } = useAccount();
  const {
    data: txHash,
    writeContract,
    isSuccess: isWriteSuccess,
  } = useWriteContract();

  const { data: simulateData } = useSimulateContract({
    account: address,
    abi: erc20Abi,
    address: selectedTokenAddress,
    functionName: "approve",
    args: [MINTING_ADDRESS, parsedAmount],
    query: {
      enabled: selectedToken?.name !== "USDT",
    },
  });

  const onApprove = async () => {
    if (simulateData) {
      await writeContract(simulateData?.request);
    }
  };

  const { isSuccess, isError, isPending } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess && txHash) {
      toast.success(TransactionToast("Successfully approved!", txHash));
    }
    if (isError) {
      toast.error("Error approving");
    }
  }, [isSuccess, isError, txHash]);

  return {
    isLoading: isPending && isWriteSuccess,
    onApprove,
  };
};
