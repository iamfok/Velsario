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

const POSITIONS = [
  'Homepage Hero',
  'Homepage Secondary',
  'Homepage Bottom',
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

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(() => getBanners())
  const [editing, setEditing] = useState<Banner | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)

  const activeCount = useMemo(
    () => banners.filter((banner) => banner.status === 'Active').length,
    [banners]
  )

  const emptyBanner = (): Banner => ({
    id: `BAN-${Date.now()}`,
    title: '',
    type: 'image',
    desktopImage: '',
    mobileImage: '',
    position: 'Homepage Hero',
    status: 'Active',
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
  }

  const update = (key: keyof Banner, value: string) => {
    setEditing((current) =>
      current ? { ...current, [key]: value } : current
    )
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
      update(key, value)
    } finally {
      setUploading(false)
    }
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
      alert('Video URL is required for a video banner.')
      return
    }

    const index = banners.findIndex((item) => item.id === editing.id)
    const updated = [...banners]

    if (index === -1) updated.push(editing)
    else updated[index] = editing

    setBanners(updated)
    saveBanners(updated)
    setEditing(null)
    setShowForm(false)
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>
          <h1 className="text-2xl font-medium">Banners</h1>
          <p className="text-sm text-v-gray mt-1">
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
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs tracking-widest uppercase font-medium">
              {banners.some((item) => item.id === editing.id)
                ? 'Edit Banner'
                : 'New Banner'}
            </p>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditing(null)
              }}
              className="p-2 text-v-gray hover:text-black"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {editing.type === 'image' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(['desktopImage', 'mobileImage'] as const).map((key) => (
                <div key={key} className="border border-dashed border-v-border p-4">
                  <p className="text-xs tracking-widest uppercase mb-3">
                    {key === 'desktopImage'
                      ? 'Desktop Banner'
                      : 'Mobile Banner'}
                  </p>

                  {editing[key] ? (
                    <div className="relative">
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
                  ) : (
                    <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center text-center">
                      <Upload size={20} className="mb-2 text-v-gray" />
                      <span className="text-xs font-medium">
                        Upload {key === 'desktopImage' ? 'Desktop' : 'Mobile'}
                      </span>
                      <span className="mt-1 text-[10px] text-v-gray">
                        Image is automatically resized/compressed
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          uploadImage(key, e.target.files?.[0])
                        }
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <label className="text-xs tracking-widest uppercase">
                Video URL
              </label>
              <input
                value={editing.videoUrl || ''}
                onChange={(e) => update('videoUrl', e.target.value)}
                placeholder="https://..."
                className="input-field mt-2"
              />
              <p className="mt-2 text-[10px] text-v-gray">
                Use an optimized hosted video URL. Direct browser video transcoding
                is intentionally not done here because it can crash/lock the browser.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
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
        </div>
      )}

      <div className="overflow-hidden border border-v-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-v-light">
              <tr className="border-b border-v-border">
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">Banner</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">Position</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">Type</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-v-gray">Status</th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-widest text-v-gray">Actions</th>
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
                          <img src={banner.desktopImage} alt={banner.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon size={18} className="text-v-gray" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{banner.title}</p>
                        <p className="text-xs text-v-gray mt-1">{banner.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-v-gray">{banner.position}</td>
                  <td className="px-6 py-4 text-xs uppercase text-v-gray">{banner.type}</td>

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
                        onClick={() => setEditing(banner)}
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
                  <td colSpan={5} className="px-6 py-16 text-center text-sm text-v-gray">
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
