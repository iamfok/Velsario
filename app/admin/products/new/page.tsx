'use client'

import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [inStock, setInStock] = useState(true)

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

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
            Add New Product
          </h1>
        </div>

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
              placeholder="Enter product name"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-xs tracking-wider mb-2">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Shirts"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
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

            <p className="text-xs text-v-gray mt-2">
              Image upload will be connected later with the media library.
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block text-xs tracking-wider mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description..."
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
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-v-border">

          <Link
            href="/admin/products"
            className="px-5 py-3 border border-v-border text-xs tracking-wider hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
          >
            <Save size={15} />
            Save Product
          </button>

        </div>

      </div>

    </div>
  )
}
