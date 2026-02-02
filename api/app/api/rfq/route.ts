import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { RfqQueryParams, RfqResponse } from '@/schemas'
import type { z } from 'zod'

export const runtime = 'nodejs'

/**
 * @summary Get RFQ (Request for Quote)
 * @description Get a quote for minting or redeeming USDe tokens. Returns the required collateral amount and USDe amount for the specified order size.
 * @params RfqQueryParams
 * @response 200:RfqResponse
 * @tag Minting
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Parse and validate query parameters
  const parseResult = RfqQueryParams.safeParse({
    pair: searchParams.get('pair'),
    type_: searchParams.get('type_') || 'ALGO',
    side: searchParams.get('side'),
    size: searchParams.get('size') ? Number(searchParams.get('size')) : undefined,
    benefactor: searchParams.get('benefactor'),
  })

  if (!parseResult.success) {
    return NextResponse.json(
      { error: { code: 'INVALID_PARAMS', message: parseResult.error.message } },
      { status: 400 }
    )
  }

  // This is a documentation-only endpoint
  // Return example response for documentation purposes
  const exampleResponse: z.infer<typeof RfqResponse> = {
    rfq_id: 'rfq_1234567890',
    collateral_asset: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    usde_amount: '25000000000',
    collateral_amount: '25000000000',
    side: 'MINT',
    pair: 'USDT/USDe',
    size: 25,
    gas: 150000,
  }

  return NextResponse.json(exampleResponse, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

