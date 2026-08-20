'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const initialBrands = [
  { id: 1, name: 'VELSARIO', slug: 'velsario', products: 3, status: 'Active' },
]

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  const addBrand = () => {
    if (!name.trim()) return

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')

    setBrands([
      ...brands,
      {
        id: Date.now(),
        name: name.trim(),
        slug,
        products: 0,
        status: 'Active',
      },
    ])

    setName('')
    setShowForm(false)
  }

  const deleteBrand = (id: number) => {
    if (!confirm('Delete this brand?')) return

    setBrands(brands.filter((brand) => brand.id !== id))
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Catalog
          </p>

          <h1 className="text-2xl font-medium">
            Brands
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Add Brand
        </button>

      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase mb-4">
            New Brand
          </p>

          <div className="flex gap-3">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brand name"
              className="flex-1 border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <button
              onClick={addBrand}
              className="bg-v-black text-white px-6 text-xs tracking-wider"
            >
              Add
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-v-border bg-v-light">

              <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                Brand
              </th>

              <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium hidden md:table-cell">
                Slug
              </th>

              <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                Products
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

            {brands.map((brand) => (

              <tr
                key={brand.id}
                className="hover:bg-v-light transition-colors"
              >

                <td className="px-6 py-4">
                  <p className="text-sm font-medium">
                    {brand.name}
                  </p>
                </td>

                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-xs text-v-gray">
                    {brand.slug}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm">
                    {brand.products}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600">
                    {brand.status}
                  </span>
                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center justify-end gap-2">

                    <button
                      className="p-2 text-v-gray hover:text-v-black"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => deleteBrand(brand.id)}
                      className="p-2 text-v-gray hover:text-red-500"
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
  )
}
