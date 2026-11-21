import type { Address } from "viem";
import type { Side } from "./types";

export interface Approval {
  token: Address;
  amount: bigint;
}

/**
 * The token and amount the benefactor must approve for an order.
 * A mint pulls the collateral from the benefactor (transferFrom); a redeem
 * burns the benefactor's USDe (burnFrom), so it needs a USDe allowance.
 */
export function approvalFor(
  orderType: `${Side}`,
  collateral: Approval,
  usde: Approval
): Approval {
  if (orderType === "MINT") return collateral;
  if (orderType === "REDEEM") return usde;
  throw new Error(`Unknown order type: ${String(orderType)}`);
}
