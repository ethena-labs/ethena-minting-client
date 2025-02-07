import { MINTING_CONTRACT_ABI } from "@/app/constants/minting-abi";
import { checksumAddress } from "viem";

export const IS_PROD = true; // set to true for production minting

export const MINTING_ABI = MINTING_CONTRACT_ABI;
export const MINTING_ADDRESS = IS_PROD
  ? "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3"
  : "0x8a39215693aaB95038727fB31EBe19ce18903885";
export const MINTING_TOKEN_NAME = "USDe";
export const MINTING_TOKEN_URL = IS_PROD
  ? "https://public.api.ethena.fi/"
  : "https://public.api.staging.ethena.fi";

export const PAIR_TOKENS = [
  {
    name: "USDT",
    address: checksumAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7"),
    decimals: 6,
  },
  {
    name: "USDC",
    address: checksumAddress("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"),
    decimals: 6,
  },
];

export const DOMAIN = {
  chainId: 1,
  name: "EthenaMinting",
  verifyingContract: MINTING_ADDRESS,
  version: "1",
} as const;

export const TOKEN_AMOUNT_FIELD = "usde_amount";
export const GITHUB_URL = "https://github.com/ethena-labs";
export const GITBOOK_URL = "https://docs.ethena.fi/";
export const WAGMI_PROJECT_ID = "4b4cd8ea5a7805c848fd89f3a0132307";
