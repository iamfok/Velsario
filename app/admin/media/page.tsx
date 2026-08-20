'use client'

import { useState } from 'react'
import {
  Upload,
  Search,
  Image as ImageIcon,
  Trash2,
  Copy,
  X,
} from 'lucide-react'

const initialMedia = [
  {
    id: 'MED-001',
    name: 'Velsario Logo',
    url: '',
    type: 'Image',
    size: '—',
  },
]

export default function MediaLibraryPage() {
  const [media, setMedia] = useState(initialMedia)
  const [search, setSearch] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const filtered = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const addMedia = () => {
    if (!name.trim() || !url.trim()) return

    const newMedia = {
      id: `MED-${String(media.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      url: url.trim(),
      type: 'Image',
      size: '—',
    }

    setMedia([...media, newMedia])
    setName('')
    setUrl('')
    setShowUpload(false)
  }

  const deleteMedia = (id: string) => {
    setMedia(media.filter((item) => item.id !== id))
  }

  const copyUrl = async (url: string) => {
    if (!url) return

    try {
      await navigator.clipboard.writeText(url)
    } catch {}
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>

          <h1 className="text-2xl font-medium">
            Media Library
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage images and media used across your store.
          </p>
        </div>

        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Upload size={15} />
          Add Media
        </button>

      </div>

      {/* ADD MEDIA */}
      {showUpload && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <div className="flex items-center justify-between mb-5">

            <p className="text-xs tracking-widest uppercase font-medium">
              Add Media
            </p>

            <button
              onClick={() => setShowUpload(false)}
              className="p-1 text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Media name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addMedia}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Add Media
            </button>

          </div>

        </div>
      )}

      {/* SEARCH */}
      <div className="bg-white border border-v-border p-4 mb-6">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />

          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* MEDIA GRID */}
      {filtered.length > 0 ? (

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

          {filtered.map((item) => (

            <div
              key={item.id}
              className="bg-white border border-v-border overflow-hidden group"
            >

              {/* IMAGE */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">

                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={30}
                    className="text-gray-400"
                  />
                )}

              </div>

              {/* INFO */}
              <div className="p-4">

                <p className="text-sm font-medium truncate">
                  {item.name}
                </p>

                <p className="text-xs text-v-gray mt-1">
                  {item.type}
                </p>

                <div className="flex items-center justify-between mt-4">

                  <button
                    onClick={() => copyUrl(item.url)}
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                    title="Copy URL"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
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

        <div className="bg-white border border-v-border p-16 text-center">

          <ImageIcon
            size={30}
            className="mx-auto mb-3 text-gray-400"
          />

          <p className="text-sm text-v-gray">
            No media found.
          </p>

        </div>

      )}

    </div>
  )
}
