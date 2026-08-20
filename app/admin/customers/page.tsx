'use client'

import { useState } from 'react'
import { Search, Eye, Mail, Phone } from 'lucide-react'

const initialCustomers = [
  {
    id: 'CUS-001',
    name: 'No customers yet',
    email: '—',
    phone: '—',
    orders: 0,
    spent: 0,
    status: 'Active',
  },
]

export default function CustomersPage() {
  const [customers] = useState(initialCustomers)
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Management
        </p>

        <h1 className="text-2xl font-medium">
          Customers
        </h1>

        <p className="text-sm text-v-gray mt-1">
          View and manage your store customers.
        </p>

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
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Orders
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Total Spent
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

              {filtered.map((customer) => (

                <tr
                  key={customer.id}
                  className="hover:bg-v-light transition-colors"
                >

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium">
                      {customer.name}
                    </p>

                    <p className="text-xs text-v-gray mt-1">
                      {customer.id}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <div className="space-y-1">

                      <p className="text-xs flex items-center gap-2">
                        <Mail size={12} />
                        {customer.email}
                      </p>

                      <p className="text-xs flex items-center gap-2">
                        <Phone size={12} />
                        {customer.phone}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm">
                    {customer.orders}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    ৳{customer.spent.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    <span className="text-xs px-2 py-1 bg-green-50 text-green-600">
                      {customer.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-end">

                      <button
                        className="p-2 text-v-gray hover:text-v-black"
                        title="View customer"
                      >
                        <Eye size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-v-gray">
            No customers found.
          </div>
        )}

      </div>

    </div>
  )
}
