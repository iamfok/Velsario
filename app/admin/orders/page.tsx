'use client'

import { useEffect, useState } from 'react'
import {
  RefreshCw,
  ExternalLink,
  Eye,
  X,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard
} from 'lucide-react'

const SHEET_API =
  'https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec'

type Order = {
  id?: string
  orderId?: string
  date?: string
  customer?: string
  name?: string
  phone?: string
  email?: string
  address?: string
  product?: string
  quantity?: number | string
  amount?: number | string
  total?: number | string
  status?: string
  payment?: string
  paymentMethod?: string
  [key: string]: any
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const fetchOrders = async () => {
    setLoading(true)

    try {
      const res = await fetch(`${SHEET_API}?action=getOrders`)
      const data = await res.json()

      setOrders(data.orders || [])
    } catch (error) {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-50 text-yellow-600',
    Processing: 'bg-blue-50 text-blue-600',
    Shipped: 'bg-purple-50 text-purple-600',
    Delivered: 'bg-green-50 text-green-600',
    Cancelled: 'bg-red-50 text-red-500',
  }

  const getCustomer = (order: Order) =>
    order.customer || order.name || '—'

  const getAmount = (order: Order) =>
    order.amount ?? order.total ?? 0

  const getOrderId = (order: Order) =>
    order.orderId || order.id || '—'

  return (
    <div>

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
            Manage customer orders and fulfillment.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 text-xs tracking-wider uppercase border border-v-border px-4 py-2 hover:bg-v-light transition-colors"
          >
            <RefreshCw
              size={14}
              className={loading ? 'animate-spin' : ''}
            />
            Refresh
          </button>

          <a
            href="https://docs.google.com/spreadsheets/d/1sdNaV27bRID-L9e999uffWOgzA4Z8xJEzB4VYBZFZxs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-wider uppercase btn-primary"
          >
            <ExternalLink size={14} />
            Open Sheet
          </a>

        </div>
      </div>


      {/* LOADING */}
      {loading ? (

        <div className="bg-white border border-v-border p-16 text-center">
          <RefreshCw
            size={22}
            className="animate-spin mx-auto mb-3 text-v-gray"
          />

          <p className="text-sm text-v-gray">
            Loading orders...
          </p>
        </div>

      ) : orders.length === 0 ? (

        /* EMPTY */
        <div className="bg-white border border-v-border p-12 text-center">

          <Package
            size={30}
            className="mx-auto mb-4 text-v-gray"
          />

          <p className="text-sm text-v-gray mb-5">
            No orders found.
          </p>

          <a
            href="https://docs.google.com/spreadsheets/d/1sdNaV27bRID-L9e999uffWOgzA4Z8xJEzB4VYBZFZxs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink size={14} />
            View Orders in Google Sheets
          </a>

        </div>

      ) : (

        /* ORDERS TABLE */
        <div className="bg-white border border-v-border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-v-border bg-v-light">

                  <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Order
                  </th>

                  <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Date
                  </th>

                  <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Customer
                  </th>

                  <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Amount
                  </th>

                  <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Status
                  </th>

                  <th className="text-right px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-v-border">

                {orders.map((order, i) => (

                  <tr
                    key={i}
                    className="hover:bg-v-light transition-colors"
                  >

                    {/* ORDER */}
                    <td className="px-6 py-4">

                      <p className="text-sm font-medium">
                        {getOrderId(order)}
                      </p>

                      {order.product && (
                        <p className="text-xs text-v-gray mt-1 line-clamp-1">
                          {order.product}
                        </p>
                      )}

                    </td>


                    {/* DATE */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-v-gray">
                        {order.date || '—'}
                      </span>
                    </td>


                    {/* CUSTOMER */}
                    <td className="px-6 py-4">

                      <p className="text-sm">
                        {getCustomer(order)}
                      </p>

                      {order.phone && (
                        <p className="text-xs text-v-gray mt-1">
                          {order.phone}
                        </p>
                      )}

                    </td>


                    {/* AMOUNT */}
                    <td className="px-6 py-4">

                      <span className="text-sm font-medium">
                        ৳{Number(getAmount(order)).toLocaleString()}
                      </span>

                    </td>


                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <span
                        className={`text-xs px-2 py-1 ${
                          statusColors[order.status || 'Pending'] ||
                          'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {order.status || 'Pending'}
                      </span>

                    </td>


                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-2 border border-v-border px-3 py-2 text-xs hover:bg-black hover:text-white transition-colors"
                        >
                          <Eye size={14} />
                          Manage
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}
          <button
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
          />

          {/* MODAL */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-v-border">

              <div>

                <p className="text-xs tracking-widest uppercase text-v-gray mb-1">
                  Order Details
                </p>

                <h2 className="text-lg font-medium">
                  {getOrderId(selectedOrder)}
                </h2>

              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-v-light"
              >
                <X size={18} />
              </button>

            </div>


            {/* DETAILS */}
            <div className="p-6 space-y-6">

              {/* CUSTOMER */}
              <div>

                <div className="flex items-center gap-2 mb-4">

                  <User size={16} />

                  <h3 className="text-xs tracking-widest uppercase font-medium">
                    Customer
                  </h3>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-v-gray mb-1">
                      Name
                    </p>

                    <p className="text-sm">
                      {getCustomer(selectedOrder)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-v-gray mb-1">
                      Phone
                    </p>

                    <p className="text-sm">
                      {selectedOrder.phone || '—'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-v-gray mb-1">
                      Email
                    </p>

                    <p className="text-sm">
                      {selectedOrder.email || '—'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-v-gray mb-1">
                      Order Date
                    </p>

                    <p className="text-sm">
                      {selectedOrder.date || '—'}
                    </p>
                  </div>

                </div>

              </div>


              {/* ADDRESS */}
              <div>

                <div className="flex items-center gap-2 mb-3">

                  <MapPin size={16} />

                  <h3 className="text-xs tracking-widest uppercase font-medium">
                    Shipping Address
                  </h3>

                </div>

                <div className="bg-v-light p-4 text-sm leading-6">
                  {selectedOrder.address || 'No address available'}
                </div>

              </div>


              {/* PRODUCT */}
              <div>

                <div className="flex items-center gap-2 mb-3">

                  <Package size={16} />

                  <h3 className="text-xs tracking-widest uppercase font-medium">
                    Order Item
                  </h3>

                </div>

                <div className="border border-v-border p-4">

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-sm font-medium">
                        {selectedOrder.product || 'Product'}
                      </p>

                      <p className="text-xs text-v-gray mt-1">
                        Quantity: {selectedOrder.quantity || 1}
                      </p>

                    </div>

                    <p className="text-sm font-medium">
                      ৳{Number(getAmount(selectedOrder)).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>


              {/* PAYMENT */}
              <div>

                <div className="flex items-center gap-2 mb-3">

                  <CreditCard size={16} />

                  <h3 className="text-xs tracking-widest uppercase font-medium">
                    Payment
                  </h3>

                </div>

                <div className="flex justify-between border-b border-v-border py-3">

                  <span className="text-sm text-v-gray">
                    Payment Method
                  </span>

                  <span className="text-sm">
                    {selectedOrder.paymentMethod ||
                      selectedOrder.payment ||
                      '—'}
                  </span>

                </div>

                <div className="flex justify-between py-3">

                  <span className="text-sm font-medium">
                    Total
                  </span>

                  <span className="text-sm font-semibold">
                    ৳{Number(getAmount(selectedOrder)).toLocaleString()}
                  </span>

                </div>

              </div>


              {/* STATUS */}
              <div>

                <p className="text-xs tracking-widest uppercase font-medium mb-3">
                  Order Status
                </p>

                <div className="border border-v-border p-4">

                  <span
                    className={`inline-block text-xs px-3 py-2 ${
                      statusColors[selectedOrder.status || 'Pending'] ||
                      'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {selectedOrder.status || 'Pending'}
                  </span>

                  <p className="text-xs text-v-gray mt-3">
                    Status update will be connected to the order database in the next step.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
