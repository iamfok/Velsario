'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  getPageHeroBanner,
  type Banner,
} from '@/lib/banners'

function getTargetPath(pathname: string) {
  if (typeof window === 'undefined') {
    return pathname
  }

  const category = new URLSearchParams(
    window.location.search
  ).get('category')

  if (category) {
    return `${pathname}?category=${category}`
  }

  return pathname
}

export default function GlobalPageHero() {
  const pathname = usePathname()
  const [banner, setBanner] = useState<Banner | null>(null)

  useEffect(() => {
    const load = () => {
      const targetPath = getTargetPath(pathname || '/')

      setBanner(
        getPageHeroBanner(targetPath)
      )
    }

    load()

    window.addEventListener(
      'velsario-banners-updated',
      load
    )

    window.addEventListener(
      'storage',
      load
    )

    return () => {
      window.removeEventListener(
        'velsario-banners-updated',
        load
      )

      window.removeEventListener(
        'storage',
        load
      )
    }
  }, [pathname])

  // Homepage already has its own Hero.
  if (pathname === '/') {
    return null
  }

  if (!banner) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative min-h-[300px] md:min-h-[430px]">

        <div className="absolute inset-0">

          {banner.type === 'video' &&
          banner.videoUrl ? (

            <video
              src={banner.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />

          ) : banner.desktopImage ? (

            <picture className="block h-full w-full">

              {banner.mobileImage && (
                <source
                  media="(max-width: 767px)"
                  srcSet={banner.mobileImage}
                />
              )}

              <img
                src={banner.desktopImage}
                alt={banner.title}
                className="h-full w-full object-cover"
              />

            </picture>

          ) : null}

          <div className="absolute inset-0 bg-black/50" />

        </div>

        <div className="relative z-10 flex min-h-[300px] items-center justify-center px-5 py-20 text-center md:min-h-[430px] md:px-8">

          <div className="max-w-4xl">

            {banner.title && (
              <p className="section-label mb-5 text-gray-300">
                {banner.title}
              </p>
            )}

            {banner.heading && (
              <h1 className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl">
                {banner.heading}
              </h1>
            )}

            {banner.subheading && (
              <p className="mx-auto mt-4 font-display text-2xl italic md:text-3xl">
                {banner.subheading}
              </p>
            )}

            {banner.description && (
              <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-gray-300 md:text-base">
                {banner.description}
              </p>
            )}

            {banner.buttonText && (
              <div className="mt-8">
                <Link
                  href={banner.buttonUrl || '/shop'}
                  className="btn-white"
                >
                  {banner.buttonText}
                </Link>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
