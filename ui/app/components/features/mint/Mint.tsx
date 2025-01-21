"use client";

import { Box } from "@/app/components/Box";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select";
import { MINTING_TOKEN_NAME, PAIR_TOKENS } from "@/app/constants/app-config";
import { useAllowance } from "@/app/hooks/useAllowance";
import { useApprove } from "@/app/hooks/useApprove";
import { useMint } from "@/app/hooks/useMint";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { useState } from "react";
import { useUsdtApprove } from "@/app/hooks/useUsdtApprove";

export const Mint = () => {
  const defaultTokenAddress = PAIR_TOKENS[0].address as Address;
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState(defaultTokenAddress);
  const [amount, setAmount] = useState<number | "">("");
  const selectedToken = PAIR_TOKENS.find(
    (token) => token.address === selectedTokenAddress
  );
  const isUSDT = selectedToken?.name === "USDT";

  const { isAllowed, isCheckingAllowance } = useAllowance({
    amount: Number(amount),
    selectedTokenAddress,
  });

  const { onApprove, isLoading: isApproving } = useApprove({
    amount: Number(amount),
    selectedTokenAddress,
  });

  const {
    onApprove: onUsdtApprove,
    isLoading: isUsdtApproving,
    isResetting,
  } = useUsdtApprove({
    amount: Number(amount),
    selectedTokenAddress,
    isAllowed,
  });

  const { onMint, isLoading: isMinting } = useMint({
    amount: Number(amount),
    selectedTokenAddress,
  });

  const getButtonText = () => {
    if (isCheckingAllowance) {
      return "Checking allowance...";
    }

    if (isResetting) {
      return "Resetting...";
    }

    if (isApproving || isUsdtApproving) {
      return "Approving...";
    }

    if (isMinting) {
      return "Minting...";
    }

    if (isAllowed) {
      return "Mint";
    }

    return "Approve";
  };

  const isLoading =
    isCheckingAllowance || isApproving || isUsdtApproving || isMinting;

  return (
    <Box>
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-10 w-full">
          <h1 className="text-2xl font-medium">Mint {MINTING_TOKEN_NAME}</h1>
          <ConnectButton showBalance={false} />
        </div>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (isAllowed) {
              onMint();
            } else {
              if (isUSDT) {
                console.log("is usdt");
                onUsdtApprove();
              } else {
                onApprove();
              }
            }
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <Input
              id="amount"
              name="amount"
              placeholder="0"
              type="number"
              data-type="currency"
              value={amount}
              onChange={(e) =>
                e.target.value === ""
                  ? setAmount("")
                  : setAmount(Number(e.target.value))
              }
              disabled={isLoading}
            />
            <label htmlFor="token-select" className="sr-only">
              Select token
            </label>
            <Select
              name="token-select"
              defaultValue={defaultTokenAddress}
              value={selectedTokenAddress}
              onValueChange={(value) =>
                setSelectedTokenAddress(value as Address)
              }
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAIR_TOKENS.map((token) => (
                  <SelectItem key={token.name} value={token.address}>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !amount}
            aria-busy={isLoading}
          >
            {isLoading && (
              <div className="bg-white mr-0.5 h-2 w-2 animate-pulse rounded-full" />
            )}
            {getButtonText()}
          </Button>
        </form>
      </section>
    </Box>
  );
};
