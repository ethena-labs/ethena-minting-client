import { z } from 'zod'
import { Address, Side } from './common'

/**
 * Query parameters for POST /order endpoint
 * 
 * @example
 * {
 *   "signature": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1b"
 * }
 */
export const OrderQueryParams = z.object({
  signature: z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/, 'Must be a valid hex signature')
    .describe('EIP-712 signature of the order (0x-prefixed hex string)'),
})

/**
 * Order request body
 */
export const OrderRequest = z.object({
  order_id: z
    .string()
    .describe('Order ID (should match rfq_id from RFQ response)'),
  order_type: Side.describe('Order type: MINT or REDEEM'),
  expiry: z
    .number()
    .int()
    .positive()
    .describe('Order expiry timestamp (Unix seconds)'),
  nonce: z
    .number()
    .int()
    .positive()
    .describe('Unique nonce for the order (typically expiry timestamp)'),
  benefactor: Address.describe('Address where tokens are taken from (collateral for MINT, USDe for REDEEM)'),
  beneficiary: Address.describe('Address where tokens are received (USDe for MINT, collateral for REDEEM)'),
  collateral_asset: Address.describe('Address of the collateral token (USDT or USDC)'),
  collateral_amount: z
    .string()
    .describe('Amount of collateral tokens (as string to handle large numbers)'),
  usde_amount: z
    .string()
    .describe('Amount of USDe tokens (as string to handle large numbers)'),
})

/**
 * Order submission response
 */
export const OrderResponse = z.object({
  tx: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/, 'Must be a valid transaction hash')
    .describe('Transaction hash of the submitted order'),
})

