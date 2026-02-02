import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { OrderQueryParams, OrderRequest, OrderResponse } from '@/schemas'
import type { z } from 'zod'

export const runtime = 'nodejs'

/**
 * @summary Submit order
 * @description Submit a signed mint or redeem order. The order must be signed using EIP-712 with the order data. Returns the transaction hash.
 * @params OrderQueryParams
 * @body OrderRequest
 * @response 200:OrderResponse
 * @tag Minting
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const body = await request.json().catch(() => ({}))

  // Parse and validate query parameters
  const queryParseResult = OrderQueryParams.safeParse({
    signature: searchParams.get('signature'),
  })

  if (!queryParseResult.success) {
    return NextResponse.json(
      { error: { code: 'INVALID_QUERY_PARAMS', message: queryParseResult.error.message } },
      { status: 400 }
    )
  }

  // Parse and validate request body
  const bodyParseResult = OrderRequest.safeParse(body)

  if (!bodyParseResult.success) {
    return NextResponse.json(
      { error: { code: 'INVALID_BODY', message: bodyParseResult.error.message } },
      { status: 400 }
    )
  }

  // This is a documentation-only endpoint
  // Return example response for documentation purposes
  const exampleResponse: z.infer<typeof OrderResponse> = {
    tx: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  }

  return NextResponse.json(exampleResponse, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

