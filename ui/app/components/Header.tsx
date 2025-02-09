import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="flex justify-center items-end">
      <ConnectButton showBalance={false} />
    </header>
  );
};
