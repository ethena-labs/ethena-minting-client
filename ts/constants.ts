import "dotenv/config";

export const ORDER_TYPE = {
  Order: [
    { name: "order_id", type: "string" },
    { name: "order_type", type: "uint8" },
    { name: "expiry", type: "uint128" },
    { name: "nonce", type: "uint120" },
    { name: "benefactor", type: "address" },
    { name: "beneficiary", type: "address" },
    { name: "collateral_asset", type: "address" },
    { name: "collateral_amount", type: "uint128" },
    { name: "usde_amount", type: "uint128" },
  ],
} as const;
export const MINT_ADDRESS = "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3";

// USDe on Ethereum mainnet: a redeem burns it from the benefactor, so the
// minting contract needs an allowance on it.
export const USDE_ADDRESS = "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3";

export const DOMAIN = {
  chainId: 1,
  name: "EthenaMinting",
  verifyingContract: MINT_ADDRESS,
  version: "1",
} as const;

export const ETHENA_URL = "https://public.api.ethena.fi/";

export const RPC_URL = process.env.RPC_URL as string;
