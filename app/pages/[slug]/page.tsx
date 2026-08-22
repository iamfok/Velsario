'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

import {
  getCustomPages,
  type CustomPage,
} from '@/lib/admin-pages'

export default function CustomPageView({
  params,
}: {
  params: { slug: string }
}) {
  const [page, setPage] =
    useState<CustomPage | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const load = () => {
      const pages = getCustomPages()

      const found = pages.find(
        (item) =>
          item.slug === params.slug &&
          item.status === 'Active'
      )

      setPage(found || null)
      setLoading(false)
    }

    load()

    window.addEventListener(
      'velsario-pages-updated',
      load
    )

    window.addEventListener(
      'storage',
      load
    )

    return () => {
      window.removeEventListener(
        'velsario-pages-updated',
        load
      )

      window.removeEventListener(
        'storage',
        load
      )
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-v-gray">
          Loading...
        </p>
      </div>
    )
  }

  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen">

      <section className="px-4 py-16 md:px-8 md:py-24">

        <div className="mx-auto max-w-4xl">

          {page.description && (
            <p className="section-label mb-4">
              {page.description}
            </p>
          )}

          <h1 className="font-display text-4xl md:text-6xl">
            {page.name}
          </h1>

          <div className="mt-10 whitespace-pre-wrap text-sm leading-8 text-v-gray md:text-base">
            {page.content}
          </div>

        </div>

      </section>

    </main>
  )
}
