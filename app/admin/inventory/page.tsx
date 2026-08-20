'use client'

import { useState } from 'react'
import { Search, Package, AlertTriangle, Edit } from 'lucide-react'

const initialInventory = [
  {
    id: 'VEL-001',
    product: 'Premium Formal Shirt',
    sku: 'VEL-SHIRT-001',
    category: 'Shirts',
    stock: 24,
    lowStock: 5,
    status: 'In Stock',
  },
  {
    id: 'VEL-002',
    product: 'Classic White Shirt',
    sku: 'VEL-SHIRT-002',
    category: 'Shirts',
    stock: 8,
    lowStock: 5,
    status: 'In Stock',
  },
  {
    id: 'VEL-003',
    product: 'Premium Black Polo',
    sku: 'VEL-POLO-001',
    category: 'Polo',
    stock: 3,
    lowStock: 5,
    status: 'Low Stock',
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [search, setSearch] = useState('')

  const filtered = inventory.filter(
    (item) =>
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  const updateStock = (id: string, value: string) => {
    const stock = Math.max(0, Number(value) || 0)

    setInventory(
      inventory.map((item) => {
        if (item.id !== id) return item

        return {
          ...item,
          stock,
          status:
            stock === 0
              ? 'Out of Stock'
              : stock <= item.lowStock
              ? 'Low Stock'
              : 'In Stock',
        }
      })
    )
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Management
        </p>

        <h1 className="text-2xl font-medium">
          Inventory
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Monitor product stock levels.
        </p>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border border-v-border p-5">

          <p className="text-xs text-v-gray tracking-wider mb-2">
            Total Products
          </p>

          <p className="text-2xl font-semibold">
            {inventory.length}
          </p>

        </div>

        <div className="bg-white border border-v-border p-5">

          <p className="text-xs text-v-gray tracking-wider mb-2">
            Low Stock
          </p>

          <p className="text-2xl font-semibold">
            {inventory.filter((item) => item.status === 'Low Stock').length}
          </p>

        </div>

        <div className="bg-white border border-v-border p-5">

          <p className="text-xs text-v-gray tracking-wider mb-2">
            Out of Stock
          </p>

          <p className="text-2xl font-semibold">
            {inventory.filter((item) => item.status === 'Out of Stock').length}
          </p>

        </div>

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
            placeholder="Search product, SKU or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Update
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {filtered.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* PRODUCT */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                        <Package size={17} className="text-gray-500" />
                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {item.product}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {item.sku}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      {item.category}
                    </span>

                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      {item.status === 'Low Stock' && (
                        <AlertTriangle
                          size={15}
                          className="text-yellow-500"
                        />
                      )}

                      {item.status === 'Out of Stock' && (
                        <AlertTriangle
                          size={15}
                          className="text-red-500"
                        />
                      )}

                      <span className="text-sm font-medium">
                        {item.stock}
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex px-3 py-1 text-xs ${
                        item.status === 'In Stock'
                          ? 'bg-green-50 text-green-700'
                          : item.status === 'Low Stock'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* UPDATE */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end items-center gap-2">

                      <input
                        type="number"
                        min="0"
                        value={item.stock}
                        onChange={(e) =>
                          updateStock(item.id, e.target.value)
                        }
                        className="w-20 border border-v-border px-3 py-2 text-sm text-center outline-none focus:border-black"
                      />

                      <Edit
                        size={15}
                        className="text-gray-400"
                      />

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filtered.length === 0 && (

          <div className="text-center py-16">

            <Package
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No inventory items found.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}
