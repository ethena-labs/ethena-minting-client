import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address } from "viem";
import { MINTING_ADDRESS } from "@/app/constants/app-config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { TransactionToast } from "@/app/components/Toast";
import { USDT_ABI } from "@/app/constants/usdt-abi";
import { getParsedAmount } from "@/app/utils/getParsedAmount";

export const useUsdtApprove = ({
  amount,
  selectedTokenAddress,
  isAllowed,
  allowance,
}: {
  amount: number;
  selectedTokenAddress: Address;
  isAllowed: boolean;
  allowance: bigint;
}) => {
  const [hasHandledReset, setHasHandledReset] = useState(false);
  const parsedAmount = getParsedAmount(amount, selectedTokenAddress);

  const { address } = useAccount();

  const {
    data: resetTxHash,
    writeContract: writeReset,
    isSuccess: isResetSuccess,
  } = useWriteContract();

  const {
    data: approveTxHash,
    writeContract: writeApprove,
    isSuccess: isApproveSuccess,
  } = useWriteContract();

  const {
    isSuccess: isResetComplete,
    isPending: isResetPending,
    isError: isResetError,
  } = useWaitForTransactionReceipt({
    hash: resetTxHash,
  });

  const {
    isSuccess: isApproveComplete,
    isError: isApproveError,
    isPending: isApprovePending,
  } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  useEffect(() => {
    if (isResetComplete && resetTxHash && !hasHandledReset) {
      setHasHandledReset(true);
      toast.success(
        TransactionToast("Successfully reset USDT allowance!", resetTxHash)
      );

      writeApprove({
        address: selectedTokenAddress,
        abi: USDT_ABI,
        functionName: "approve",
        args: [MINTING_ADDRESS, parsedAmount],
      });
    }

    if (isResetError) {
      toast.error("Error resetting USDT allowance");
    }
  }, [
    isAllowed,
    isResetComplete,
    resetTxHash,
    writeApprove,
    selectedTokenAddress,
    parsedAmount,
    isResetError,
    hasHandledReset,
  ]);

  useEffect(() => {
    if (isApproveComplete && approveTxHash) {
      toast.success(
        TransactionToast("Successfully approved USDT!", approveTxHash)
      );
    }

    if (isApproveError) {
      toast.error("Error approving USDT");
    }
  }, [isApproveComplete, isApproveError, approveTxHash]);

  const onApprove = async () => {
    if (!address) return;

    if (allowance === BigInt(0)) {
      setHasHandledReset(false);
      writeApprove({
        account: address,
        abi: USDT_ABI,
        address: selectedTokenAddress,
        functionName: "approve",
        args: [MINTING_ADDRESS, parsedAmount],
      });
    } else {
      setHasHandledReset(false);
      await writeReset({
        account: address,
        abi: USDT_ABI,
        address: selectedTokenAddress,
        functionName: "approve",
        args: [MINTING_ADDRESS, BigInt(0)],
      });
    }
  };

  const isResetLoading = isResetPending && isResetSuccess;
  const isApproveLoading = isApprovePending && isApproveSuccess;

  return {
    isResetting: isResetLoading,
    isLoading: isResetLoading || isApproveLoading,
    onApprove,
  };
};
