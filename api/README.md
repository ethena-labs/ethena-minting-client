# Ethena Minting API Documentation

API documentation server for the Ethena USDe minting API, powered by Scalar and OpenAPI.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Generate OpenAPI specification:
```bash
pnpm run openapi:generate
```

3. Start development server:
```bash
pnpm run dev
```

4. View documentation at: `http://localhost:3000/docs`

## Build

```bash
pnpm run build
```

The build process automatically generates the OpenAPI specification before building.

## API Endpoints

The documentation server provides documentation for the following Ethena API endpoints:

- `GET /rfq` - Get a quote for minting or redeeming USDe tokens
- `POST /order` - Submit a signed order to execute mint or redeem operations

## Documentation

- Documentation UI: `/docs` (Scalar interface)
- OpenAPI Spec: `/api/openapi` (JSON format)

## Development

The API routes in `app/api/` are documentation-only and return example responses. They are used to generate the OpenAPI specification from Zod schemas.

To update the documentation:
1. Modify Zod schemas in `schemas/`
2. Update route handlers in `app/api/`
3. Regenerate OpenAPI spec: `pnpm run openapi:generate`
4. Restart dev server to see changes

