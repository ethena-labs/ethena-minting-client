"use client";

import { Mint } from "@/app/components/features/mint/Mint";
import { NotConnected } from "@/app/components/features/mint/NotConnected";
import { NotWhitelisted } from "@/app/components/features/mint/NotWhitelisted";
import { Loading } from "@/app/components/Loading";
import { useWhitelistCheck } from "@/app/hooks/useWhitelistCheck";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting } = useAccount();
  const { isLoading: isCheckingWhitelist, isWhitelisted = false } =
    useWhitelistCheck();

  if (isCheckingWhitelist || isConnecting) return <Loading />;

  if (!address) return <NotConnected />;

  if (!isWhitelisted) return <NotWhitelisted isWhitelisted={isWhitelisted} />;

  return <Mint />;
}
