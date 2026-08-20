'use client'

import { Suspense, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '@/lib/products'

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedColor, setSelectedColor] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortBy, setSortBy] = useState('default')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory || `velsario-${p.category}` === selectedCategory || p.subcategory === selectedCategory)
    if (selectedColor) result = result.filter(p => p.colors.includes(selectedColor))
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    return result
  }, [selectedCategory, selectedColor, priceRange, sortBy])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedColor('')
    setPriceRange([0, 10000])
    setSortBy('default')
  }

  return (
    <div className="pt-20 min-h-screen">

      {/* Header */}
      <div className="border-b border-v-border px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">Our Collection</p>
          <div className="flex items-end justify-between">
            <h1 className="font-display text-3xl md:text-4xl">
              {selectedCategory
                ? categories.find(c => c.slug === selectedCategory)?.name || 'Shop'
                : 'Shop All'}
            </h1>
            <p className="text-sm text-v-gray">{filtered.length} products</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar Filter — Desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-28">

              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase mb-4 font-medium">Category</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`text-left text-sm py-1 transition-colors ${!selectedCategory ? 'font-medium' : 'text-v-gray hover:text-v-black'}`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-left text-sm py-1 transition-colors ${selectedCategory === cat.slug ? 'font-medium' : 'text-v-gray hover:text-v-black'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase mb-4 font-medium">Color</p>
                <div className="flex flex-col gap-2">
                  {['', 'Black', 'White'].map(color => (
                    <button
                      key={color || 'all'}
                      onClick={() => setSelectedColor(color)}
                      className={`text-left text-sm py-1 transition-colors ${selectedColor === color ? 'font-medium' : 'text-v-gray hover:text-v-black'}`}
                    >
                      {color || 'All Colors'}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedCategory || selectedColor) && (
                <button onClick={clearFilters} className="flex items-center gap-2 text-xs text-v-gray hover:text-v-black transition-colors">
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">

            {/* Sort & Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <button
                className="md:hidden flex items-center gap-2 text-xs tracking-wider uppercase"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <SlidersHorizontal size={14} /> Filter
              </button>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs text-v-gray">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-xs border border-v-border px-3 py-2 focus:outline-none bg-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                  className={`text-xs px-4 py-2 tracking-wider uppercase transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-v-black text-v-white'
                      : 'border border-v-border hover:border-v-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-v-gray mb-4">No products found</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map(product => (
                  <Link key={product.id} href={`/shop/${product.id}`} className="product-card">
                    <div className="aspect-[3/4] bg-v-light overflow-hidden relative mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-image w-full h-full object-cover"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-v-black text-v-white text-xs px-2 py-1 tracking-wider uppercase">
                          {product.badge}
                        </span>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
                          <span className="text-xs tracking-widest uppercase">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-v-gray tracking-wider uppercase mb-1">
                      {product.subcategory.replace('-', ' ')}
                    </p>
                    <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">৳{product.price.toLocaleString()}</p>
                      <div className="flex gap-1">
                        {product.colors.map(c => (
                          <span key={c} className={`w-3 h-3 rounded-full border ${c === 'Black' ? 'bg-black' : 'bg-white border-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ShopLoading() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <p className="text-sm text-v-gray">
        Loading collection...
      </p>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  )
}
