'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  ExternalLink,
  Plus,
  Layers,
  Tag,
  Pencil,
  Trash2,
} from 'lucide-react'

import {
  getAllAdminPages,
  getCustomPages,
  deleteCustomPage,
  type AdminPageItem,
  type CustomPage,
} from '@/lib/admin-pages'

export default function PagesPage() {
  const [pages, setPages] = useState<AdminPageItem[]>([])
  const [customPages, setCustomPages] = useState<CustomPage[]>([])

  const load = () => {
    setPages(getAllAdminPages())
    setCustomPages(getCustomPages())
  }

  useEffect(() => {
    load()

    window.addEventListener(
      'velsario-pages-updated',
      load
    )

    window.addEventListener(
      'storage',
      load
    )

    window.addEventListener(
      'velsario-categories-updated',
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

      window.removeEventListener(
        'velsario-categories-updated',
        load
      )
    }
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this custom page?')) return

    deleteCustomPage(id)
    load()
  }

  const systemPages = pages.filter(
    (page) => page.type === 'system'
  )

  const categoryPages = pages.filter(
    (page) => page.type === 'category'
  )

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">
            Website
          </p>

          <h1 className="text-2xl font-medium">
            Pages
          </h1>

          <p className="mt-1 text-sm text-v-gray">
            Manage system, category and custom website pages.
          </p>
        </div>

        <Link
          href="/admin/pages/new"
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Create New Page
        </Link>

      </div>

      {/* SYSTEM PAGES */}

      <PageGroup
        title="System Pages"
        description="Built-in pages available across the storefront."
        icon={<Layers size={16} />}
        pages={systemPages}
      />

      {/* CATEGORY PAGES */}

      <PageGroup
        title="Category Pages"
        description="Automatically loaded from your product categories."
        icon={<Tag size={16} />}
        pages={categoryPages}
      />

      {/* CUSTOM PAGES */}

      <div className="mb-8">

        <div className="mb-4">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-v-gray">
            <FileText size={13} />
            Custom Pages
          </p>

          <h2 className="mt-1 text-lg font-medium">
            Your Pages
          </h2>
        </div>

        <div className="overflow-hidden border border-v-border bg-white">

          {customPages.length > 0 ? (
            customPages.map((page) => (

              <div
                key={page.id}
                className="flex items-center justify-between gap-4 border-b border-v-border px-6 py-5 last:border-0 hover:bg-v-light"
              >

                <div>

                  <p className="text-sm font-medium">
                    {page.name}
                  </p>

                  <p className="mt-1 text-xs text-v-gray">
                    {page.description || 'Custom website page'}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    /pages/{page.slug}
                  </p>

                  <div className="mt-2 flex gap-2">

                    {page.headerMenu && (
                      <span className="bg-gray-100 px-2 py-1 text-[9px] uppercase tracking-wider">
                        Header
                      </span>
                    )}

                    {page.footerMenu && (
                      <span className="bg-gray-100 px-2 py-1 text-[9px] uppercase tracking-wider">
                        Footer
                      </span>
                    )}

                    <span
                      className={`px-2 py-1 text-[9px] uppercase tracking-wider ${
                        page.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {page.status}
                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-1">

                  <Link
                    href={`/admin/pages/edit/${page.id}`}
                    className="p-2 text-v-gray hover:text-black"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(page.id)}
                    className="p-2 text-v-gray hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>

                  <a
                    href={`/pages/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-v-gray hover:text-black"
                    title="View"
                  >
                    <ExternalLink size={14} />
                  </a>

                </div>

              </div>

            ))
          ) : (
            <div className="px-6 py-16 text-center text-sm text-v-gray">
              No custom pages created yet.
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

function PageGroup({
  title,
  description,
  icon,
  pages,
}: {
  title: string
  description: string
  icon: React.ReactNode
  pages: AdminPageItem[]
}) {
  return (
    <div className="mb-8">

      <div className="mb-4">

        <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-v-gray">
          {icon}
          {title}
        </p>

        <p className="mt-1 text-sm text-v-gray">
          {description}
        </p>

      </div>

      <div className="overflow-hidden border border-v-border bg-white">

        {pages.map((page) => (

          <div
            key={page.id}
            className="flex items-center justify-between gap-4 border-b border-v-border px-6 py-5 last:border-0 hover:bg-v-light"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                <FileText size={17} />
              </div>

              <div>

                <p className="text-sm font-medium">
                  {page.name}
                </p>

                <p className="mt-1 text-xs text-v-gray">
                  {page.description}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {page.path}
                </p>

              </div>

            </div>

            <a
              href={page.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-v-border px-3 py-2 text-xs hover:bg-v-black hover:text-white"
            >
              <ExternalLink size={13} />
              View
            </a>

          </div>

        ))}

        {pages.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-v-gray">
            No pages found.
          </div>
        )}

      </div>

    </div>
  )
}
