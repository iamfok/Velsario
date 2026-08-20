'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Ticket } from 'lucide-react'

const initialCoupons = [
  {
    id: 1,
    code: 'WELCOME10',
    discount: 10,
    type: 'Percentage',
    usage: 0,
    limit: 100,
    status: 'Active',
  },
]

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const [showForm, setShowForm] = useState(false)

  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState('')
  const [type, setType] = useState('Percentage')
  const [limit, setLimit] = useState('100')

  const addCoupon = () => {
    if (!code.trim() || !discount) return

    setCoupons([
      ...coupons,
      {
        id: Date.now(),
        code: code.trim().toUpperCase(),
        discount: Number(discount),
        type,
        usage: 0,
        limit: Number(limit) || 0,
        status: 'Active',
      },
    ])

    setCode('')
    setDiscount('')
    setType('Percentage')
    setLimit('100')
    setShowForm(false)
  }

  const deleteCoupon = (id: number) => {
    if (!confirm('Delete this coupon?')) return

    setCoupons(coupons.filter((coupon) => coupon.id !== id))
  }

  const toggleStatus = (id: number) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status:
                coupon.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : coupon
      )
    )
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Marketing
          </p>

          <h1 className="text-2xl font-medium">
            Coupons
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Create and manage promotional discount codes.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Add Coupon
        </button>

      </div>

      {/* ADD COUPON */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase font-medium mb-5">
            New Coupon
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code"
              className="border border-v-border px-4 py-3 text-sm uppercase outline-none focus:border-black"
            />

            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >
              <option>Percentage</option>
              <option>Fixed Amount</option>
            </select>

            <input
              type="number"
              min="0"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="Usage limit"
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addCoupon}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Create Coupon
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Coupon
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Discount
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Usage
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {coupons.map((coupon) => (

                <tr
                  key={coupon.id}
                  className="hover:bg-v-light transition-colors"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
                        <Ticket size={15} />
                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {coupon.code}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {coupon.type}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm font-medium">

                    {coupon.type === 'Percentage'
                      ? `${coupon.discount}%`
                      : `৳${coupon.discount.toLocaleString()}`}

                  </td>

                  <td className="px-6 py-4 text-sm">
                    {coupon.usage} / {coupon.limit || '∞'}
                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() => toggleStatus(coupon.id)}
                      className={`text-xs px-2 py-1 ${
                        coupon.status === 'Active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {coupon.status}
                    </button>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button className="p-2 text-v-gray hover:text-v-black">
                        <Edit size={14} />
                      </button>

                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-2 text-v-gray hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {coupons.length === 0 && (
          <div className="text-center py-16 text-sm text-v-gray">
            No coupons available.
          </div>
        )}

      </div>

    </div>
  )
}
