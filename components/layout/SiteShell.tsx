'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isAdmin =
    pathname === '/admin' ||
    pathname.startsWith('/admin/')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  )
}
