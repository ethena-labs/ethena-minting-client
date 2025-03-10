"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  MINTING_TOKEN_NAME,
  WAGMI_PROJECT_ID,
} from "@/app/constants/app-config";

const queryClient = new QueryClient();

export const config = getDefaultConfig({
  appName: MINTING_TOKEN_NAME,
  projectId: WAGMI_PROJECT_ID,
  chains: [mainnet],
  ssr: true,
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
