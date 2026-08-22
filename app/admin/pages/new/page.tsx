'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
} from 'lucide-react'

import {
  createCustomPage,
  type CustomPage,
} from '@/lib/admin-pages'

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function NewPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] =
    useState<'Active' | 'Inactive'>('Active')

  const [menuLabel, setMenuLabel] = useState('')

  const [headerMenu, setHeaderMenu] =
    useState(false)

  const [footerMenu, setFooterMenu] =
    useState(false)

  const [saving, setSaving] = useState(false)

  const save = () => {
    if (!name.trim()) {
      alert('Page name is required.')
      return
    }

    const finalSlug =
      slug.trim() || makeSlug(name)

    if (!finalSlug) {
      alert('A valid page slug is required.')
      return
    }

    setSaving(true)

    const now = new Date().toISOString()

    const page: CustomPage = {
      id: `PAGE-${Date.now()}`,
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      content,
      status,
      heroBannerId: '',
      menuLabel:
        menuLabel.trim() || name.trim(),
      headerMenu,
      footerMenu,
      createdAt: now,
      updatedAt: now,
    }

    createCustomPage(page)

    router.push('/admin/pages')
  }

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8 flex items-center gap-4">

        <Link
          href="/admin/pages"
          className="p-2 text-v-gray hover:text-black"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">
            Website
          </p>

          <h1 className="text-2xl font-medium">
            Create New Page
          </h1>

          <p className="mt-1 text-sm text-v-gray">
            Create a custom storefront page.
          </p>
        </div>

      </div>

      <div className="border border-v-border bg-white p-6 md:p-8">

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
              Page Name
            </label>

            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)

                if (!slug) {
                  setSlug(makeSlug(e.target.value))
                }
              }}
              placeholder="Our Story"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
              URL Slug
            </label>

            <input
              value={slug}
              onChange={(e) =>
                setSlug(makeSlug(e.target.value))
              }
              placeholder="our-story"
              className="input-field w-full"
            />

            <p className="mt-2 text-[10px] text-v-gray">
              URL: /pages/{slug || 'your-page'}
            </p>
          </div>

        </div>

        <div className="mt-5">

          <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
            Description
          </label>

          <input
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Short description of this page"
            className="input-field w-full"
          />

        </div>

        <div className="mt-5">

          <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
            Page Content
          </label>

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            rows={14}
            placeholder="Write your page content here..."
            className="input-field w-full resize-y"
          />

          <p className="mt-2 text-[10px] text-v-gray">
            Plain text content for now. We can upgrade this
            to a visual page builder later.
          </p>

        </div>

        <div className="mt-6 border-t border-v-border pt-6">

          <p className="mb-4 text-xs font-medium uppercase tracking-widest">
            Page Settings
          </p>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
                Menu Label
              </label>

              <input
                value={menuLabel}
                onChange={(e) =>
                  setMenuLabel(e.target.value)
                }
                placeholder={name || 'Menu label'}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | 'Active'
                      | 'Inactive'
                  )
                }
                className="input-field w-full bg-white"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            <label className="flex cursor-pointer items-center gap-3 border border-v-border p-4">

              <input
                type="checkbox"
                checked={headerMenu}
                onChange={(e) =>
                  setHeaderMenu(e.target.checked)
                }
              />

              <div>
                <p className="text-sm font-medium">
                  Add to Header Menu
                </p>

                <p className="mt-1 text-xs text-v-gray">
                  Show this page in the main navigation.
                </p>
              </div>

            </label>

            <label className="flex cursor-pointer items-center gap-3 border border-v-border p-4">

              <input
                type="checkbox"
                checked={footerMenu}
                onChange={(e) =>
                  setFooterMenu(e.target.checked)
                }
              />

              <div>
                <p className="text-sm font-medium">
                  Add to Footer Menu
                </p>

                <p className="mt-1 text-xs text-v-gray">
                  Show this page in the footer navigation.
                </p>
              </div>

            </label>

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={14} />

            {saving
              ? 'Creating...'
              : 'Create Page'}
          </button>

        </div>

      </div>

    </div>
  )
}
