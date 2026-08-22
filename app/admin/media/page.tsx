'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Upload,
  Search,
  Image as ImageIcon,
  Video,
  Trash2,
  Copy,
  X,
  Pencil,
  Check,
} from 'lucide-react'

import {
  MediaItem,
  getMedia,
  saveMedia,
  updateMedia,
  deleteMedia,
} from '@/lib/media'

async function compressImage(file: File) {
  const dataUrl = await new Promise<string>(
    (resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () =>
        resolve(String(reader.result))

      reader.onerror = reject

      reader.readAsDataURL(file)
    }
  )

  const image =
    await new Promise<HTMLImageElement>(
      (resolve, reject) => {
        const img = new Image()

        img.onload = () => resolve(img)
        img.onerror = reject

        img.src = dataUrl
      }
    )

  const maxDimension = 2400

  const scale = Math.min(
    1,
    maxDimension /
      Math.max(image.width, image.height)
  )

  const canvas =
    document.createElement('canvas')

  canvas.width = Math.max(
    1,
    Math.round(image.width * scale)
  )

  canvas.height = Math.max(
    1,
    Math.round(image.height * scale)
  )

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return {
      url: dataUrl,
      width: image.width,
      height: image.height,
    }
  }

  ctx.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return {
    url: canvas.toDataURL(
      'image/webp',
      0.82
    ),
    width: canvas.width,
    height: canvas.height,
  }
}

async function readVideo(file: File) {
  return new Promise<string>(
    (resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () =>
        resolve(String(reader.result))

      reader.onerror = reject

      reader.readAsDataURL(file)
    }
  )
}

export default function MediaPage() {
  const [media, setMedia] =
    useState<MediaItem[]>([])

  const [search, setSearch] =
    useState('')

  const [showUpload, setShowUpload] =
    useState(false)

  const [name, setName] =
    useState('')

  const [processing, setProcessing] =
    useState(false)

  const [editingId, setEditingId] =
    useState<string | null>(null)

  const [editingName, setEditingName] =
    useState('')

  useEffect(() => {
    const load = () => {
      setMedia(getMedia())
    }

    load()

    const handleUpdate = () => {
      load()
    }

    window.addEventListener(
      'velsario-media-updated',
      handleUpdate
    )

    window.addEventListener(
      'storage',
      handleUpdate
    )

    return () => {
      window.removeEventListener(
        'velsario-media-updated',
        handleUpdate
      )

      window.removeEventListener(
        'storage',
        handleUpdate
      )
    }
  }, [])

  const filtered = useMemo(() => {
    const keyword =
      search.trim().toLowerCase()

    if (!keyword) {
      return media
    }

    return media.filter((item) =>
      item.name
        .toLowerCase()
        .includes(keyword)
    )
  }, [media, search])

  const upload = async (
    file?: File
  ) => {
    if (!file) return

    try {
      setProcessing(true)

      let item: MediaItem

      if (
        file.type.startsWith('image/')
      ) {
        const result =
          await compressImage(file)

        item = {
          id: `MED-${Date.now()}`,
          name:
            name.trim() ||
            file.name.replace(
              /\.[^/.]+$/,
              ''
            ),
          url: result.url,
          type: 'Image',
          size: file.size,
          width: result.width,
          height: result.height,
          createdAt:
            new Date().toISOString(),
        }
      } else if (
        file.type.startsWith('video/')
      ) {
        if (
          file.size >
          4 * 1024 * 1024
        ) {
          alert(
            'Video is larger than 4MB. Please compress the video before uploading.'
          )

          return
        }

        const url =
          await readVideo(file)

        item = {
          id: `MED-${Date.now()}`,
          name:
            name.trim() ||
            file.name.replace(
              /\.[^/.]+$/,
              ''
            ),
          url,
          type: 'Video',
          size: file.size,
          createdAt:
            new Date().toISOString(),
        }
      } else {
        alert(
          'Only images and videos are supported.'
        )

        return
      }

      const current =
        getMedia()

      saveMedia([
        item,
        ...current,
      ])

      setName('')
      setShowUpload(false)
    } catch {
      alert(
        'Something went wrong while processing this file.'
      )
    } finally {
      setProcessing(false)
    }
  }

  const startRename = (
    item: MediaItem
  ) => {
    setEditingId(item.id)
    setEditingName(item.name)
  }

  const saveRename = () => {
    if (!editingId) return

    const cleanName =
      editingName.trim()

    if (!cleanName) {
      setEditingId(null)
      return
    }

    updateMedia(
      editingId,
      {
        name: cleanName,
      }
    )

    setEditingId(null)
    setEditingName('')
  }

  const remove = (
    id: string
  ) => {
    if (
      !confirm(
        'Delete this media? This may remove it from places where it is currently used.'
      )
    ) {
      return
    }

    deleteMedia(id)
  }

  const copyUrl = async (
    url: string
  ) => {
    if (!url) return

    try {
      await navigator.clipboard.writeText(
        url
      )

      alert(
        'Media URL copied'
      )
    } catch {
      alert(
        'Could not copy the media URL.'
      )
    }
  }

  const formatSize = (
    bytes?: number
  ) => {
    if (!bytes) return ''

    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">
            Content
          </p>

          <h1 className="text-2xl font-medium">
            Media Library
          </h1>

          <p className="mt-1 text-sm text-v-gray">
            One central library for images and videos used across Velsario.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowUpload(true)
          }
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Upload size={14} />
          Upload Media
        </button>

      </div>

      {/* UPLOAD */}

      {showUpload && (

        <div className="mb-6 border border-v-border bg-white p-5 md:p-6">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-xs font-medium uppercase tracking-widest">
              Upload Media
            </p>

            <button
              type="button"
              onClick={() =>
                setShowUpload(false)
              }
              className="p-2 text-v-gray hover:text-black"
            >
              <X size={16} />
            </button>

          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Media name (optional)"
              className="input-field"
            />

            <label className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2">

              <Upload size={14} />

              {processing
                ? 'Processing...'
                : 'Choose Image / Video'}

              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                disabled={processing}
                onChange={(e) =>
                  upload(
                    e.target.files?.[0]
                  )
                }
              />

            </label>

          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-v-gray">
            Images are automatically resized to a maximum 2400px dimension and converted to WebP. Videos up to 4MB can be stored directly.
          </p>

        </div>

      )}

      {/* SEARCH */}

      <div className="mb-6 border border-v-border bg-white p-4">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search media..."
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* GRID */}

      {filtered.length > 0 ? (

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {filtered.map(
            (item) => (

              <div
                key={item.id}
                className="overflow-hidden border border-v-border bg-white"
              >

                {/* PREVIEW */}

                <div className="aspect-square overflow-hidden bg-gray-100">

                  {item.type ===
                  'Image' ? (

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
                      controls
                      className="h-full w-full object-cover"
                    />

                  )}

                </div>

                {/* DETAILS */}

                <div className="p-4">

                  {editingId ===
                  item.id ? (

                    <div className="flex gap-2">

                      <input
                        autoFocus
                        value={
                          editingName
                        }
                        onChange={(e) =>
                          setEditingName(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
                            'Enter'
                          ) {
                            saveRename()
                          }

                          if (
                            e.key ===
                            'Escape'
                          ) {
                            setEditingId(
                              null
                            )
                          }
                        }}
                        className="min-w-0 flex-1 border border-v-border px-2 py-1 text-xs outline-none focus:border-black"
                      />

                      <button
                        type="button"
                        onClick={
                          saveRename
                        }
                        className="p-1 text-green-600"
                      >
                        <Check
                          size={14}
                        />
                      </button>

                    </div>

                  ) : (

                    <div className="flex items-center justify-between gap-2">

                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          startRename(
                            item
                          )
                        }
                        className="shrink-0 p-1 text-v-gray hover:text-black"
                        title="Rename"
                      >
                        <Pencil
                          size={13}
                        />
                      </button>

                    </div>

                  )}

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-wider text-v-gray">

                    <span className="flex items-center gap-1">

                      {item.type ===
                      'Image' ? (
                        <ImageIcon
                          size={11}
                        />
                      ) : (
                        <Video
                          size={11}
                        />
                      )}

                      {item.type}

                    </span>

                    {item.width &&
                      item.height && (
                        <span>
                          {item.width}×
                          {item.height}
                        </span>
                      )}

                    {item.size && (
                      <span>
                        {formatSize(
                          item.size
                        )}
                      </span>
                    )}

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-4 flex items-center justify-between border-t border-v-border pt-3">

                    <button
                      type="button"
                      onClick={() =>
                        copyUrl(
                          item.url
                        )
                      }
                      className="p-2 text-v-gray hover:text-black"
                      title="Copy Media URL"
                    >
                      <Copy
                        size={14}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          item.url,
                          '_blank'
                        )
                      }
                      className="px-2 py-1 text-[10px] uppercase tracking-wider text-v-gray hover:text-black"
                    >
                      Open
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        remove(
                          item.id
                        )
                      }
                      className="p-2 text-v-gray hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2
                        size={14}
                      />
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      ) : (

        <div className="border border-v-border bg-white p-16 text-center">

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
