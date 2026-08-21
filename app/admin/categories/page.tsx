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

type Category = {
  id: number
  name: string
  slug: string
  description: string
  status: 'Active' | 'Inactive'
  products: number
}

const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'Shirts',
    slug: 'shirts',
    description: 'Formal and premium shirts.',
    status: 'Active',
    products: 2,
  },
  {
    id: 2,
    name: 'Polo',
    slug: 'polo',
    description: 'Premium polo collection.',
    status: 'Active',
    products: 0,
  },
  {
    id: 3,
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Premium everyday t-shirts.',
    status: 'Active',
    products: 0,
  },
  {
    id: 4,
    name: 'Pants',
    slug: 'pants',
    description: 'Formal and premium pants.',
    status: 'Active',
    products: 0,
  },
  {
    id: 5,
    name: 'Accessories',
    slug: 'accessories',
    description: 'Premium fashion accessories.',
    status: 'Active',
    products: 0,
  },
]

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<Category[]>([])

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] =
    useState('')
  const [status, setStatus] =
    useState<'Active' | 'Inactive'>('Active')

  useEffect(() => {

    const saved = localStorage.getItem(
      'velsario-categories'
    )

    if (saved) {
      setCategories(JSON.parse(saved))
    } else {
      setCategories(defaultCategories)
      localStorage.setItem(
        'velsario-categories',
        JSON.stringify(defaultCategories)
      )
    }

  }, [])

  const saveCategories = (
    updated: Category[]
  ) => {

    setCategories(updated)

    localStorage.setItem(
      'velsario-categories',
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
    setStatus('Active')
    setShowForm(true)
  }

  const openEditForm = (
    category: Category
  ) => {

    setEditingId(category.id)
    setName(category.name)
    setSlug(category.slug)
    setDescription(category.description)
    setStatus(category.status)
    setShowForm(true)
  }

  const closeForm = () => {

    setShowForm(false)
    setEditingId(null)
    setName('')
    setSlug('')
    setDescription('')
    setStatus('Active')
  }

  const saveCategory = () => {

    if (!name.trim()) return

    const finalSlug =
      slug.trim() || generateSlug(name)

    if (editingId !== null) {

      const updated = categories.map(
        category =>
          category.id === editingId
            ? {
                ...category,
                name: name.trim(),
                slug: finalSlug,
                description:
                  description.trim(),
                status,
              }
            : category
      )

      saveCategories(updated)

    } else {

      const newCategory: Category = {
        id: Date.now(),
        name: name.trim(),
        slug: finalSlug,
        description:
          description.trim(),
        status,
        products: 0,
      }

      saveCategories([
        ...categories,
        newCategory,
      ])
    }

    closeForm()
  }

  const deleteCategory = (
    id: number
  ) => {

    const category = categories.find(
      item => item.id === id
    )

    if (!category) return

    if (category.products > 0) {
      alert(
        'This category contains products. Remove or move those products before deleting the category.'
      )
      return
    }

    if (
      !confirm(
        'Are you sure you want to delete this category?'
      )
    ) {
      return
    }

    saveCategories(
      categories.filter(
        item => item.id !== id
      )
    )
  }

  const filteredCategories =
    categories.filter(category =>
      `${category.name} ${category.slug}`
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
            Categories
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Create and manage product categories.
          </p>

        </div>

        <button
          onClick={openAddForm}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Add Category
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
            placeholder="Search categories..."
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
                  ? 'Edit Category'
                  : 'New Category'}
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
                Category Name
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
                placeholder="e.g. Shirts"
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
                placeholder="shirts"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />

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
                placeholder="Category description..."
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
              onClick={saveCategory}
              className="flex items-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
            >
              <Save size={14} />

              {editingId !== null
                ? 'Save Changes'
                : 'Add Category'}
            </button>

          </div>

        </div>
      )}


      {/* TABLE */}

      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Category
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

              {filteredCategories.map(
                category => (

                  <tr
                    key={category.id}
                    className="hover:bg-v-light transition-colors"
                  >

                    <td className="px-6 py-4">

                      <div>

                        <p className="text-sm font-medium">
                          {category.name}
                        </p>

                        {category.description && (
                          <p className="text-xs text-v-gray mt-1">
                            {category.description}
                          </p>
                        )}

                      </div>

                    </td>


                    <td className="px-6 py-4">

                      <span className="text-xs text-v-gray">
                        {category.slug}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <span className="text-sm">
                        {category.products}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <button
                        onClick={() => {

                          const updated =
                            categories.map(
                              item =>
                                item.id ===
                                category.id
                                  ? {
                                      ...item,
                                      status:
                                        item.status ===
                                        'Active'
                                          ? 'Inactive'
                                          : 'Active',
                                    }
                                  : item
                            )

                          saveCategories(
                            updated
                          )
                        }}
                        className={`text-xs px-2 py-1 ${
                          category.status ===
                          'Active'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {category.status}
                      </button>

                    </td>


                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-2">

                        <button
                          onClick={() =>
                            openEditForm(
                              category
                            )
                          }
                          className="p-2 text-v-gray hover:text-v-black hover:bg-gray-100"
                          title="Edit category"
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() =>
                            deleteCategory(
                              category.id
                            )
                          }
                          className="p-2 text-v-gray hover:text-red-500 hover:bg-red-50"
                          title="Delete category"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* EMPTY */}

        {filteredCategories.length === 0 && (

          <div className="text-center py-16">

            <p className="text-sm text-gray-500">
              No categories found
            </p>

          </div>

        )}

      </div>


      {/* TOTAL */}

      <div className="mt-4 text-xs text-v-gray">
        Showing {filteredCategories.length} of{' '}
        {categories.length} categories
      </div>

    </div>
  )
}
