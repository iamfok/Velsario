'use client'

import { useEffect, useState } from 'react'
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  ArrowUpRight,
  Plus,
  Eye
} from 'lucide-react'
import Link from 'next/link'

const SHEET_API =
  'https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    totalSales: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${SHEET_API}?action=dailyStats`)
      .then((r) => r.json())
      .then((data) => {
        setStats({
          orders: Number(data.orders || 0),
          totalSales: Number(data.totalSales || 0),
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    {
      label: "Today's Orders",
      value: loading ? '...' : stats.orders,
      icon: ShoppingCart,
      href: '/admin/orders',
    },
    {
      label: "Today's Revenue",
      value: loading
        ? '...'
        : `৳${stats.totalSales.toLocaleString()}`,
      icon: TrendingUp,
      href: '/admin/orders',
    },
    {
      label: 'Total Products',
      value: '3',
      icon: Package,
      href: '/admin/products',
    },
    {
      label: 'Customers',
      value: '1',
      icon: Users,
      href: '/admin/customers',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Overview
          </p>

          <h1 className="text-2xl font-medium">
            Dashboard
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Welcome back. Here's what's happening with Velsario.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Product
        </Link>

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {cards.map((card) => {
          const Icon = card.icon

          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white border border-v-border p-5 hover:shadow-md transition-shadow"
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
                {card.value}
              </p>

              <p className="text-xs text-v-gray tracking-wider">
                {card.label}
              </p>

            </Link>
          )
        })}

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* QUICK ACTIONS */}
        <div className="bg-white border border-v-border p-6">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xs tracking-widest uppercase font-medium">
              Quick Actions
            </h2>

          </div>

          <div className="flex flex-col">

            {[
              {
                label: 'Add New Product',
                href: '/admin/products/new',
              },
              {
                label: 'Manage Orders',
                href: '/admin/orders',
              },
              {
                label: 'Manage Customers',
                href: '/admin/customers',
              },
              {
                label: 'Manage Content',
                href: '/admin/content',
              },
              {
                label: 'View Live Store',
                href: '/',
              },
            ].map((action) => (

              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between py-4 border-b border-v-border last:border-0 text-sm hover:text-v-gray transition-colors"
              >

                <span>
                  {action.label}
                </span>

                <ArrowUpRight
                  size={15}
                  className="text-v-gray"
                />

              </Link>

            ))}

          </div>

        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-v-black text-white p-6">

          <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-gray-400">
            System Status
          </h2>

          <div className="flex flex-col">

            {[
              'Website',
              'Order System',
              'Product System',
              'Admin Panel',
            ].map((item) => (

              <div
                key={item}
                className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0"
              >

                <span className="text-sm text-gray-300">
                  {item}
                </span>

                <span className="flex items-center gap-2 text-xs text-green-400">

                  <span className="w-2 h-2 bg-green-400 rounded-full" />

                  Active

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}
