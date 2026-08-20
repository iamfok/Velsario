'use client'

import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Revenue',
    value: '৳0',
    change: '—',
    icon: TrendingUp,
  },
  {
    label: 'Total Orders',
    value: '0',
    change: '—',
    icon: ShoppingCart,
  },
  {
    label: 'Customers',
    value: '0',
    change: '—',
    icon: Users,
  },
  {
    label: 'Products Sold',
    value: '0',
    change: '—',
    icon: Package,
  },
]

const topProducts = [
  {
    name: 'No sales data yet',
    sales: 0,
    revenue: 0,
  },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Insights
        </p>

        <h1 className="text-2xl font-medium">
          Analytics
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Monitor your store performance and sales.
        </p>

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="bg-white border border-v-border p-5"
            >

              <div className="flex items-center justify-between mb-5">

                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                  <Icon size={18} />
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-v-gray"
                />

              </div>

              <p className="text-2xl font-semibold mb-1">
                {stat.value}
              </p>

              <p className="text-xs text-v-gray tracking-wider">
                {stat.label}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {stat.change}
              </p>

            </div>
          )
        })}

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-white border border-v-border p-6 mb-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-sm font-medium">
              Sales Overview
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Revenue performance over time
            </p>

          </div>

          <select className="border border-v-border px-3 py-2 text-xs outline-none bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>

        </div>

        <div className="h-64 border border-dashed border-gray-200 flex items-center justify-center">

          <div className="text-center">

            <TrendingUp
              size={28}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="text-sm text-gray-400">
              Sales data will appear here
            </p>

            <p className="text-xs text-gray-300 mt-1">
              Analytics will be connected to the database later.
            </p>

          </div>

        </div>

      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white border border-v-border">

        <div className="px-6 py-5 border-b border-v-border">

          <h2 className="text-sm font-medium">
            Top Products
          </h2>

          <p className="text-xs text-v-gray mt-1">
            Best performing products
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Units Sold
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Revenue
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {topProducts.map((product) => (

                <tr key={product.name}>

                  <td className="px-6 py-4 text-sm">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-v-gray">
                    {product.sales}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-medium">
                    ৳{product.revenue.toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
