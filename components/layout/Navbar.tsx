'use client'

import Link from 'next/link'
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useEffect, useState } from 'react'

const navCategories = [
  { name: 'Velsario Shirt', slug: 'velsario-shirt' },
  { name: 'Velsario Pants', slug: 'velsario-pants' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Evening Dresses', slug: 'evening-dresses' },
  { name: 'Activewear', slug: 'activewear' },
]

type Settings = {
  headerLogoWhite?: string
  headerLogoBlack?: string
  headerLogoEnabled?: boolean
  headerEnabled?: boolean
  headerLogoWhiteWidth?: number
  headerLogoBlackWidth?: number
}

const defaultSettings: Settings = {
  headerLogoWhite: '',
  headerLogoBlack: '',
  headerLogoEnabled: true,
  headerEnabled: true,
  headerLogoWhiteWidth: 150,
  headerLogoBlackWidth: 150,
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] =
    useState(false)

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [catalogOpen, setCatalogOpen] =
    useState(false)

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [searchQuery, setSearchQuery] =
    useState('')

  const [settings, setSettings] =
    useState<Settings>(defaultSettings)

  const { itemCount } = useCart()

  useEffect(() => {

    const loadSettings = () => {
      try {
        const saved =
          localStorage.getItem(
            'velsario-settings'
          )

        if (saved) {
          setSettings({
            ...defaultSettings,
            ...JSON.parse(saved),
          })
        }
      } catch {}
    }

    loadSettings()

    window.addEventListener(
      'velsario-settings-updated',
      loadSettings
    )

    return () => {
      window.removeEventListener(
        'velsario-settings-updated',
        loadSettings
      )
    }
  }, [])

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 20
      )
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    handleScroll()

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  if (settings.headerEnabled === false) {
    return null
  }

  const logo =
    isScrolled
      ? settings.headerLogoBlack
      : settings.headerLogoWhite

  const logoWidth =
    isScrolled
      ? settings.headerLogoBlackWidth || 150
      : settings.headerLogoWhiteWidth || 150

  const textColor =
    isScrolled
      ? 'text-v-black'
      : 'text-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-v-border shadow-sm'
            : 'bg-transparent'
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="relative flex items-center justify-between h-16 md:h-20">

            {/* LEFT */}

            <div className="hidden md:flex items-center">

              <div
                className="relative"
                onMouseEnter={() =>
                  setCatalogOpen(true)
                }
                onMouseLeave={() =>
                  setCatalogOpen(false)
                }
              >

                <button
                  className={`flex items-center gap-1 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${textColor}`}
                >
                  Catalog

                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      catalogOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>


                {/* DROPDOWN */}

                <div
                  className={`absolute top-full left-0 pt-5 transition-all duration-300 ${
                    catalogOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >

                  <div className="relative overflow-hidden min-w-[250px] bg-white/95 backdrop-blur-xl border border-v-border shadow-xl">

                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gray-50 via-white to-gray-100" />

                    <div className="relative py-3">

                      {navCategories.map(
                        (cat, index) => (

                          <Link
                            key={cat.slug}
                            href={`/shop?category=${cat.slug}`}
                            className="group flex items-center justify-between px-6 py-4 text-xs tracking-wider uppercase text-v-black hover:bg-black hover:text-white transition-all duration-300"
                            onClick={() =>
                              setCatalogOpen(false)
                            }
                          >

                            <span>
                              {cat.name}
                            </span>

                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              →
                            </span>

                          </Link>

                        )
                      )}

                    </div>
                  </div>
                </div>

              </div>

            </div>


            {/* LOGO */}

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            >

              {settings.headerLogoEnabled !== false &&
              logo ? (

                <img
                  src={logo}
                  alt="Velsario"
                  style={{
                    width: `${Math.min(
                      logoWidth,
                      220
                    )}px`,
                  }}
                  className="h-auto max-w-[42vw] object-contain transition-all duration-500"
                />

              ) : (

                <span
                  className={`font-display text-xl md:text-2xl font-semibold tracking-widest transition-colors duration-500 ${textColor}`}
                >
                  VELSARIO
                </span>

              )}

            </Link>


            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-4 md:gap-6">

              <button
                onClick={() =>
                  setSearchOpen(!searchOpen)
                }
                className={`${textColor} hover:opacity-60 transition-opacity`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/cart"
                className={`${textColor} hover:opacity-60 transition-opacity relative`}
                aria-label="Shopping cart"
              >

                <ShoppingBag size={18} />

                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-v-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}

              </Link>

              <button
                className={`md:hidden ${textColor}`}
                onClick={() =>
                  setMobileOpen(!mobileOpen)
                }
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>

            </div>

          </div>

        </div>


        {/* SEARCH */}

        {searchOpen && (

          <div className="border-t border-v-border bg-white shadow-lg">

            <div className="max-w-3xl mx-auto px-4 md:px-8 py-5">

              <div className="flex items-center gap-4">

                <Search
                  size={17}
                  className="text-v-gray flex-shrink-0"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />

                <button
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="text-v-gray hover:text-black"
                >
                  <X size={16} />
                </button>

              </div>

              {searchQuery.trim() && (
                <div className="mt-4 border-t border-v-border pt-4 text-xs text-v-gray">
                  Searching for:
                  <span className="text-black ml-2">
                    {searchQuery}
                  </span>
                </div>
              )}

            </div>

          </div>

        )}

      </nav>


      {/* MOBILE MENU */}

      {mobileOpen && (

        <div className="fixed inset-0 z-40 bg-white pt-20 overflow-y-auto">

          <div className="px-6 py-8">

            <p className="section-label mb-4">
              Catalog
            </p>

            <div className="border-t border-v-border">

              {navCategories.map(
                cat => (

                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="flex items-center justify-between py-4 text-sm tracking-wider uppercase border-b border-v-border"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    {cat.name}
                    <span>→</span>
                  </Link>

                )
              )}

            </div>

            <div className="flex flex-col gap-5 pt-8">

              <Link
                href="/shop"
                className="nav-link"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Shop All
              </Link>

              <Link
                href="/about"
                className="nav-link"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                About
              </Link>

              <Link
                href="/contact"
                className="nav-link"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

      )}

    </>
  )
}
