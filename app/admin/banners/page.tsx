'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, X, Eye } from 'lucide-react'

const initialBanners = [
  {
    id: 'BAN-001',
    title: 'New Collection',
    image: '',
    position: 'Homepage Hero',
    status: 'Active',
  },
  {
    id: 'BAN-002',
    title: 'Premium Essentials',
    image: '',
    position: 'Homepage Secondary',
    status: 'Inactive',
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

    const newBanner = {
      id: `BAN-${String(banners.length + 1).padStart(3, '0')}`,
      title: title.trim(),
      image,
      position,
      status: 'Active',
    }

    setBanners([...banners, newBanner])
    setTitle('')
    setImage('')
    setPosition('Homepage Hero')
    setShowForm(false)
  }

  const deleteBanner = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id))
  }

  const toggleStatus = (id: string) => {
    setBanners(
      banners.map((banner) =>
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
    )
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
            Banners
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage promotional banners across your store.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Banner
        </button>

      </div>

      {/* ADD BANNER */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <div className="flex items-center justify-between mb-5">

            <p className="text-xs tracking-widest uppercase font-medium">
              New Banner
            </p>

            <button
              onClick={() => setShowForm(false)}
              className="p-1 text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>

          </div>

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

      {/* BANNERS */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

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
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* BANNER */}
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

                  {/* POSITION */}
                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      {banner.position}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <button
                      onClick={() => toggleStatus(banner.id)}
                      className={`inline-flex px-3 py-1 text-xs ${
                        banner.status === 'Active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {banner.status}
                    </button>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Preview"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {banners.length === 0 && (
          <div className="text-center py-16">

            <ImageIcon
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No banners available.
            </p>

          </div>
        )}

      </div>

    </div>
  )
}
