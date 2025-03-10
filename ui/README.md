# USDe UI

This UI showcases how minting USDe can be done in a React application.

## Setup

Inside the `ui` directory, run the following commands:

1. Install dependencies:

`pnpm i`

2. Run the development server:

`pnpm dev`

You can toggle between interacting with the production and staging environment by changing the `IS_PROD` variable in [`/app/constants/app-config.ts`](/ui/app/constants/app-config.ts).

## Instructions for use in a larger project

1. Copy all files to your project.
2. Install dependencies.
3. Update /constants/app-config.ts with your project's configuration.
4. Removing supporting text from /app/layout.tsx.

## Steps demonstrated in this UI

1. Connecting your wallet to get started
2. Confirming your address is on the whitelist
3. Checking token allowance and setting token approval
4. Minting tokens with your signed transaction
