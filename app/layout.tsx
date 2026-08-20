import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: 'Velsario — Minimal Colors. Maximum Impact.',
  description: 'Premium formal wear for men and women — crafted in pure black & white, built for those who mean business.',
  keywords: 'Velsario, formal wear, black white fashion, premium clothing Bangladesh',
  openGraph: {
    title: 'Velsario — Minimal Colors. Maximum Impact.',
    description: 'Premium formal wear for men and women.',
    url: 'https://velsario.com',
    siteName: 'Velsario',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
