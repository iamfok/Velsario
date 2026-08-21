'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { products, categories } from '@/lib/products'

const fallbackCategories = [
  { name: 'Velsario Shirt', slug: 'velsario-shirt' },
  { name: 'Velsario Pants', slug: 'velsario-pants' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Evening Dresses', slug: 'evening-dresses' },
  { name: 'Activewear', slug: 'activewear' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  const { itemCount } = useCart()

  const navCategories = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
      }))
    }

    return fallbackCategories
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const normalizedSearch = searchQuery
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')

  const suggestions = useMemo(() => {
    if (!normalizedSearch) return []

    return products
      .filter((product) => {
        const searchable = [
          product.name,
          product.category,
          product.subcategory,
          ...(product.colors || []),
        ]
          .join(' ')
          .toLowerCase()
          .replace(/\s+/g, '')

        return searchable.includes(normalizedSearch)
      })
      .slice(0, 5)
  }, [normalizedSearch])

  const closeMenus = () => {
    setMobileOpen(false)
    setCatalogOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-v-white/95 text-v-black border-b border-v-border shadow-sm backdrop-blur-md'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-16 md:h-20 flex items-center justify-between">

            {/* LEFT — CATALOG */}
            <div className="flex items-center">

              {/* Desktop */}
              <div
                className="hidden md:block relative"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCatalogOpen((value) => !value)}
                  className={`header-control group flex items-center gap-2 ${
                    isScrolled ? 'header-dark' : 'header-light'
                  }`}
                  aria-expanded={catalogOpen}
                >
                  <span>Catalog</span>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      catalogOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Desktop Mega Menu */}
                <div
                  className={`absolute left-0 top-full pt-4 transition-all duration-300 ${
                    catalogOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="catalog-menu w-[min(92vw,620px)] bg-v-white text-v-black border border-v-border shadow-2xl overflow-hidden">

                    <div className="grid grid-cols-2">

                      <div className="p-6 md:p-8 bg-v-light">
                        <p className="section-label mb-3">
                          Collection
                        </p>

                        <h3 className="font-display text-2xl md:text-3xl leading-tight">
                          Define your
                          <br />
                          <em>presence.</em>
                        </h3>

                        <p className="text-xs text-v-gray leading-relaxed mt-4 max-w-xs">
                          Explore the Velsario collection designed around
                          precision, simplicity and timeless style.
                        </p>
                      </div>

                      <div className="p-5 md:p-7">
                        <p className="text-[10px] tracking-[0.22em] uppercase text-v-gray mb-3">
                          Categories
                        </p>

                        <div className="flex flex-col">
                          {navCategories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/shop?category=${cat.slug}`}
                              onClick={() => setCatalogOpen(false)}
                              className="catalog-link"
                            >
                              <span>{cat.name}</span>
                              <ArrowRight size={14} />
                            </Link>
                          ))}
                        </div>

                        <Link
                          href="/shop"
                          onClick={() => setCatalogOpen(false)}
                          className="mt-5 pt-4 border-t border-v-border flex items-center justify-between text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity"
                        >
                          View All Products
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Catalog button */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(true)
                  setCatalogOpen(true)
                }}
                className={`md:hidden header-control ${
                  isScrolled ? 'header-dark' : 'header-light'
                }`}
              >
                Catalog
              </button>

            </div>

            {/* CENTER — LOGO */}
            <Link
              href="/"
              onClick={closeMenus}
              className={`absolute left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${
                isScrolled ? 'text-v-black' : 'text-white'
              }`}
              aria-label="Velsario Home"
            >
              <span className="font-display text-[clamp(1.25rem,3vw,1.7rem)] font-semibold tracking-[0.18em] whitespace-nowrap">
                VELSARIO
              </span>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSearchOpen((value) => !value)}
                  className={`header-icon ${
                    isScrolled ? 'header-dark' : 'header-light'
                  }`}
                  aria-label="Search"
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? <X size={18} /> : <Search size={18} />}
                </button>

                {/* Search Panel */}
                <div
                  className={`absolute right-0 top-[calc(100%+0.75rem)] w-[calc(100vw-2rem)] sm:w-[380px] md:w-[460px] transition-all duration-300 ${
                    searchOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-v-white text-v-black border border-v-border shadow-2xl">

                    <div className="flex items-center gap-3 px-4 py-4 border-b border-v-border">
                      <Search size={17} className="text-v-gray shrink-0" />

                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                        autoFocus={searchOpen}
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="text-v-gray hover:text-v-black"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>

                    {searchQuery && (
                      <div className="max-h-[360px] overflow-y-auto">

                        {suggestions.length > 0 ? (
                          <div className="p-2">
                            {suggestions.map((product) => (
                              <Link
                                key={product.id}
                                href={`/shop/${product.id}`}
                                onClick={() => {
                                  setSearchOpen(false)
                                  setSearchQuery('')
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-v-light transition-colors"
                              >
                                <div className="w-12 h-14 bg-v-light overflow-hidden shrink-0">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {product.name}
                                  </p>

                                  <p className="text-xs text-v-gray mt-1">
                                    ৳{product.price.toLocaleString()}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="px-5 py-8 text-center">
                            <p className="text-sm font-medium">
                              No products found
                            </p>

                            <p className="text-xs text-v-gray mt-2">
                              Try another product name or category.
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                    {!searchQuery && (
                      <div className="p-5">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-v-gray mb-3">
                          Popular Categories
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {navCategories.slice(0, 5).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/shop?category=${cat.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="px-3 py-2 border border-v-border text-xs hover:bg-v-black hover:text-white transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className={`header-icon relative ${
                  isScrolled ? 'header-dark' : 'header-light'
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={18} />

                {itemCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-[17px] h-[17px] rounded-full flex items-center justify-center text-[9px] font-semibold ${
                      isScrolled
                        ? 'bg-v-black text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={`md:hidden header-icon ${
                  isScrolled ? 'header-dark' : 'header-light'
                }`}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-[110] bg-v-white text-v-black transition-all duration-500 ${
            mobileOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="h-full overflow-y-auto">

            <div className="h-16 flex items-center justify-between px-4 border-b border-v-border">

              <Link
                href="/"
                onClick={closeMenus}
                className="font-display text-xl font-semibold tracking-[0.18em]"
              >
                VELSARIO
              </Link>

              <button
                type="button"
                onClick={closeMenus}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={21} />
              </button>

            </div>

            <div className="px-5 py-7">

              <p className="section-label mb-5">
                Catalog
              </p>

              <div className="border-t border-v-border">

                {navCategories.map((cat, index) => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    onClick={closeMenus}
                    className="mobile-menu-link"
                    style={{
                      transitionDelay: mobileOpen
                        ? `${index * 35}ms`
                        : '0ms',
                    }}
                  >
                    <span>{cat.name}</span>
                    <ArrowRight size={15} />
                  </Link>
                ))}

              </div>

              <div className="mt-8 pt-7 border-t border-v-border flex flex-col">

                <Link
                  href="/shop"
                  onClick={closeMenus}
                  className="mobile-main-link"
                >
                  Shop All
                </Link>

                <Link
                  href="/about"
                  onClick={closeMenus}
                  className="mobile-main-link"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMenus}
                  className="mobile-main-link"
                >
                  Contact
                </Link>

              </div>

              <div className="mt-10 p-5 bg-v-light">
                <p className="section-label mb-2">
                  Velsario
                </p>

                <p className="font-display text-2xl leading-tight">
                  Minimal colors.
                  <br />
                  <em>Maximum impact.</em>
                </p>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
