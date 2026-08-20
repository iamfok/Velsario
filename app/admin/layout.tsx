'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Image,
  FileText, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Content', href: '/admin/content', icon: Image },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50 font-body">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-v-black text-white flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && <span className="font-display text-lg tracking-widest">VELSARIO</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors ml-auto">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive ? 'bg-white text-v-black' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-xs tracking-wider uppercase">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <Link href="/" className={`flex items-center gap-3 text-gray-400 hover:text-white transition-colors`}>
            <LogOut size={18} />
            {sidebarOpen && <span className="text-xs tracking-wider uppercase">View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-v-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-v-gray">
            <span>Admin</span>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={12} />
                <span className="text-v-black capitalize">{pathname.split('/').pop()}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-v-black rounded-full flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
            <span className="text-xs text-v-gray hidden md:block">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
