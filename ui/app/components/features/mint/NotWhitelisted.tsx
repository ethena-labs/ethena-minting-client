import { formatAddress } from "@/app/utils/formatAddress";
import { useDisconnect, useAccount } from "wagmi";
import { Button } from "@/app/components/Button";
import { Box } from "@/app/components/Box";
import { MINTING_TOKEN_NAME } from "@/app/constants/app-config";

export const NotWhitelisted = ({
  isWhitelisted,
}: {
  isWhitelisted: boolean;
}) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isWhitelisted) {
    return (
      <Box>
        <h1 className="text-center text-2xl font-medium">Not Whitelisted</h1>
        <p className="text-center text-sm">
          The connected wallet <b>{formatAddress(address as string)}</b> is not
          whitelisted to mint {MINTING_TOKEN_NAME}. Switch to a whitelisted
          wallet or sign up to get your wallet whitelisted.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => disconnect()}>Switch Wallet</Button>
        </div>
      </Box>
    );
  }
};
