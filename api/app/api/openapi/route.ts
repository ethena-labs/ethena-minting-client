import { NextResponse } from 'next/server'
import generatedSpec from '@/public/openapi.json'

export const runtime = 'nodejs'

/**
 * Get the appropriate server URL based on deployment environment.
 * Points to the actual Ethena API endpoint.
 */
function getServerUrl(): string {
  // Local development
  if (!process.env.VERCEL_ENV) {
    return 'https://public.api.ethena.fi'
  }

  // Vercel preview deployments
  if (process.env.VERCEL_ENV === 'preview') {
    return 'https://public.api.ethena.fi'
  }

  // Branch-based environments
  const branch = process.env.VERCEL_GIT_COMMIT_REF

  if (branch === 'dev' || process.env.VERCEL_ENV === 'development') {
    return 'https://public.api.staging.ethena.fi'
  }

  if (branch === 'staging') {
    return 'https://public.api.staging.ethena.fi'
  }

  // Production (main branch on Vercel)
  return 'https://public.api.ethena.fi'
}

/**
 * Transform the generated spec into proper OpenAPI 3.0 format.
 * The generator outputs a nested structure that needs flattening.
 */
function transformSpec() {
  const nested = generatedSpec.openapi as Record<string, unknown>

  return {
    openapi: '3.0.3',
    info: nested.info,
    servers: [{ url: getServerUrl(), description: 'Ethena Minting API' }],
    tags: nested.tags,
    paths: generatedSpec.paths,
    components: {
      schemas: generatedSpec.components?.schemas || {},
      responses: generatedSpec.components?.responses || {},
    },
  }
}

/**
 * GET /api/openapi
 *
 * Returns the OpenAPI specification as JSON with dynamic server URL.
 */
export async function GET() {
  const spec = transformSpec()

  return NextResponse.json(spec, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, max-age=0, must-revalidate',
    },
  })
}

