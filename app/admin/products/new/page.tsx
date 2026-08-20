'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, ImagePlus } from 'lucide-react'

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [color, setColor] = useState('')
  const [stock, setStock] = useState('')
  const [featured, setFeatured] = useState(false)
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN FORM */}
        <div className="lg:col-span-2 bg-white border border-v-border p-6 md:p-8">

          <div className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-xs tracking-wider mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Velsario Men's White Formal Shirt"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs tracking-wider mb-2">
                SKU
              </label>

              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. VEL-SHIRT-001"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            {/* CATEGORY + COLOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-xs tracking-wider mb-2">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Shirts"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-2">
                  Color
                </label>

                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Black / White"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

            </div>

            {/* PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-xs tracking-wider mb-2">
                  Regular Price (BDT)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-2">
                  Sale Price (BDT)
                </label>

                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="Optional"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

            </div>

            {/* STOCK */}
            <div>
              <label className="block text-xs tracking-wider mb-2">
                Stock Quantity
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs tracking-wider mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write product description..."
                rows={7}
                className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black resize-none"
              />
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* IMAGE */}
          <div className="bg-white border border-v-border p-6">

            <p className="text-xs tracking-widest uppercase font-medium mb-4">
              Product Image
            </p>

            <div className="aspect-square bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">

              {image ? (
                <img
                  src={image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <ImagePlus
                    size={28}
                    className="mx-auto mb-2"
                  />

                  <p className="text-xs">
                    Image preview
                  </p>
                </div>
              )}

            </div>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black mt-4"
            />

            <p className="text-xs text-v-gray mt-2">
              Image upload will be connected later with Media Library.
            </p>

          </div>

          {/* STATUS */}
          <div className="bg-white border border-v-border p-6">

            <p className="text-xs tracking-widest uppercase font-medium mb-5">
              Product Status
            </p>

            <div className="space-y-4">

              <label className="flex items-center gap-3 text-sm cursor-pointer">

                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4"
                />

                In Stock

              </label>

              <label className="flex items-center gap-3 text-sm cursor-pointer">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4"
                />

                Featured Product

              </label>

            </div>

          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">

        <Link
          href="/admin/products"
          className="px-5 py-3 border border-v-border text-xs tracking-wider hover:bg-gray-100"
        >
          Cancel
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 bg-v-black text-white px-6 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Save size={15} />
          Save Product
        </button>

      </div>

    </div>
  )
}
