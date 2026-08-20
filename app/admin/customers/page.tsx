'use client'

import { useState } from 'react'
import { Search, Eye, Users } from 'lucide-react'

const customers = [
  {
    id: 'CUS-001',
    name: 'iamskkamalh',
    phone: '013229120967',
    email: 'customer@example.com',
    orders: 3,
    spent: 6480,
    status: 'Active',
  },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Sales
        </p>

        <h1 className="text-2xl font-medium">
          Customers
        </h1>

        <p className="text-sm text-v-gray mt-1">
          View and manage your customers.
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
            placeholder="Search by name, phone or email..."
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
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* CUSTOMER */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full">
                        <Users size={17} className="text-gray-500" />
                      </div>

                      <div>

                        <p className="text-sm font-medium">
                          {customer.name}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {customer.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4">

                    <p className="text-sm">
                      {customer.phone}
                    </p>

                    <p className="text-xs text-v-gray mt-1">
                      {customer.email}
                    </p>

                  </td>

                  {/* ORDERS */}
                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {customer.orders}
                    </span>

                  </td>

                  {/* SPENT */}
                  <td className="px-6 py-4">

                    <span className="text-sm font-medium">
                      ৳{customer.spent.toLocaleString()}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span className="inline-flex bg-green-50 text-green-700 px-3 py-1 text-xs">
                      {customer.status}
                    </span>

                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
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

          <div className="text-center py-16">

            <Users
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No customers found.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}
