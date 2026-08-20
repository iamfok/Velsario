
'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const initialBrands = [
  {
    id: 'BR-001',
    name: 'Velsario',
    slug: 'velsario',
    products: 3,
    status: 'Active',
  },
]

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  const filtered = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  )

  const addBrand = () => {
    if (!name.trim()) return

    const newBrand = {
      id: `BR-${String(brands.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
      products: 0,
      status: 'Active',
    }

    setBrands([...brands, newBrand])
    setName('')
    setShowForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Catalog
          </p>

          <h1 className="text-2xl font-medium">
            Brands
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage brands in your product catalog.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Brand
        </button>

      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase font-medium mb-4">
            New Brand
          </p>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brand name"
              className="flex-1 border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <button
              onClick={addBrand}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Save Brand
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
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Brand
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
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

              {filtered.map((brand) => (

                <tr
                  key={brand.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium">
                      {brand.name}
                    </p>

                    <p className="text-xs text-v-gray mt-1">
                      {brand.id}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      /{brand.slug}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {brand.products}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="inline-flex bg-green-50 text-green-700 px-3 py-1 text-xs">
                      {brand.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>

                      <button
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

        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-v-gray">
            No brands found.
          </div>
        )}

      </div>

    </div>
  )
}
