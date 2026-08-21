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

  useEffect(() => {

    const applyFavicon = () => {

      try {

        const saved =
          localStorage.getItem(
            'velsario-settings'
          )

        if (!saved) return

        const settings =
          JSON.parse(saved)

        if (!settings.favicon) return

        const size =
          Number(
            settings.faviconSize || 32
          )

        const existing =
          document.querySelectorAll(
            'link[rel="icon"], link[rel="shortcut icon"], link[data-velsario-favicon]'
          )

        existing.forEach(
          element => element.remove()
        )

        const link =
          document.createElement('link')

        link.rel = 'icon'
        link.type = 'image/png'
        link.href = settings.favicon
        link.setAttribute(
          'data-velsario-favicon',
          'true'
        )

        link.setAttribute(
          'sizes',
          `${size}x${size}`
        )

        document.head.appendChild(link)

      } catch {}

    }

    applyFavicon()

    window.addEventListener(
      'velsario-settings-updated',
      applyFavicon
    )

    return () =>
      window.removeEventListener(
        'velsario-settings-updated',
        applyFavicon
      )

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
