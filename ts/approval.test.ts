import { test } from "node:test";
import assert from "node:assert/strict";
import { approvalFor } from "./approval";

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDE = "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3";
const collateral = { token: USDT, amount: 25_000_000n } as const;
const usde = { token: USDE, amount: 25_000_000_000_000_000_000n } as const;

test("a mint approves the collateral for the collateral amount", () => {
  assert.deepEqual(approvalFor("MINT", collateral, usde), collateral);
});

test("a redeem approves USDe for the USDe amount", () => {
  assert.deepEqual(approvalFor("REDEEM", collateral, usde), usde);
});

test("an unknown order type is refused", () => {
  assert.throws(() => approvalFor("SWAP" as never, collateral, usde));
});
