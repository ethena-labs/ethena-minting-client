import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ethena Minting API',
  description: 'API documentation for Ethena USDe minting and redemption',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

