'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Eye,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'Active' | 'Inactive'
  address?: string
  city?: string
  country?: string
}

type Order = {
  id: string
  date: string
  customer: string
  product: string
  amount: number
  status: string
  paymentStatus: string
}

export default function CustomerDetailsPage({
  params,
}: {
  params: { id: string }
}) {

  const [customer, setCustomer] =
    useState<Customer | null>(null)

  const [orders, setOrders] =
    useState<Order[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    try {

      const savedCustomers =
        localStorage.getItem(
          'velsario-customers'
        )

      if (savedCustomers) {

        const customers: Customer[] =
          JSON.parse(savedCustomers)

        const found =
          customers.find(
            item => item.id === params.id
          )

        if (found) {
          setCustomer(found)
        }

      }

      const savedOrders =
        localStorage.getItem(
          'velsario-orders'
        )

      if (savedOrders) {

        const allOrders: Order[] =
          JSON.parse(savedOrders)

        setOrders(
          allOrders.filter(
            order =>
              order.customer ===
              (
                savedCustomers
                  ? JSON.parse(savedCustomers)
                      .find(
                        (item: Customer) =>
                          item.id === params.id
                      )?.name
                  : ''
              )
          )
        )

      }

    } catch {

      setCustomer(null)
      setOrders([])

    } finally {

      setLoading(false)

    }

  }, [params.id])


  if (loading) {

    return (

      <div className="max-w-6xl mx-auto">

        <div className="bg-white border border-v-border text-center py-20">

          <p className="text-sm text-v-gray">
            Loading customer...
          </p>

        </div>

      </div>

    )

  }


  if (!customer) {

    return (

      <div className="max-w-6xl mx-auto">

        <div className="bg-white border border-v-border text-center py-20 px-6">

          <h2 className="text-lg font-medium">
            Customer not found
          </h2>

          <p className="text-sm text-v-gray mt-2">
            This customer does not exist.
          </p>

          <Link
            href="/admin/customers"
            className="inline-flex mt-6 bg-v-black text-white px-5 py-3 text-xs tracking-wider"
          >
            Back to Customers
          </Link>

        </div>

      </div>

    )

  }


  return (

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <Link
          href="/admin/customers"
          className="p-2 border border-v-border hover:bg-gray-100"
        >
          <ArrowLeft size={17} />
        </Link>

        <div>

          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Customers
          </p>

          <h1 className="text-2xl font-medium">
            {customer.name}
          </h1>

          <p className="text-xs text-v-gray mt-1">
            {customer.id}
          </p>

        </div>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* LEFT */}

        <div className="lg:col-span-2 space-y-6">


          {/* CUSTOMER INFORMATION */}

          <div className="bg-white border border-v-border p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xs tracking-widest uppercase font-medium">
                Customer Information
              </h2>

              <span
                className={`text-xs px-3 py-1 ${
                  customer.status === 'Active'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {customer.status}
              </span>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}

              <div>

                <p className="text-xs text-v-gray mb-2">
                  Name
                </p>

                <p className="text-sm font-medium">
                  {customer.name}
                </p>

              </div>


              {/* EMAIL */}

              <div>

                <p className="text-xs text-v-gray mb-2">
                  Email
                </p>

                <div className="flex items-center gap-2 text-sm">

                  <Mail size={14} />

                  {customer.email}

                </div>

              </div>


              {/* PHONE */}

              <div>

                <p className="text-xs text-v-gray mb-2">
                  Phone
                </p>

                <div className="flex items-center gap-2 text-sm">

                  <Phone size={14} />

                  {customer.phone}

                </div>

              </div>


              {/* CUSTOMER ID */}

              <div>

                <p className="text-xs text-v-gray mb-2">
                  Customer ID
                </p>

                <p className="text-sm">
                  {customer.id}
                </p>

              </div>

            </div>

          </div>


          {/* ADDRESS */}

          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Address
            </h2>

            <div className="flex items-start gap-3">

              <MapPin
                size={16}
                className="text-v-gray mt-0.5"
              />

              <div>

                {customer.address && (
                  <p className="text-sm">
                    {customer.address}
                  </p>
                )}

                {customer.city && (
                  <p className="text-sm">
                    {customer.city}
                  </p>
                )}

                {customer.country && (
                  <p className="text-sm">
                    {customer.country}
                  </p>
                )}

                {!customer.address &&
                  !customer.city &&
                  !customer.country && (

                    <p className="text-sm text-v-gray">
                      No address available
                    </p>

                  )}

              </div>

            </div>

          </div>


          {/* ORDER HISTORY */}

          <div className="bg-white border border-v-border overflow-hidden">

            <div className="p-6 border-b border-v-border">

              <h2 className="text-xs tracking-widest uppercase font-medium">
                Order History
              </h2>

            </div>


            {orders.length > 0 ? (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead>

                    <tr className="bg-v-light border-b border-v-border">

                      <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                        Order
                      </th>

                      <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                        Date
                      </th>

                      <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                        Product
                      </th>

                      <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                        Amount
                      </th>

                      <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-v-border">

                    {orders.map(order => (

                      <tr
                        key={order.id}
                        className="hover:bg-v-light"
                      >

                        <td className="px-6 py-4">

                          <p className="text-sm font-medium">
                            {order.id}
                          </p>

                        </td>


                        <td className="px-6 py-4">

                          <span className="text-xs text-v-gray">
                            {order.date}
                          </span>

                        </td>


                        <td className="px-6 py-4">

                          <span className="text-sm">
                            {order.product}
                          </span>

                        </td>


                        <td className="px-6 py-4">

                          <span className="text-sm font-medium">
                            ৳{order.amount.toLocaleString()}
                          </span>

                        </td>


                        <td className="px-6 py-4">

                          <div className="flex justify-end">

                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="p-2 text-v-gray hover:text-v-black hover:bg-gray-100"
                              title="View order"
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

              <div className="text-center py-14 px-6">

                <ShoppingBag
                  size={25}
                  className="mx-auto mb-3 text-gray-400"
                />

                <p className="text-sm text-v-gray">
                  No orders found for this customer.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* RIGHT */}

        <div className="space-y-6">


          {/* STATS */}

          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-6">
              Customer Overview
            </h2>

            <div className="space-y-5">

              <div>

                <p className="text-xs text-v-gray mb-1">
                  Total Orders
                </p>

                <p className="text-2xl font-medium">
                  {customer.orders}
                </p>

              </div>

              <div className="border-t border-v-border pt-5">

                <p className="text-xs text-v-gray mb-1">
                  Total Spent
                </p>

                <p className="text-2xl font-medium">
                  ৳{customer.spent.toLocaleString()}
                </p>

              </div>

            </div>

          </div>


          {/* CONTACT */}

          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">
              Contact
            </h2>

            <div className="space-y-3">

              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-3 text-sm text-v-gray hover:text-v-black"
              >
                <Mail size={15} />
                Email Customer
              </a>

              <a
                href={`tel:${customer.phone}`}
                className="flex items-center gap-3 text-sm text-v-gray hover:text-v-black"
              >
                <Phone size={15} />
                Call Customer
              </a>

            </div>

          </div>


          {/* STATUS */}

          <div className="bg-white border border-v-border p-6">

            <h2 className="text-xs tracking-widest uppercase font-medium mb-4">
              Customer Status
            </h2>

            <span
              className={`inline-flex text-xs px-3 py-1 ${
                customer.status === 'Active'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {customer.status}
            </span>

          </div>

        </div>

      </div>

    </div>

  )
}
