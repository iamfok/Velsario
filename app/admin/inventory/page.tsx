'use client'

import { useState } from 'react'
import { Search, Package, AlertTriangle } from 'lucide-react'

const initialInventory = [
  {
    id: 'VEL-001',
    product: 'Premium Formal Shirt',
    sku: 'VEL-SHIRT-001',
    category: 'Shirts',
    stock: 24,
    lowStock: 5,
  },
  {
    id: 'VEL-002',
    product: 'Classic White Shirt',
    sku: 'VEL-SHIRT-002',
    category: 'Shirts',
    stock: 8,
    lowStock: 5,
  },
  {
    id: 'VEL-003',
    product: 'Premium Black Polo',
    sku: 'VEL-POLO-001',
    category: 'Polo',
    stock: 3,
    lowStock: 5,
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
      inventory.map((item) =>
        item.id === id ? { ...item, stock } : item
      )
    )
  }

  const lowStock = inventory.filter(
    (item) => item.stock > 0 && item.stock <= item.lowStock
  ).length

  const outOfStock = inventory.filter(
    (item) => item.stock === 0
  ).length

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Management
        </p>

        <h1 className="text-2xl font-medium">
          Inventory
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Monitor and manage product stock.
        </p>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

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
            {lowStock}
          </p>
        </div>

        <div className="bg-white border border-v-border p-5">
          <p className="text-xs text-v-gray tracking-wider mb-2">
            Out of Stock
          </p>
          <p className="text-2xl font-semibold">
            {outOfStock}
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

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

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

              {filtered.map((item) => {

                const status =
                  item.stock === 0
                    ? 'Out of Stock'
                    : item.stock <= item.lowStock
                    ? 'Low Stock'
                    : 'In Stock'

                return (

                  <tr
                    key={item.id}
                    className="hover:bg-v-light transition-colors"
                  >

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

                    <td className="px-6 py-4 text-xs text-v-gray">
                      {item.category}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        {status !== 'In Stock' && (
                          <AlertTriangle
                            size={14}
                            className={
                              status === 'Out of Stock'
                                ? 'text-red-500'
                                : 'text-yellow-500'
                            }
                          />
                        )}

                        <span className="text-sm font-medium">
                          {item.stock}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`text-xs px-2 py-1 ${
                          status === 'In Stock'
                            ? 'bg-green-50 text-green-600'
                            : status === 'Low Stock'
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-red-50 text-red-500'
                        }`}
                      >
                        {status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <input
                          type="number"
                          min="0"
                          value={item.stock}
                          onChange={(e) =>
                            updateStock(item.id, e.target.value)
                          }
                          className="w-20 border border-v-border px-3 py-2 text-sm text-center outline-none focus:border-black"
                        />

                      </div>

                    </td>

                  </tr>

                )
              })}

            </tbody>

          </table>

        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-v-gray">
            No inventory items found.
          </div>
        )}

      </div>

    </div>
  )
}
