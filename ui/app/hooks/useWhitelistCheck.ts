import { MINTING_ADDRESS } from "@/app/constants/app-config";
import { MINTING_ABI } from "@/app/constants/app-config";
import { useReadContract } from "wagmi";

import { useAccount } from "wagmi";

export const useWhitelistCheck = () => {
  const { address } = useAccount();

  const { data: isWhitelisted, isLoading } = useReadContract({
    abi: MINTING_ABI,
    address: MINTING_ADDRESS,
    args: address ? [address] : undefined,
    chainId: 1,
    functionName: "isWhitelistedBenefactor",
    query: {
      enabled: !!address,
    },
  });

  return { isLoading, isWhitelisted };
};
