'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package
} from 'lucide-react'
import { products } from '@/lib/products'

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
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
            Products
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage your Velsario product catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Product
        </Link>

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
            placeholder="Search products by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Price
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Stock
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {filtered.map((product) => (

                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* PRODUCT */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-gray-100 flex-shrink-0 overflow-hidden">

                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={18} className="text-gray-400" />
                          </div>
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {product.name}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {product.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      {product.category}
                    </span>

                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4">

                    <span className="text-sm font-medium">
                      ৳{product.price.toLocaleString()}
                    </span>

                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex px-3 py-1 text-xs ${
                        product.inStock
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {product.inStock
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit product"
                      >
                        <Edit size={15} />
                      </Link>

                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
                        title="Delete product"
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

        {/* EMPTY */}
        {filtered.length === 0 && (

          <div className="text-center py-16">

            <Package
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-gray-500">
              No products found
            </p>

          </div>

        )}

      </div>

      {/* TOTAL */}
      <div className="mt-4 text-xs text-v-gray">
        Showing {filtered.length} of {products.length} products
      </div>

    </div>
  )
}
