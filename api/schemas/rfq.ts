import { z } from 'zod'
import { Address, Side } from './common'

/**
 * Query parameters for GET /rfq endpoint
 * 
 * @example
 * {
 *   "pair": "USDT/USDe",
 *   "type_": "ALGO",
 *   "side": "MINT",
 *   "size": 25,
 *   "benefactor": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 * }
 */
export const RfqQueryParams = z.object({
  pair: z
    .string()
    .describe('Trading pair (e.g., "USDT/USDe", "USDC/USDe")'),
  type_: z
    .enum(['ALGO', 'UI'])
    .default('ALGO')
    .describe('RFQ type identifier. Use "ALGO" for algorithmic trading or "UI" for user interface requests. Defaults to "ALGO" if not provided. Note: The parameter name must be "type_" (with underscore), not "type".'),
  side: Side.describe('Order side: MINT or REDEEM'),
  size: z
    .number()
    .positive()
    .describe('Order size in USD'),
  benefactor: Address.describe('Address of the order initiator'),
})

/**
 * RFQ response from the API
 */
export const RfqResponse = z.object({
  rfq_id: z.string().describe('Unique RFQ identifier'),
  collateral_asset: Address.describe('Address of the collateral token (USDT or USDC)'),
  usde_amount: z.string().describe('Amount of USDe tokens (as string to handle large numbers)'),
  collateral_amount: z.string().describe('Amount of collateral tokens required (as string to handle large numbers)'),
  side: Side.describe('Order side'),
  pair: z.string().describe('Trading pair'),
  size: z.number().describe('Order size in USD'),
  gas: z.number().describe('Estimated gas cost'),
})

