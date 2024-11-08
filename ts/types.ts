import { Hex, Address } from "viem";

export enum SignatureType {
  EIP712 = 0,
  EIP1271 = 1,
}

export interface Signature {
  signature_type: SignatureType;
  signature_bytes: Hex;
}

export enum Side {
  MINT = "MINT",
  REDEEM = "REDEEM",
}

export interface OrderBase {
  benefactor: Address;
  beneficiary: Address;
  collateral_asset: Address;
  order_id: string;
}

export interface OrderSending extends OrderBase {
  nonce: number;
  expiry: number;
  order_type: Side;
  usde_amount: string;
  collateral_amount: string;
}

export interface OrderSigning extends OrderBase {
  nonce: bigint;
  expiry: bigint;
  order_type: number;
  usde_amount: bigint;
  collateral_amount: bigint;
}

export interface Rfq {
  collateral_asset: Address;
  usde_amount: string;
  gas: number;
  pair: string;
  collateral_amount: string;
  rfq_id: string;
  side: Side;
  size: number;
}
