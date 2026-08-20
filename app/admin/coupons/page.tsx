'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Ticket, X } from 'lucide-react'

const initialCoupons = [
  {
    id: 'CPN-001',
    code: 'WELCOME10',
    type: 'Percentage',
    value: 10,
    usage: 0,
    limit: 100,
    status: 'Active',
  },
]

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const [showForm, setShowForm] = useState(false)

  const [code, setCode] = useState('')
  const [type, setType] = useState('Percentage')
  const [value, setValue] = useState('')
  const [limit, setLimit] = useState('')

  const addCoupon = () => {
    if (!code.trim() || !value) return

    const newCoupon = {
      id: `CPN-${String(coupons.length + 1).padStart(3, '0')}`,
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      usage: 0,
      limit: Number(limit || 0),
      status: 'Active',
    }

    setCoupons([...coupons, newCoupon])

    setCode('')
    setType('Percentage')
    setValue('')
    setLimit('')
    setShowForm(false)
  }

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Marketing
          </p>

          <h1 className="text-2xl font-medium">
            Coupons
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Create and manage discount coupons.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Create Coupon
        </button>

      </div>

      {/* ADD COUPON */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <div className="flex items-center justify-between mb-5">

            <p className="text-xs tracking-widest uppercase font-medium">
              New Coupon
            </p>

            <button
              onClick={() => setShowForm(false)}
              className="p-1 text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Coupon code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black uppercase"
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
              placeholder={type === 'Percentage' ? 'Discount %' : 'Amount (BDT)'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <input
              type="number"
              placeholder="Usage limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addCoupon}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Save Coupon
            </button>

          </div>

        </div>
      )}

      {/* COUPONS TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

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
                  className="hover:bg-gray-50 transition-colors"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
                        <Ticket size={16} className="text-gray-500" />
                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {coupon.code}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {coupon.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-sm">

                      {coupon.type === 'Percentage'
                        ? `${coupon.value}%`
                        : `৳${coupon.value.toLocaleString()}`}

                    </span>

                    <p className="text-xs text-v-gray mt-1">
                      {coupon.type}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {coupon.usage}
                      {coupon.limit > 0 && ` / ${coupon.limit}`}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="inline-flex bg-green-50 text-green-700 px-3 py-1 text-xs">
                      {coupon.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit coupon"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
                        title="Delete coupon"
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

        {coupons.length === 0 && (
          <div className="text-center py-16">

            <Ticket
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No coupons created yet.
            </p>

          </div>
        )}

      </div>

    </div>
  )
}
