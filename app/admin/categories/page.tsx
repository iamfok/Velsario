'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const initialCategories = [
  { id: 1, name: 'Shirts', slug: 'shirts', products: 2, status: 'Active' },
  { id: 2, name: 'Polo', slug: 'polo', products: 0, status: 'Active' },
  { id: 3, name: 'T-Shirts', slug: 't-shirts', products: 0, status: 'Active' },
  { id: 4, name: 'Pants', slug: 'pants', products: 0, status: 'Active' },
  { id: 5, name: 'Accessories', slug: 'accessories', products: 0, status: 'Active' },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  const addCategory = () => {
    if (!name.trim()) return

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')

    setCategories([
      ...categories,
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

  const deleteCategory = (id: number) => {
    if (!confirm('Delete this category?')) return

    setCategories(categories.filter(category => category.id !== id))
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
            Categories
          </h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Add Category
        </button>

      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase mb-4">
            New Category
          </p>

          <div className="flex gap-3">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="flex-1 border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <button
              onClick={addCategory}
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
                Category
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

            {categories.map(category => (

              <tr
                key={category.id}
                className="hover:bg-v-light transition-colors"
              >

                <td className="px-6 py-4">
                  <p className="text-sm font-medium">
                    {category.name}
                  </p>
                </td>

                <td className="px-6 py-4 hidden md:table-cell">
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
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600">
                    {category.status}
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
                      onClick={() => deleteCategory(category.id)}
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
