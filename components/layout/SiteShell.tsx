'use client'

import { useEffect } from 'react'
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

  /* Dynamic Favicon */
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem('velsario-settings')

      if (!saved) return

      const settings = JSON.parse(saved)

      if (settings.favicon) {

        let favicon =
          document.querySelector(
            'link[rel="icon"]'
          ) as HTMLLinkElement | null

        if (!favicon) {
          favicon =
            document.createElement('link')

          favicon.rel = 'icon'

          document.head.appendChild(
            favicon
          )
        }

        favicon.href = settings.favicon

      }

    } catch {
      // Keep default favicon if settings cannot be loaded
    }

  }, [])

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
