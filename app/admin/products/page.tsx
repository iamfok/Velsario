'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { products } from '@/lib/products'

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">Manage</p>
          <h1 className="text-2xl font-medium">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-v-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-v-border bg-v-light">
              <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Product</th>
              <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium hidden md:table-cell">Category</th>
              <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Price</th>
              <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium hidden md:table-cell">Status</th>
              <th className="text-right px-6 py-3 text-xs tracking-widest uppercase text-v-gray font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-v-border">
            {filtered.map(product => (
              <tr key={product.id} className="hover:bg-v-light transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-v-light flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-v-gray">{product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-xs tracking-wider uppercase text-v-gray">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium">৳{product.price.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 ${product.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/products/${product.id}`}
                      className="p-2 text-v-gray hover:text-v-black transition-colors">
                      <Edit size={14} />
                    </Link>
                    <button className="p-2 text-v-gray hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-v-gray text-sm">No products found</div>
        )}
      </div>
    </div>
  )
}
