'use client'

import { useMemo, useState } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  Eye,
  Upload,
  X,
} from 'lucide-react'
import {
  Banner,
  getBanners,
  saveBanners,
} from '@/lib/banners'
import {
  MediaItem,
  getMedia,
  saveMedia,
} from '@/lib/media'

const POSITIONS = [
  'Homepage Hero',
  'Homepage Secondary',
  'Homepage Bottom',
  'Page Hero',
]

async function readImage(file: File) {
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

  const maxWidth = 2400
  const scale = Math.min(1, maxWidth / image.width)

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))

  const ctx = canvas.getContext('2d')
  if (!ctx) return dataUrl

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/webp', 0.84)
}

async function readVideo(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
 
export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(() => getBanners())
  const [media, setMedia] = useState<MediaItem[]>(() => getMedia())
  const [editing, setEditing] = useState<Banner | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<
    'desktopImage' | 'mobileImage' | 'video' | null
  >(null)

  const activeCount = useMemo(
    () => banners.filter((banner) => banner.status === 'Active').length,
    [banners]
  )

  const refreshMedia = () => setMedia(getMedia())

  const emptyBanner = (): Banner => ({
    id: `BAN-${Date.now()}`,
    title: '',
    type: 'image',
    desktopImage: '',
    mobileImage: '',
    position: 'Homepage Hero',
    status: 'Active',
    pagePath: '',
    heading: '',
    subheading: '',
    description: '',
    buttonText: '',
    buttonUrl: '/shop',
    createdAt: new Date().toISOString(),
  })

  const openNew = () => {
    setEditing(emptyBanner())
    setShowForm(true)
    setMediaTarget(null)
    refreshMedia()
  }

  const openEdit = (banner: Banner) => {
    setEditing({ ...banner })
    setShowForm(true)
    setMediaTarget(null)
    refreshMedia()
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
    setMediaTarget(null)
  }

  const update = (key: keyof Banner, value: string) => {
    setEditing((current) =>
      current
        ? ({ ...current, [key]: value } as Banner)
        : current
    )
  }

  const addToMedia = (item: MediaItem) => {
    const current = getMedia()
    saveMedia([item, ...current])
    setMedia([item, ...current])
  }

  const uploadImage = async (
    key: 'desktopImage' | 'mobileImage',
    file?: File
  ) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    try {
      setUploading(true)
      const value = await readImage(file)

      const item: MediaItem = {
        id: `MED-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: value,
        type: 'Image',
        size: file.size,
        createdAt: new Date().toISOString(),
      }

      addToMedia(item)
      update(key, value)
    } catch {
      alert('Something went wrong while processing the image.')
    } finally {
      setUploading(false)
    }
  }

  const uploadVideo = async (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file.')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      alert('Video is larger than 4MB. Please compress the video before uploading.')
      return
    }

    try {
      setUploading(true)
      const value = await readVideo(file)

      const item: MediaItem = {
        id: `MED-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: value,
        type: 'Video',
        size: file.size,
        createdAt: new Date().toISOString(),
      }

      addToMedia(item)
      update('videoUrl', value)
    } catch {
      alert('Something went wrong while processing the video.')
    } finally {
      setUploading(false)
    }
  }

  const selectMedia = (item: MediaItem) => {
    if (!mediaTarget) return

    if (mediaTarget === 'desktopImage' || mediaTarget === 'mobileImage') {
      if (item.type !== 'Image') {
        alert('Please select an image.')
        return
      }
      update(mediaTarget, item.url)
    }

    if (mediaTarget === 'video') {
      if (item.type !== 'Video') {
        alert('Please select a video.')
        return
      }
      update('videoUrl', item.url)
    }

    setMediaTarget(null)
  }

  const save = () => {
    if (!editing?.title.trim()) {
      alert('Banner title is required.')
      return
    }

    if (editing.type === 'image' && !editing.desktopImage) {
      alert('Desktop banner image is required.')
      return
    }

    if (editing.type === 'video' && !editing.videoUrl) {
      alert('Video is required for a video banner.')
      return
    }

    if (
      editing.position === 'Page Hero' &&
      editing.pagePath?.trim() &&
      !editing.pagePath.trim().startsWith('/')
    ) {
      alert('Page path must start with /. Example: /about')
      return
    }

    const normalized: Banner = {
      ...editing,
      pagePath:
        editing.position === 'Page Hero'
          ? (editing.pagePath || '').trim()
          : '',
    }

    const index = banners.findIndex((item) => item.id === normalized.id)
    const updated = [...banners]

    if (index === -1) updated.push(normalized)
    else updated[index] = normalized

    setBanners(updated)
    saveBanners(updated)
    closeForm()
  }

  const remove = (id: string) => {
    if (!confirm('Delete this banner?')) return
    const updated = banners.filter((banner) => banner.id !== id)
    setBanners(updated)
    saveBanners(updated)
  }

  const toggleStatus = (id: string) => {
    const updated: Banner[] = banners.map((banner): Banner =>
      banner.id === id
        ? {
            ...banner,
            status:
              banner.status === 'Active'
                ? 'Inactive'
                : 'Active',
          }
        : banner
    )

    setBanners(updated)
    saveBanners(updated)
  }

  const currentMedia = media.filter((item) =>
    mediaTarget === 'video'
      ? item.type === 'Video'
      : item.type === 'Image'
  )

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-v-gray">
            Content
          </p>
          <h1 className="text-2xl font-medium">Banners</h1>
          <p className="mt-1 text-sm text-v-gray">
            {banners.length} banners · {activeCount} active
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Add Banner
        </button>
      </div>

      {showForm && editing && (
        <div className="mb-6 border border-v-border bg-white p-5 md:p-7">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest">
              {banners.some((item) => item.id === editing.id)
                ? 'Edit Banner'
                : 'New Banner'}
            </p>

            <button
              type="button"
              onClick={closeForm}
              className="p-2 text-v-gray hover:text-black"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={editing.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Banner title"
              className="input-field"
            />

            <select
              value={editing.position}
              onChange={(e) => update('position', e.target.value)}
              className="input-field bg-white"
            >
              {POSITIONS.map((position) => (
                <option key={position}>{position}</option>
              ))}
            </select>

            <select
              value={editing.type}
              onChange={(e) => update('type', e.target.value)}
              className="input-field bg-white"
            >
              <option value="image">Image Banner</option>
              <option value="video">Video Banner</option>
            </select>

            <select
              value={editing.status}
              onChange={(e) => update('status', e.target.value)}
              className="input-field bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {editing.position === 'Page Hero' && (
            <div className="mt-5 border border-v-border bg-v-light p-4">
              <label className="mb-2 block text-[10px] uppercase tracking-widest text-v-gray">
                Page Path
              </label>

              <input
                value={editing.pagePath || ''}
                onChange={(e) =>
                  update('pagePath', e.target.value)
                }
                placeholder="/about"
                className="input-field bg-white"
              />

              <p className="mt-2 text-[10px] leading-relaxed text-v-gray">
                Leave empty to use this as the fallback banner for all public
                pages that do not have their own Page Hero. Use the exact path,
                for example /about, /contact, /shop or /shop?category=velsario-shirt.
              </p>
            </div>
          )}

          {editing.type === 'image' ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {(['desktopImage', 'mobileImage'] as const).map((key) => (
                <div
                  key={key}
                  className="border border-dashed border-v-border p-4"
                >
                  <p className="mb-3 text-xs uppercase tracking-widest">
                    {key === 'desktopImage'
                      ? 'Desktop Banner'
                      : 'Mobile Banner'}
                  </p>

                  {editing[key] ? (
                    <>
                      <div className="relative overflow-hidden">
                        <img
                          src={editing[key]}
                          alt=""
                          className="aspect-[16/7] w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => update(key, '')}
                          className="absolute right-2 top-2 rounded-full bg-black/80 p-2 text-white"
                        >
                          <X size={13} />
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            refreshMedia()
                            setMediaTarget(key)
                          }}
                          className="border border-v-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-black"
                        >
                          Change Media
                        </button>

                        <label className="flex cursor-pointer items-center justify-center gap-2 border border-v-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-black">
                          <Upload size={12} />
                          Upload New
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={(e) =>
                              uploadImage(key, e.target.files?.[0])
                            }
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => {
                          refreshMedia()
                          setMediaTarget(key)
                        }}
                        className="flex min-h-32 w-full flex-col items-center justify-center border border-v-border bg-v-light text-center hover:bg-gray-200"
                      >
                        <ImageIcon size={20} className="mb-2 text-v-gray" />
                        <span className="text-xs font-medium">
                          Select from Media
                        </span>
                        <span className="mt-1 text-[10px] text-v-gray">
                          Choose an existing image
                        </span>
                      </button>

                      <label className="flex cursor-pointer items-center justify-center gap-2 border border-v-black px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white">
                        <Upload size={14} />
                        Upload New
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading}
                          onChange={(e) =>
                            uploadImage(key, e.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 border border-dashed border-v-border p-4">
              <p className="mb-3 text-xs uppercase tracking-widest">
                Video Banner
              </p>

              {editing.videoUrl ? (
                <>
                  <video
                    src={editing.videoUrl}
                    controls
                    muted
                    playsInline
                    className="aspect-video w-full bg-black object-cover"
                  />

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        refreshMedia()
                        setMediaTarget('video')
                      }}
                      className="border border-v-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-black"
                    >
                      Change Media
                    </button>

                    <label className="flex cursor-pointer items-center justify-center gap-2 border border-v-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-black">
                      <Upload size={12} />
                      Upload New
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) =>
                          uploadVideo(e.target.files?.[0])
                        }
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      refreshMedia()
                      setMediaTarget('video')
                    }}
                    className="flex min-h-32 w-full flex-col items-center justify-center border border-v-border bg-v-light text-center hover:bg-gray-200"
                  >
                    <Video size={20} className="mb-2 text-v-gray" />
                    <span className="text-xs font-medium">
                      Select from Media
                    </span>
                  </button>

                  <label className="flex cursor-pointer items-center justify-center gap-2 border border-v-black px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white">
                    <Upload size={14} />
                    Upload New
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        uploadVideo(e.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              )}

              <div className="mt-4">
                <label className="text-[10px] uppercase tracking-widest text-v-gray">
                  Or use hosted Video URL
                </label>

                <input
                  value={editing.videoUrl || ''}
                  onChange={(e) => update('videoUrl', e.target.value)}
                  placeholder="https://..."
                  className="input-field mt-2"
                />
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={editing.heading || ''}
              onChange={(e) => update('heading', e.target.value)}
              placeholder="Heading"
              className="input-field"
            />

            <input
              value={editing.subheading || ''}
              onChange={(e) => update('subheading', e.target.value)}
              placeholder="Subheading"
              className="input-field"
            />

            <textarea
              value={editing.description || ''}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Description"
              rows={3}
              className="input-field"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                value={editing.buttonText || ''}
                onChange={(e) => update('buttonText', e.target.value)}
                placeholder="Button text"
                className="input-field"
              />

              <input
                value={editing.buttonUrl || ''}
                onChange={(e) => update('buttonUrl', e.target.value)}
                placeholder="Button URL"
                className="input-field"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={save}
              disabled={uploading}
              className="btn-primary disabled:opacity-50"
            >
              {uploading ? 'Processing...' : 'Save Banner'}
            </button>
          </div>

          {mediaTarget && (
            <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6">
              <div className="flex max-h-[90vh] w-full max-w-5xl flex-col bg-white">
                <div className="flex items-center justify-between border-b border-v-border p-4 md:p-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-v-gray">
                      Media Library
                    </p>
                    <h3 className="mt-1 text-lg font-medium">
                      Select {mediaTarget === 'video' ? 'Video' : 'Image'}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMediaTarget(null)}
                    className="p-2 text-v-gray hover:text-black"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="overflow-y-auto p-4 md:p-5">
                  {currentMedia.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {currentMedia.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => selectMedia(item)}
                          className="group overflow-hidden border border-v-border text-left hover:border-black"
                        >
                          <div className="aspect-square overflow-hidden bg-v-light">
                            {item.type === 'Image' ? (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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

                          <div className="p-2">
                            <p className="truncate text-xs font-medium">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[9px] uppercase tracking-wider text-v-gray">
                              {item.type}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <ImageIcon
                        size={28}
                        className="mx-auto mb-3 text-gray-400"
                      />
                      <p className="text-sm text-v-gray">
                        No compatible media found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="overflow-hidden border border-v-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-v-light">
              <tr className="border-b border-v-border">
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">
                  Banner
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-widest text-v-gray">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-v-border">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-v-light">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-24 overflow-hidden bg-gray-100">
                        {banner.type === 'video' ? (
                          <div className="flex h-full items-center justify-center">
                            <Video size={18} className="text-v-gray" />
                          </div>
                        ) : banner.desktopImage ? (
                          <img
                            src={banner.desktopImage}
                            alt={banner.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon size={18} className="text-v-gray" />
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{banner.title}</p>
                        <p className="mt-1 text-xs text-v-gray">
                          {banner.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-v-gray">
                    {banner.position}
                  </td>

                  <td className="max-w-[220px] truncate px-6 py-4 text-xs text-v-gray">
                    {banner.position === 'Page Hero'
                      ? banner.pagePath || 'All public pages'
                      : '—'}
                  </td>

                  <td className="px-6 py-4 text-xs uppercase text-v-gray">
                    {banner.type}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleStatus(banner.id)}
                      className={`px-2 py-1 text-xs ${
                        banner.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {banner.status}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(banner)}
                        className="p-2 text-v-gray hover:text-black"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(banner.id)}
                        className="p-2 text-v-gray hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (banner.desktopImage) {
                            window.open(banner.desktopImage, '_blank')
                          } else if (banner.videoUrl) {
                            window.open(banner.videoUrl, '_blank')
                          }
                        }}
                        className="p-2 text-v-gray hover:text-black"
                        title="Preview"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {banners.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-v-gray"
                  >
                    No banners yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
