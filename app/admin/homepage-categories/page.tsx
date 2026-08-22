'use client'

import { useEffect, useMemo, useState } from 'react'
import { Image as ImageIcon, Upload, X, Save, RotateCcw } from 'lucide-react'
import {
  defaultHomeCategories,
  getHomeCategoryCards,
  saveHomeCategoryCards,
  type HomeCategoryCard,
} from '@/lib/homepage-categories'

type MediaItem = {
  id: string
  name: string
  url: string
  type: 'Image' | 'Video'
  size?: number
  width?: number
  height?: number
  createdAt: string
}

const MEDIA_STORAGE_KEY = 'velsario-media'

function getMedia(): MediaItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveMedia(items: MediaItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent('velsario-media-updated'))
}

async function imageToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function HomepageCategoriesPage() {
  const [cards, setCards] = useState<HomeCategoryCard[]>(() =>
    getHomeCategoryCards()
  )
  const [media, setMedia] = useState<MediaItem[]>([])
  const [pickerFor, setPickerFor] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMedia(getMedia())

    const refresh = () => {
      setCards(getHomeCategoryCards())
      setMedia(getMedia())
    }

    window.addEventListener('velsario-media-updated', refresh)
    window.addEventListener('velsario-home-categories-updated', refresh)

    return () => {
      window.removeEventListener('velsario-media-updated', refresh)
      window.removeEventListener('velsario-home-categories-updated', refresh)
    }
  }, [])

  const filteredMedia = useMemo(() => {
    const q = search.trim().toLowerCase()

    return media.filter((item) => {
      if (item.type !== 'Image') return false
      if (!q) return true
      return item.name.toLowerCase().includes(q)
    })
  }, [media, search])

  const updateCard = (
    id: string,
    patch: Partial<HomeCategoryCard>
  ) => {
    setCards((current) =>
      current.map((card) =>
        card.id === id ? { ...card, ...patch } : card
      )
    )
  }

  const chooseMedia = (cardId: string, url: string) => {
    updateCard(cardId, { image: url })
    setPickerFor(null)
    setSearch('')
  }

  const uploadForCard = async (
    cardId: string,
    file?: File
  ) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.')
      return
    }

    try {
      const url = await imageToDataUrl(file)

      const item: MediaItem = {
        id: `MED-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url,
        type: 'Image',
        size: file.size,
        createdAt: new Date().toISOString(),
      }

      const updatedMedia = [item, ...getMedia()]
      saveMedia(updatedMedia)
      setMedia(updatedMedia)

      updateCard(cardId, { image: url })
      setPickerFor(null)
    } catch {
      alert('Could not upload this image.')
    }
  }

  const save = () => {
    setSaving(true)
    saveHomeCategoryCards(cards)

    setTimeout(() => {
      setSaving(false)
      setMessage('Homepage category cards saved successfully.')
      setTimeout(() => setMessage(''), 2500)
    }, 250)
  }

  const reset = () => {
    if (
      !confirm(
        'Reset all homepage category cards to the original default images and names?'
      )
    ) {
      return
    }

    setCards(defaultHomeCategories)
    saveHomeCategoryCards(defaultHomeCategories)
    setMessage('Default category cards restored.')
    setTimeout(() => setMessage(''), 2500)
  }

  const menCards = cards.filter((card) => card.id.startsWith('men-'))
  const womenCards = cards.filter((card) => card.id.startsWith('women-'))

  const renderCardEditor = (card: HomeCategoryCard) => (
    <div
      key={card.id}
      className="border border-v-border bg-white"
    >
      <div className="grid grid-cols-[150px_1fr] gap-5 p-4">
        <button
          type="button"
          onClick={() => setPickerFor(card.id)}
          className="group relative aspect-[3/4] overflow-hidden bg-gray-100 text-left"
          title="Change image"
        >
          <img
            src={card.image}
            alt={card.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-x-0 bottom-0 bg-black/75 px-2 py-2 text-center text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
            Change Image
          </span>
        </button>

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
              Card title
            </label>
            <input
              value={card.name}
              onChange={(e) =>
                updateCard(card.id, { name: e.target.value })
              }
              className="input-field w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
                Category
              </label>
              <input
                value={card.slug}
                onChange={(e) =>
                  updateCard(card.id, { slug: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
                Product filter
              </label>
              <input
                value={card.filter}
                onChange={(e) =>
                  updateCard(card.id, { filter: e.target.value })
                }
                className="input-field w-full"
                placeholder="Optional"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPickerFor(card.id)}
            className="inline-flex w-fit items-center gap-2 border border-black px-4 py-2 text-[10px] uppercase tracking-widest transition hover:bg-black hover:text-white"
          >
            <ImageIcon size={13} />
            Select Image
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 border-b border-v-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">
            Homepage
          </p>
          <h1 className="text-2xl font-medium">
            Category Cards
          </h1>
          <p className="mt-1 text-sm text-v-gray">
            Change the Men and Women category images and card content.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 border border-v-border bg-white px-4 py-3 text-[10px] uppercase tracking-widest hover:border-black"
          >
            <RotateCcw size={13} />
            Reset
          </button>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {message}
        </div>
      )}

      <div className="mb-10">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-v-gray">
            Men's section
          </p>
          <h2 className="mt-1 text-lg font-medium">
            Men Category Cards
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {menCards.map(renderCardEditor)}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-v-gray">
            Women's section
          </p>
          <h2 className="mt-1 text-lg font-medium">
            Women Category Cards
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {womenCards.map(renderCardEditor)}
        </div>
      </div>

      {pickerFor && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-white">
            <div className="flex items-center justify-between border-b border-v-border px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-v-gray">
                  Media Library
                </p>
                <h3 className="mt-1 text-lg font-medium">
                  Select category image
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPickerFor(null)
                  setSearch('')
                }}
                className="p-2 text-v-gray hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-v-border p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search media..."
                  className="input-field flex-1"
                />

                <label className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2">
                  <Upload size={14} />
                  Upload New
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      uploadForCard(
                        pickerFor,
                        e.target.files?.[0]
                      )
                    }
                  />
                </label>
              </div>

              <p className="mt-2 text-[10px] text-v-gray">
                Recommended source ratio: 3:4. The homepage will automatically
                crop every image into the same card size.
              </p>
            </div>

            <div className="overflow-y-auto p-5">
              {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {filteredMedia.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        chooseMedia(pickerFor, item.url)
                      }
                      className="group overflow-hidden border border-v-border bg-white text-left hover:border-black"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="truncate p-3 text-xs">
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <ImageIcon
                    size={30}
                    className="mx-auto mb-3 text-gray-400"
                  />
                  <p className="text-sm text-v-gray">
                    No images found in Media Library.
                  </p>
                  <p className="mt-1 text-xs text-v-gray">
                    Upload an image above to add it to the library.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
