'use client'

import { useMemo, useState } from 'react'
import {
  Upload,
  Search,
  Image as ImageIcon,
  Video,
  Trash2,
  Copy,
  X,
} from 'lucide-react'

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

const STORAGE_KEY = 'velsario-media'

function loadMedia(): MediaItem[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

async function compressImage(file: File) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
  })

  const maxDimension = 2400
  const scale = Math.min(
    1,
    maxDimension / Math.max(image.width, image.height)
  )

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))

  const ctx = canvas.getContext('2d')
  if (!ctx) return dataUrl

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/webp', 0.82)
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(() => loadMedia())
  const [search, setSearch] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)

  const filtered = useMemo(
    () =>
      media.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [media, search]
  )

  const persist = (items: MediaItem[]) => {
    setMedia(items)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('velsario-media-updated'))
  }

  const upload = async (file?: File) => {
    if (!file) return

    try {
      setProcessing(true)

      let url = ''
      let type: MediaItem['type']

      if (file.type.startsWith('image/')) {
        url = await compressImage(file)
        type = 'Image'
      } else if (file.type.startsWith('video/')) {
        if (file.size > 4 * 1024 * 1024) {
          alert(
            'This browser-only media library accepts videos up to 4MB. Upload a compressed/hosted video for larger files.'
          )
          return
        }

        url = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        type = 'Video'
      } else {
        alert('Only images and videos are supported.')
        return
      }

      const item: MediaItem = {
        id: `MED-${Date.now()}`,
        name: name.trim() || file.name.replace(/\.[^/.]+$/, ''),
        url,
        type,
        size: file.size,
        createdAt: new Date().toISOString(),
      }

      persist([item, ...media])
      setName('')
      setShowUpload(false)
    } finally {
      setProcessing(false)
    }
  }

  const remove = (id: string) => {
    if (!confirm('Delete this media?')) return
    persist(media.filter((item) => item.id !== id))
  }

  const copyUrl = async (url: string) => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    alert('Media URL copied')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>
          <h1 className="text-2xl font-medium">Media Library</h1>
          <p className="text-sm text-v-gray mt-1">
            Upload, compress and manage store media.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Upload size={14} />
          Upload Media
        </button>
      </div>

      {showUpload && (
        <div className="mb-6 border border-v-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-widest font-medium">
              Upload Media
            </p>
            <button
              type="button"
              onClick={() => setShowUpload(false)}
              className="p-2 text-v-gray"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Media name (optional)"
              className="input-field"
            />

            <label className="btn-primary cursor-pointer inline-flex items-center justify-center gap-2">
              <Upload size={14} />
              {processing ? 'Processing...' : 'Choose Image / Video'}
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                disabled={processing}
                onChange={(e) => upload(e.target.files?.[0])}
              />
            </label>
          </div>

          <p className="mt-3 text-[10px] text-v-gray">
            Images are automatically resized and converted to WebP. Large video
            transcoding is not performed in-browser; videos over 4MB should be
            compressed before upload.
          </p>
        </div>
      )}

      <div className="mb-6 border border-v-border bg-white p-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden border border-v-border bg-white"
            >
              <div className="aspect-square bg-gray-100">
                {item.type === 'Image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-v-gray">
                  {item.type === 'Image' ? (
                    <ImageIcon size={12} />
                  ) : (
                    <Video size={12} />
                  )}
                  {item.type}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="p-2 text-v-gray hover:text-black"
                    title="Copy URL"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="p-2 text-v-gray hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-v-border bg-white p-16 text-center">
          <ImageIcon size={30} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-v-gray">No media found.</p>
        </div>
      )}
    </div>
  )
}
