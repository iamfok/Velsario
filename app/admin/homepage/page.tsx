'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Image as ImageIcon, Upload, X } from 'lucide-react'
import { HomeCategoryCard, getHomeCategoryCards, saveHomeCategoryCards } from '@/lib/homepage-categories'

type MediaItem = { id: string; name: string; url: string; type: 'Image' | 'Video' }

function loadMedia(): MediaItem[] {
  try {
    const value = JSON.parse(localStorage.getItem('velsario-media') || '[]')
    return Array.isArray(value)
      ? value.filter((x: any) => x?.type === 'Image' && typeof x?.url === 'string' && x.url)
      : []
  } catch { return [] }
}

export default function HomepageCategoriesPage() {
  const [cards, setCards] = useState<HomeCategoryCard[]>(() => getHomeCategoryCards())
  const [media, setMedia] = useState<MediaItem[]>(() => loadMedia())
  const [activeId, setActiveId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const menCards = useMemo(() => cards.filter(c => c.id.startsWith('men-')), [cards])
  const womenCards = useMemo(() => cards.filter(c => c.id.startsWith('women-')), [cards])

  const updateImage = (id: string, image: string) => {
    const updated = cards.map(c => c.id === id ? { ...c, image } : c)
    setCards(updated)
    saveHomeCategoryCards(updated)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const uploadImage = (id: string, file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please select an image.'); return }
    const reader = new FileReader()
    reader.onload = () => { updateImage(id, String(reader.result)); setActiveId(null) }
    reader.readAsDataURL(file)
  }

  const renderCard = (card: HomeCategoryCard) => (
    <div key={card.id} className="overflow-hidden border border-v-border bg-white">
      <div className="aspect-[3/4] overflow-hidden bg-v-light">
        <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium">{card.name}</p>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-v-gray">Fixed 3:4 card ratio</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setActiveId(activeId === card.id ? null : card.id)}
            className="flex items-center justify-center gap-2 border border-v-black px-3 py-2 text-[10px] uppercase tracking-wider hover:bg-black hover:text-white">
            <ImageIcon size={13} /> Change
          </button>
          <label className="flex cursor-pointer items-center justify-center gap-2 bg-v-black px-3 py-2 text-[10px] uppercase tracking-wider text-white hover:bg-v-gray">
            <Upload size={13} /> Upload
            <input type="file" accept="image/*" className="hidden" onChange={e => uploadImage(card.id, e.target.files?.[0])} />
          </label>
        </div>

        {activeId === card.id && (
          <div className="mt-4 border-t border-v-border pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-v-gray">Select from Media</p>
              <button type="button" onClick={() => setActiveId(null)} className="text-v-gray hover:text-black"><X size={14} /></button>
            </div>
            {media.length ? (
              <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto">
                {media.map(item => (
                  <button key={item.id} type="button" title={item.name} onClick={() => { updateImage(card.id, item.url); setActiveId(null) }}
                    className="group relative aspect-square overflow-hidden border border-v-border hover:border-black">
                    <img src={item.url} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {card.image === item.url && <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"><Check size={18} /></span>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-v-border p-6 text-center">
                <p className="text-xs text-v-gray">No images in Media Library yet.</p>
                <Link href="/admin/media" className="mt-3 inline-block text-[10px] uppercase tracking-widest underline">Open Media Library</Link>
              </div>
            )}
            <button type="button" onClick={() => setMedia(loadMedia())} className="mt-3 text-[10px] uppercase tracking-widest text-v-gray underline">Refresh Media</button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <Link href="/admin" className="mt-1 border border-v-border p-2 hover:bg-v-light"><ArrowLeft size={16} /></Link>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">Homepage</p>
            <h1 className="text-2xl font-medium">Category Cards</h1>
            <p className="mt-1 text-sm text-v-gray">Manage Men and Women card images without editing code.</p>
          </div>
        </div>
        <button type="button" onClick={() => { saveHomeCategoryCards(cards); setSaved(true); window.setTimeout(() => setSaved(false), 1800) }} className="btn-primary">Save Changes</button>
      </div>

      {saved && <div className="mb-6 flex items-center gap-2 border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700"><Check size={14} /> Homepage category images saved.</div>}

      <section className="mb-8">
        <div className="mb-5"><p className="text-xs uppercase tracking-widest text-v-gray">For Him</p><h2 className="mt-1 font-display text-2xl">Men's Closet</h2></div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{menCards.map(renderCard)}</div>
      </section>

      <section>
        <div className="mb-5"><p className="text-xs uppercase tracking-widest text-v-gray">For Her</p><h2 className="mt-1 font-display text-2xl">Women Closet</h2></div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{womenCards.map(renderCard)}</div>
      </section>
    </div>
  )
}
