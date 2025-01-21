import { Address } from "viem";

export const formatAddress = (address: string | Address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
