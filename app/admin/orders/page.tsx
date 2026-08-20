'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, ExternalLink } from 'lucide-react'

const SHEET_API = 'https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${SHEET_API}?action=getOrders`)
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (e) {
      // If getOrders not implemented, show empty
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-50 text-yellow-600',
    Processing: 'bg-blue-50 text-blue-600',
    Shipped: 'bg-purple-50 text-purple-600',
    Delivered: 'bg-green-50 text-green-600',
    Cancelled: 'bg-red-50 text-red-500',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">Manage</p>
          <h1 className="text-2xl font-medium">Orders</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchOrders} className="flex items-center gap-2 text-xs tracking-wider uppercase border border-v-border px-4 py-2 hover:bg-v-light transition-colors">
            <RefreshCw size={14} /> Refresh
          </button>
          <a
            href="https://docs.google.com/spreadsheets/d/1sdNaV27bRID-L9e999uffWOgzA4Z8xJEzB4VYBZFZxs"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-wider uppercase btn-primary"
          >
            <ExternalLink size={14} /> Open Sheet
          </a>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-v-gray text-sm">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-v-border p-12 text-center">
          <p className="text-v-gray mb-4 text-sm">No orders yet, or orders are managed in Google Sheets.</p>
          <a
            href="https://docs.google.com/spreadsheets/d/1sdNaV27bRID-L9e999uffWOgzA4Z8xJEzB4VYBZFZxs"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink size={14} /> View Orders in Google Sheets
          </a>
        </div>
      ) : (
        <div className="bg-white border border-v-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-v-border bg-v-light">
                <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Date</th>
                <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Customer</th>
                <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Product</th>
                <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Amount</th>
                <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-v-border">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-v-light transition-colors">
                  <td className="px-6 py-4 text-xs text-v-gray">{order.date}</td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium">৳{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 ${statusColors[order.status] || 'bg-gray-50 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
