'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Printer,
  FileText,
  Mail,
  Save,
} from 'lucide-react'
import { useState } from 'react'

export default function OrderDetailsPage() {
  const [orderStatus, setOrderStatus] = useState('Pending')
  const [paymentStatus, setPaymentStatus] = useState('Pending')

  const order = {
    id: 'SK-602371',
    date: '21 Aug 2026',
    customer: 'iamskkamalh',
    phone: '013229120967',
    email: 'email@example.com',
    product: 'New Cross Style Handbag',
    sku: 'SK320251000049',
    quantity: 3,
    price: 700,
    subtotal: 2100,
    shipping: 60,
    total: 2160,
    paid: 0,
    due: 2160,
    paymentMethod: 'COD',
    city: 'Dhaka',
    country: 'Bangladesh',
  }

  const handleUpdate = () => {
    alert('Order updated successfully.')
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div className="flex items-center gap-4">

          <Link
            href="/admin/orders"
            className="p-2 border border-v-border hover:bg-gray-100"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>

            <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
              Orders
            </p>

            <h1 className="text-2xl font-medium">
              Order {order.id}
            </h1>

            <p className="text-xs text-v-gray mt-1">
              {order.date}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <span className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600">
            {orderStatus}
          </span>

          <span className="px-3 py-1 text-xs bg-red-50 text-red-500">
            Payment {paymentStatus}
          </span>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* ITEMS */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Items
            </h2>

            <div className="flex items-center justify-between py-4 border-b border-v-border">

              <div>

                <p className="text-sm font-medium">
                  {order.product}
                </p>

                <p className="text-xs text-v-gray mt-1">
                  SKU: {order.sku}
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm">
                  ৳{order.price.toLocaleString()} × {order.quantity}
                </p>

                <p className="text-sm font-medium mt-1">
                  ৳{order.subtotal.toLocaleString()}
                </p>

              </div>

            </div>

          </div>

          {/* PAYMENT SUMMARY */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Payment Summary
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-v-gray">Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-v-gray">Shipping</span>
                <span>৳{order.shipping}</span>
              </div>

              <div className="border-t border-v-border pt-3 flex justify-between font-medium">
                <span>Grand Total</span>
                <span>৳{order.total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Amount Paid</span>
                <span>৳{order.paid.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Amount Due</span>
                <span>৳{order.due.toLocaleString()}</span>
              </div>

            </div>

          </div>

          {/* FULFILLMENT */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Fulfillment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Order Status
                </label>

                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Payment Method
                </label>

                <div className="border border-v-border px-4 py-3 text-sm bg-gray-50">
                  {order.paymentMethod}
                </div>

              </div>

              <div>

                <label className="block text-xs tracking-wider mb-2">
                  Payment Status
                </label>

                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Partial</option>
                  <option>Failed</option>
                  <option>Refunded</option>
                </select>

              </div>

            </div>

            <div className="flex justify-end mt-6 pt-5 border-t border-v-border">

              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-v-black text-white px-6 py-3 text-xs tracking-wider"
              >
                <Save size={15} />
                Update Order
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* CUSTOMER */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Customer
            </h2>

            <p className="text-sm font-medium">
              {order.customer}
            </p>

            <p className="text-sm text-v-gray mt-2">
              {order.phone}
            </p>

            <p className="text-sm text-v-gray mt-1">
              {order.email}
            </p>

          </div>

          {/* ADDRESS */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Shipping Address
            </h2>

            <p className="text-sm">
              {order.city}
            </p>

            <p className="text-sm">
              {order.city}
            </p>

            <p className="text-sm">
              {order.country}
            </p>

          </div>

          {/* INVOICE ACTIONS */}
          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Invoice
            </h2>

            <div className="space-y-2">

              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 border border-v-border px-4 py-3 text-xs tracking-wider hover:bg-gray-100"
              >
                <Printer size={14} />
                Print Invoice
              </button>

              <button
                onClick={() => alert('Invoice generated.')}
                className="w-full flex items-center justify-center gap-2 border border-v-border px-4 py-3 text-xs tracking-wider hover:bg-gray-100"
              >
                <FileText size={14} />
                Generate Invoice
              </button>

              <button
                onClick={() => alert('Invoice email prepared.')}
                className="w-full flex items-center justify-center gap-2 bg-v-black text-white px-4 py-3 text-xs tracking-wider"
              >
                <Mail size={14} />
                Email Invoice
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
