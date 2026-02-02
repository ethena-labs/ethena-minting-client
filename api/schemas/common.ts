import { z } from 'zod'

/**
 * Ethereum address (0x-prefixed hex string, 42 characters)
 */
export const Address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid Ethereum address')
  .describe('Ethereum address (0x-prefixed, 42 characters)')

/**
 * Order side: MINT or REDEEM
 */
export const Side = z.enum(['MINT', 'REDEEM']).describe('Order side: MINT to create USDe, REDEEM to convert USDe back to collateral')

