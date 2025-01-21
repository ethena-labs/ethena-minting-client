import { parseUnits, Address, erc20Abi } from "viem";

import { useAccount, useReadContract } from "wagmi";

import { MINTING_ADDRESS, PAIR_TOKENS } from "@/app/constants/app-config";

export const useAllowance = ({
  amount,
  selectedTokenAddress,
}: {
  amount: number;
  selectedTokenAddress: Address;
}) => {
  const { address } = useAccount();
  const parsedAmount = BigInt(
    parseUnits(
      `${amount}`,
      PAIR_TOKENS.find((token) => token.address === selectedTokenAddress)
        ?.decimals ?? 6
    )
  );

  const { data: allowance = BigInt(0), isLoading: isCheckingAllowance } =
    useReadContract({
      abi: erc20Abi,
      address: selectedTokenAddress,
      args: address ? [address, MINTING_ADDRESS] : undefined,
      chainId: 1,
      functionName: "allowance",
      query: {
        enabled: !!address || !!amount,
        refetchInterval: 1000,
      },
    });

  const isAllowed = allowance >= parsedAmount;

  return { isAllowed, isCheckingAllowance };
};
