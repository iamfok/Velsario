'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'

export default function EditProductPage() {
  const [name, setName] = useState('Premium Formal Shirt')
  const [category, setCategory] = useState('Shirts')
  const [price, setPrice] = useState('2490')
  const [description, setDescription] = useState(
    'Premium quality formal shirt designed for a clean and elegant look.'
  )
  const [image, setImage] = useState('')
  const [inStock, setInStock] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    window.location.href = '/admin/products'
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          <Link
            href="/admin/products"
            className="p-2 border border-v-border hover:bg-gray-100"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>

            <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
              Products
            </p>

            <h1 className="text-2xl font-medium">
              Edit Product
            </h1>

          </div>

        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700"
        >
          <Trash2 size={15} />
          Delete
        </button>

      </div>

      {/* FORM */}
      <div className="bg-white border border-v-border p-6 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PRODUCT NAME */}
          <div className="md:col-span-2">

            <label className="block text-xs tracking-wider mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="block text-xs tracking-wider mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >
              <option>Shirts</option>
              <option>Polo</option>
              <option>T-Shirts</option>
              <option>Pants</option>
              <option>Accessories</option>
            </select>

          </div>

          {/* PRICE */}
          <div>

            <label className="block text-xs tracking-wider mb-2">
              Price (BDT)
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          {/* IMAGE */}
          <div className="md:col-span-2">

            <label className="block text-xs tracking-wider mb-2">
              Product Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            {image && (
              <div className="mt-4 w-32 h-32 bg-gray-100 overflow-hidden">

                <img
                  src={image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description..."
              rows={6}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black resize-none"
            />

          </div>

          {/* STOCK */}
          <div className="md:col-span-2">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4"
              />

              <span className="text-sm">
                Product is in stock
              </span>

            </label>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-v-border">

          {saved && (
            <span className="text-xs text-green-600">
              Product saved successfully
            </span>
          )}

          <Link
            href="/admin/products"
            className="px-5 py-3 border border-v-border text-xs tracking-wider hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
          >
            <Save size={15} />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}
