'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Search,
} from 'lucide-react'

type Brand = {
  id: number
  name: string
  slug: string
  description: string
  logo: string
  status: 'Active' | 'Inactive'
  products: number
}

const defaultBrands: Brand[] = [
  {
    id: 1,
    name: 'VELSARIO',
    slug: 'velsario',
    description: 'Premium formal wear brand.',
    logo: '',
    status: 'Active',
    products: 3,
  },
]

export default function BrandsPage() {

  const [brands, setBrands] = useState<Brand[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] =
    useState('')
  const [logo, setLogo] = useState('')
  const [status, setStatus] =
    useState<'Active' | 'Inactive'>('Active')

  useEffect(() => {

    const saved = localStorage.getItem(
      'velsario-brands'
    )

    if (saved) {
      setBrands(JSON.parse(saved))
    } else {
      setBrands(defaultBrands)

      localStorage.setItem(
        'velsario-brands',
        JSON.stringify(defaultBrands)
      )
    }

  }, [])

  const saveBrands = (updated: Brand[]) => {

    setBrands(updated)

    localStorage.setItem(
      'velsario-brands',
      JSON.stringify(updated)
    )
  }

  const generateSlug = (value: string) => {

    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const openAddForm = () => {

    setEditingId(null)
    setName('')
    setSlug('')
    setDescription('')
    setLogo('')
    setStatus('Active')
    setShowForm(true)
  }

  const openEditForm = (brand: Brand) => {

    setEditingId(brand.id)
    setName(brand.name)
    setSlug(brand.slug)
    setDescription(brand.description)
    setLogo(brand.logo)
    setStatus(brand.status)
    setShowForm(true)
  }

  const closeForm = () => {

    setShowForm(false)
    setEditingId(null)
    setName('')
    setSlug('')
    setDescription('')
    setLogo('')
    setStatus('Active')
  }

  const saveBrand = () => {

    if (!name.trim()) return

    const finalSlug =
      slug.trim() || generateSlug(name)

    if (editingId !== null) {

      const updated = brands.map(brand =>
        brand.id === editingId
          ? {
              ...brand,
              name: name.trim(),
              slug: finalSlug,
              description:
                description.trim(),
              logo: logo.trim(),
              status,
            }
          : brand
      )

      saveBrands(updated)

    } else {

      const newBrand: Brand = {
        id: Date.now(),
        name: name.trim(),
        slug: finalSlug,
        description:
          description.trim(),
        logo: logo.trim(),
        status,
        products: 0,
      }

      saveBrands([
        ...brands,
        newBrand,
      ])
    }

    closeForm()
  }

  const deleteBrand = (id: number) => {

    const brand = brands.find(
      item => item.id === id
    )

    if (!brand) return

    if (brand.products > 0) {
      alert(
        'This brand contains products. Remove or move those products before deleting the brand.'
      )
      return
    }

    if (
      !confirm(
        'Are you sure you want to delete this brand?'
      )
    ) {
      return
    }

    saveBrands(
      brands.filter(
        item => item.id !== id
      )
    )
  }

  const filteredBrands = brands.filter(brand =>
    `${brand.name} ${brand.slug}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

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
            Create and manage product brands.
          </p>

        </div>

        <button
          onClick={openAddForm}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Add Brand
        </button>

      </div>


      {/* SEARCH */}

      <div className="bg-white border border-v-border p-4 mb-6">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />

          <input
            type="text"
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
            placeholder="Search brands..."
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>


      {/* FORM */}

      {showForm && (

        <div className="bg-white border border-v-border p-6 mb-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
                Catalog
              </p>

              <h2 className="text-lg font-medium">
                {editingId !== null
                  ? 'Edit Brand'
                  : 'New Brand'}
              </h2>

            </div>

            <button
              onClick={closeForm}
              className="p-2 hover:bg-gray-100"
            >
              <X size={17} />
            </button>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}

            <div>

              <label className="block text-xs tracking-wider mb-2">
                Brand Name
              </label>

              <input
                type="text"
                value={name}
                onChange={e => {

                  setName(e.target.value)

                  if (editingId === null) {
                    setSlug(
                      generateSlug(
                        e.target.value
                      )
                    )
                  }

                }}
                placeholder="e.g. VELSARIO"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />

            </div>


            {/* SLUG */}

            <div>

              <label className="block text-xs tracking-wider mb-2">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={e =>
                  setSlug(
                    generateSlug(
                      e.target.value
                    )
                  )
                }
                placeholder="velsario"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />

            </div>


            {/* LOGO */}

            <div className="md:col-span-2">

              <label className="block text-xs tracking-wider mb-2">
                Logo URL
              </label>

              <input
                type="text"
                value={logo}
                onChange={e =>
                  setLogo(e.target.value)
                }
                placeholder="https://..."
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />

              {logo && (

                <div className="mt-4 w-32 h-20 border border-v-border flex items-center justify-center overflow-hidden bg-gray-50">

                  <img
                    src={logo}
                    alt="Brand logo"
                    className="max-w-full max-h-full object-contain"
                  />

                </div>

              )}

            </div>


            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block text-xs tracking-wider mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={e =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Brand description..."
                rows={4}
                className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none focus:border-black"
              />

            </div>


            {/* STATUS */}

            <div>

              <label className="block text-xs tracking-wider mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={e =>
                  setStatus(
                    e.target.value as
                      | 'Active'
                      | 'Inactive'
                  )
                }
                className="w-full border border-v-border px-4 py-3 text-sm bg-white outline-none focus:border-black"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-v-border">

            <button
              onClick={closeForm}
              className="px-5 py-3 border border-v-border text-xs tracking-wider hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={saveBrand}
              className="flex items-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
            >
              <Save size={14} />

              {editingId !== null
                ? 'Save Changes'
                : 'Add Brand'}
            </button>

          </div>

        </div>
      )}


      {/* TABLE */}

      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

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

              {filteredBrands.map(brand => (

                <tr
                  key={brand.id}
                  className="hover:bg-v-light transition-colors"
                >

                  {/* BRAND */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-gray-50 border border-v-border flex items-center justify-center overflow-hidden flex-shrink-0">

                        {brand.logo ? (

                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-w-full max-h-full object-contain"
                          />

                        ) : (

                          <span className="text-xs font-medium">
                            {brand.name
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>

                        )}

                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {brand.name}
                        </p>

                        {brand.description && (
                          <p className="text-xs text-v-gray mt-1">
                            {brand.description}
                          </p>
                        )}

                      </div>

                    </div>

                  </td>


                  {/* SLUG */}

                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      {brand.slug}
                    </span>

                  </td>


                  {/* PRODUCTS */}

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {brand.products}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td className="px-6 py-4">

                    <button
                      onClick={() => {

                        const updated: Brand[] =
  brands.map(item =>
    item.id === brand.id
      ? {
          ...item,
          status:
            item.status === 'Active'
              ? 'Inactive'
              : 'Active',
        }
      : item
  )

saveBrands(updated)

                      }}
                      className={`text-xs px-2 py-1 ${
                        brand.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {brand.status}
                    </button>

                  </td>


                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        onClick={() =>
                          openEditForm(brand)
                        }
                        className="p-2 text-v-gray hover:text-v-black hover:bg-gray-100"
                        title="Edit brand"
                      >
                        <Edit size={14} />
                      </button>

                      <button
                        onClick={() =>
                          deleteBrand(brand.id)
                        }
                        className="p-2 text-v-gray hover:text-red-500 hover:bg-red-50"
                        title="Delete brand"
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


        {/* EMPTY */}

        {filteredBrands.length === 0 && (

          <div className="text-center py-16">

            <p className="text-sm text-gray-500">
              No brands found
            </p>

          </div>

        )}

      </div>


      {/* TOTAL */}

      <div className="mt-4 text-xs text-v-gray">
        Showing {filteredBrands.length} of{' '}
        {brands.length} brands
      </div>

    </div>
  )
}
