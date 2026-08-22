'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  ShieldCheck,
  Ticket,
  Star,
  Warehouse,
  Image,
  BarChart3,
  Settings,
  Menu,
  X,
  FileText,
  Home,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },

  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Brands', href: '/admin/brands', icon: Tags },

  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Users & Access', href: '/admin/users', icon: ShieldCheck },
  { label: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Inventory', href: '/admin/inventory', icon: Warehouse },

  {
    label: 'Homepage',
    href: '/admin/homepage-categories',
    icon: Home,
  },

  { label: 'Banners', href: '/admin/banners', icon: Image },
  { label: 'Media Library', href: '/admin/media', icon: Image },
  { label: 'Pages', href: '/admin/pages', icon: FileText },

  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50 font-body">

      <aside
        className={`${
          sidebarOpen ? 'w-60' : 'w-16'
        } bg-v-black text-white flex flex-col transition-all duration-300 flex-shrink-0`}
      >

        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {sidebarOpen && (
            <span className="font-display text-lg tracking-widest">
              VELSARIO
            </span>
          )}

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white ml-auto"
          >
            {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">

          {navItems.map((item) => {
            const Icon = item.icon

            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' &&
                pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-white text-v-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />

                {sidebarOpen && (
                  <span className="text-xs tracking-wider">
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}

        </nav>

        <div className="border-t border-gray-800 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-400 hover:text-white"
          >
            <Package size={18} />

            {sidebarOpen && (
              <span className="text-xs tracking-wider">
                View Store
              </span>
            )}
          </Link>
        </div>

      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

          <div className="text-xs text-gray-500">
            Admin Panel
          </div>

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 bg-v-black rounded-full flex items-center justify-center text-white text-xs">
              A
            </div>

            <span className="text-xs text-gray-600 hidden md:block">
              Admin
            </span>

          </div>

        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      </div>

    </div>
  )
}
