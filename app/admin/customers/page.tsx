'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  Eye,
  Mail,
  Phone,
} from 'lucide-react'
import Link from 'next/link'

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'Active' | 'Inactive'
}

const defaultCustomers: Customer[] = []

export default function CustomersPage() {

  const [customers, setCustomers] =
    useState<Customer[]>([])

  const [search, setSearch] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          'velsario-customers'
        )

      if (saved) {
        setCustomers(
          JSON.parse(saved)
        )
      } else {
        setCustomers(defaultCustomers)
      }

    } catch {
      setCustomers([])
    }

    setLoading(false)

  }, [])

  const filtered =
    customers.filter(customer =>
      `${customer.name} ${customer.email} ${customer.phone} ${customer.id}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <div className="max-w-7xl mx-auto">

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
            onChange={e =>
              setSearch(e.target.value)
            }
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>


      {/* TABLE */}

      <div className="bg-white border border-v-border overflow-hidden">

        {loading ? (

          <div className="text-center py-20">

            <p className="text-sm text-v-gray">
              Loading customers...
            </p>

          </div>

        ) : filtered.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

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

                {filtered.map(customer => (

                  <tr
                    key={customer.id}
                    className="hover:bg-v-light transition-colors"
                  >

                    {/* CUSTOMER */}

                    <td className="px-6 py-4">

                      <p className="text-sm font-medium">
                        {customer.name}
                      </p>

                      <p className="text-xs text-v-gray mt-1">
                        {customer.id}
                      </p>

                    </td>


                    {/* CONTACT */}

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


                    {/* ORDERS */}

                    <td className="px-6 py-4 text-sm">
                      {customer.orders}
                    </td>


                    {/* SPENT */}

                    <td className="px-6 py-4 text-sm font-medium">
                      ৳{customer.spent.toLocaleString()}
                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`text-xs px-2 py-1 ${
                          customer.status === 'Active'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {customer.status}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="p-2 text-v-gray hover:text-v-black hover:bg-gray-100"
                          title="View customer"
                        >
                          <Eye size={15} />
                        </Link>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          /* EMPTY */

          <div className="text-center py-20 px-6">

            <div className="w-14 h-14 bg-gray-50 mx-auto flex items-center justify-center mb-5">

              <Search
                size={22}
                className="text-gray-400"
              />

            </div>

            <h2 className="text-lg font-medium">
              {search
                ? 'No customers found'
                : 'No customers yet'}
            </h2>

            <p className="text-sm text-v-gray mt-2 max-w-md mx-auto">

              {search
                ? 'Try searching with a different name, email or phone number.'
                : 'Customers created through your Velsario store will appear here.'}

            </p>

          </div>

        )}

      </div>


      {/* TOTAL */}

      {!loading && customers.length > 0 && (

        <div className="mt-4 text-xs text-v-gray">

          Showing {filtered.length} of{' '}
          {customers.length} customers

        </div>

      )}

    </div>

  )
}
