import { Address, checksumAddress, createPublicClient, Hex, http } from "viem";
import "dotenv/config";
import { createMintOrder, getRfq, signOrder, submitOrder } from "./mint_utils";
import { ETHENA_MINTING_ABI } from "./minting_abi";
import { mainnet } from "viem/chains";
import { parseScientificOrNonScientificToBigInt } from "./parse_number";
import { MINT_ADDRESS } from "./constants";
import { Side } from "./types";

// Configuration
const AMOUNT: number = 25; // Amount in USD
const COLLATERAL_ASSET: "USDT" | "USDC" = "USDT";
const BENEFACTOR: Address = checksumAddress(
  "0x3Aa3Fd1B762CaC519D405297CE630beD30430b00" // Replace with your address
) as Address;
const SIDE: "MINT" | "REDEEM" = "MINT";

const PRIVATE_KEY: Hex = process.env.PRIVATE_KEY as Hex;
const ALLOW_INFINITE_APPROVALS = false;
// Asset addresses
const USDC_ADDRESS: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT_ADDRESS: Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

async function main() {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(process.env.RPC_URL as string),
    });

    // Determine collateral asset address
    const collateralAddress =
      COLLATERAL_ASSET === "USDC" ? USDC_ADDRESS : USDT_ADDRESS;

    // Get RFQ
    const pair = `${COLLATERAL_ASSET}/USDe`;
    const rfqData = await getRfq(pair, "ALGO", SIDE, AMOUNT, BENEFACTOR);

    console.log("RFQ", rfqData);

    // Create order
    const order = await createMintOrder(
      rfqData,
      BENEFACTOR,
      BENEFACTOR, // Using same address for beneficiary
      collateralAddress
    );

    console.log("Order", order);

    // Get allowance
    const allowance = await getAllowance(collateralAddress, PRIVATE_KEY);
    console.log("Allowance", allowance);

    // Determine if approval required
    if (allowance < bigIntAmount(AMOUNT)) {
      // Approving
      const txHash = await approve(
        collateralAddress,
        PRIVATE_KEY,
        ALLOW_INFINITE_APPROVALS ? UINT256_MAX : bigIntAmount(AMOUNT)
      );
      console.log(`Approval submitted: https://etherscan.io/tx/${txHash}`);
      // Wait for the transaction to be mined
      await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
      });
    }

    const orderSigning = {
      ...order,
      nonce: BigInt(order.nonce),
      order_type: order.order_type === Side.MINT ? 0 : 1,
      expiry: BigInt(order.expiry),
      usde_amount: parseScientificOrNonScientificToBigInt(order.usde_amount),
      collateral_amount: parseScientificOrNonScientificToBigInt(
        order.collateral_amount
      ),
    };

    console.log("OrderSigning", orderSigning);

    // Sign order (replace with your private key)
    const signature = await signOrder(orderSigning, PRIVATE_KEY);

    console.log("Signature", signature);

    const isValidSignature = await publicClient.readContract({
      address: MINT_ADDRESS,
      abi: ETHENA_MINTING_ABI,
      functionName: "verifyOrder",
      args: [
        orderSigning,
        {
          signature_type: Number(signature.signature_type),
          signature_bytes: signature.signature_bytes,
        },
      ],
    });

    console.log("isValidSignature", isValidSignature);

    // Submit order
    const txHash = await submitOrder(order, signature);
    console.log(`Transaction submitted: https://etherscan.io/tx/${txHash}`);
  } catch (error) {
    console.error(error);
  }
}

main();
