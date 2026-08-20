'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, Eye } from 'lucide-react'

const initialBanners = [
  {
    id: 'BAN-001',
    title: 'New Collection',
    image: '',
    position: 'Homepage Hero',
    status: 'Active',
  },
]

export default function BannersPage() {
  const [banners, setBanners] = useState(initialBanners)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [position, setPosition] = useState('Homepage Hero')

  const addBanner = () => {
    if (!title.trim()) return

    setBanners([
      ...banners,
      {
        id: `BAN-${String(banners.length + 1).padStart(3, '0')}`,
        title: title.trim(),
        image,
        position,
        status: 'Active',
      },
    ])

    setTitle('')
    setImage('')
    setPosition('Homepage Hero')
    setShowForm(false)
  }

  const deleteBanner = (id: string) => {
    if (!confirm('Delete this banner?')) return
    setBanners(banners.filter((banner) => banner.id !== id))
  }

  const toggleStatus = (id: string) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? {
              ...banner,
              status:
                banner.status === 'Active' ? 'Inactive' : 'Active',
            }
          : banner
      )
    )
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Content
          </p>

          <h1 className="text-2xl font-medium">
            Banners
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage promotional banners across your store.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Add Banner
        </button>

      </div>

      {/* ADD BANNER */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase font-medium mb-5">
            New Banner
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Banner title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >
              <option>Homepage Hero</option>
              <option>Homepage Secondary</option>
              <option>Shop Banner</option>
              <option>Category Banner</option>
            </select>

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addBanner}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Save Banner
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Banner
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Position
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {banners.map((banner) => (

                <tr
                  key={banner.id}
                  className="hover:bg-v-light transition-colors"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-24 h-14 bg-gray-100 flex items-center justify-center overflow-hidden">

                        {banner.image ? (
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon
                            size={20}
                            className="text-gray-400"
                          />
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {banner.title}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {banner.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-xs text-v-gray">
                    {banner.position}
                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() => toggleStatus(banner.id)}
                      className={`text-xs px-2 py-1 ${
                        banner.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {banner.status}
                    </button>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        className="p-2 text-v-gray hover:text-v-black"
                        title="Preview"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        className="p-2 text-v-gray hover:text-v-black"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>

                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="p-2 text-v-gray hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
