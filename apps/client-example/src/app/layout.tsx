import type { Metadata } from 'next'
import '@/styles/globals.css'
import { UserProvider } from '@/contexts/user-context'
import { WalletProvider } from '@/contexts/wallet-context'

export const metadata: Metadata = {
  title: 'Client Example',
  description: 'ETH LATAM ADSZK Client Example',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <WalletProvider>
          <UserProvider>{children}</UserProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
