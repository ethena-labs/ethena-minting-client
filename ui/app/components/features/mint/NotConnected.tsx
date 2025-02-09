import { Box } from "@/app/components/Box";
import { MINTING_TOKEN_NAME } from "@/app/constants/app-config";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NotConnected = () => {
  return (
    <Box>
      <>
        <h1 className="text-center text-2xl font-medium">Connect Wallet</h1>
        <p className="text-center text-sm max-w-[500px]">
          {`Only whitelisted wallets can mint and redeem ${MINTING_TOKEN_NAME}. Connect a whitelisted wallet to get started.`}
        </p>
        <ConnectButton showBalance={false} />
      </>
    </Box>
  );
};
