import { parseUnits } from "viem";

import { PAIR_TOKENS } from "@/app/constants/app-config";
import { Address } from "viem";

export const getParsedAmount = (
  amount: number,
  selectedTokenAddress: Address
): bigint => {
  const selectedToken = PAIR_TOKENS.find(
    (token) => token.address === selectedTokenAddress
  );
  return BigInt(parseUnits(`${amount}`, selectedToken?.decimals ?? 6));
};
