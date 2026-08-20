'use client'

import Link from 'next/link'
import {
  Search,
  RefreshCw,
  Eye,
  ShoppingCart,
} from 'lucide-react'
import { useState } from 'react'

type Order = {
  id: string
  date: string
  customer: string
  product: string
  amount: number
  status: string
  paymentStatus: string
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [orders] = useState<Order[]>([])

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.product.toLowerCase().includes(search.toLowerCase())
  )

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-50 text-yellow-600',
    Processing: 'bg-blue-50 text-blue-600',
    Shipped: 'bg-purple-50 text-purple-600',
    Delivered: 'bg-green-50 text-green-600',
    Cancelled: 'bg-red-50 text-red-500',
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Manage
          </p>

          <h1 className="text-2xl font-medium">
            Orders
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage all customer orders from your store.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 border border-v-border px-5 py-3 text-xs tracking-wider uppercase hover:bg-v-light transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer or product..."
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* ORDERS TABLE */}
      {filteredOrders.length > 0 ? (

        <div className="bg-white border border-v-border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b border-v-border bg-v-light">

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Order
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Product
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-v-border">

                {filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="hover:bg-v-light transition-colors"
                  >

                    <td className="px-6 py-4">

                      <p className="text-sm font-medium">
                        {order.id}
                      </p>

                      <p className="text-xs text-v-gray mt-1">
                        {order.date}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {order.product}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium">
                      ৳{order.amount.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`text-xs px-3 py-1 ${
                          statusColors[order.status] ||
                          'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center gap-2 px-3 py-2 border border-v-border text-xs hover:bg-black hover:text-white transition-colors"
                        >
                          <Eye size={14} />
                          Manage
                        </Link>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      ) : (

        /* EMPTY STATE */
        <div className="bg-white border border-v-border">

          <div className="text-center py-20 px-6">

            <div className="w-14 h-14 bg-gray-50 mx-auto flex items-center justify-center mb-5">

              <ShoppingCart
                size={24}
                className="text-gray-400"
              />

            </div>

            <h2 className="text-lg font-medium">
              No orders yet
            </h2>

            <p className="text-sm text-v-gray mt-2 max-w-md mx-auto">
              Orders placed through your Velsario store will appear here.
            </p>

            <p className="text-xs text-gray-400 mt-4">
              Order storage will be connected to the Cloudflare database.
            </p>

          </div>

        </div>

      )}

    </div>
  )
}
