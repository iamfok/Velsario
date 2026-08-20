'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Package, MessageSquare, TrendingUp, ArrowUpRight, Eye } from 'lucide-react'
import Link from 'next/link'

const SHEET_API = 'https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, totalSales: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${SHEET_API}?action=dailyStats`)
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: "Today's Orders", value: loading ? '...' : stats.orders, icon: ShoppingCart, href: '/admin/orders', color: 'bg-blue-50 text-blue-600' },
    { label: "Today's Revenue", value: loading ? '...' : `৳${stats.totalSales?.toLocaleString()}`, icon: TrendingUp, href: '/admin/orders', color: 'bg-green-50 text-green-600' },
    { label: 'Total Products', value: '3', icon: Package, href: '/admin/products', color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Content', value: '—', icon: Eye, href: '/admin/content', color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">Overview</p>
        <h1 className="text-2xl font-medium">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Link key={card.label} href={card.href}
            className="bg-white border border-v-border p-5 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon size={18} />
              </div>
              <ArrowUpRight size={14} className="text-v-gray group-hover:text-v-black transition-colors" />
            </div>
            <p className="text-2xl font-semibold mb-1">{card.value}</p>
            <p className="text-xs text-v-gray tracking-wider">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-v-border p-6">
          <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add New Product', href: '/admin/products/new' },
              { label: 'View All Orders', href: '/admin/orders' },
              { label: 'Approve Content', href: '/admin/content' },
              { label: 'View Live Site', href: '/' },
            ].map(action => (
              <Link key={action.label} href={action.href}
                className="flex items-center justify-between py-2 border-b border-v-border last:border-0 text-sm hover:text-v-gray transition-colors">
                {action.label}
                <ArrowUpRight size={14} className="text-v-gray" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-v-black text-white p-6">
          <h2 className="text-xs tracking-widest uppercase font-medium mb-4 text-gray-400">System Status</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Messenger Bot', status: 'Active' },
              { label: 'Auto Posting', status: 'Active' },
              { label: 'Daily Report', status: 'Active' },
              { label: 'Job Search', status: 'Active' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="flex items-center gap-2 text-xs text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
