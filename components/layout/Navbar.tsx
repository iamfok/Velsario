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

type SiteSettings = {
  headerLogoWhite?: string
  headerLogoBlack?: string
  headerLogoEnabled?: boolean
  headerEnabled?: boolean
  headerLogoWhiteWidth?: number
  headerLogoBlackWidth?: number
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [settings, setSettings] = useState<SiteSettings>({})

  const { itemCount } = useCart()

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem('velsario-settings')

        if (saved) {
          setSettings(JSON.parse(saved))
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
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (settings.headerEnabled === false) {
    return null
  }

  const currentLogo = isScrolled
    ? settings.headerLogoBlack
    : settings.headerLogoWhite

  const currentLogoWidth = isScrolled
    ? settings.headerLogoBlackWidth || 150
    : settings.headerLogoWhiteWidth || 150

  const textColor = isScrolled
    ? 'text-v-black'
    : 'text-white'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-v-white border-b border-v-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LEFT — CATALOG ONLY */}
            <div className="hidden md:flex items-center gap-8">

              <div
                className="relative group"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >

                <button
                  className={`nav-link flex items-center gap-1 ${textColor}`}
                >
                  Catalog

                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      catalogOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* EXISTING DYNAMIC MEGA/DROPDOWN STYLE */}
                {catalogOpen && (
                  <div className="absolute top-full left-0 pt-4">

                    <div
                      className="
                        relative
                        overflow-hidden
                        bg-v-white/95
                        backdrop-blur-xl
                        border border-v-border
                        shadow-xl
                        min-w-64
                        py-2
                        animate-[fadeIn_180ms_ease-out]
                      "
                    >

                      {/* Dynamic background structure */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 pointer-events-none" />

                      <div className="relative">

                        {navCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/shop?category=${cat.slug}`}
                            className="
                              group
                              flex items-center justify-between
                              px-6 py-4
                              text-xs
                              tracking-wider
                              uppercase
                              text-v-black
                              hover:bg-v-black
                              hover:text-white
                              transition-all
                              duration-300
                            "
                            onClick={() => setCatalogOpen(false)}
                          >
                            <span>
                              {cat.name}
                            </span>

                            <span className="
                              opacity-0
                              -translate-x-2
                              group-hover:opacity-100
                              group-hover:translate-x-0
                              transition-all
                              duration-300
                            ">
                              →
                            </span>
                          </Link>
                        ))}

                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>


            {/* CENTER — LOGO */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            >

              {settings.headerLogoEnabled !== false &&
              currentLogo ? (

                <img
                  src={currentLogo}
                  alt="Velsario"
                  style={{
                    width: `${currentLogoWidth}px`,
                  }}
                  className="
                    h-auto
                    max-w-[42vw]
                    object-contain
                    transition-all
                    duration-500
                  "
                />

              ) : (

                <span
                  className={`font-display text-xl md:text-2xl font-semibold tracking-widest transition-colors duration-500 ${textColor}`}
                >
                  VELSARIO
                </span>

              )}

            </Link>


            {/* RIGHT — SEARCH + CART */}
            <div className="flex items-center gap-4 md:gap-6 ml-auto">

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`${textColor} hover:opacity-60 transition-colors`}
              >
                <Search size={18} />
              </button>

              <Link
                href="/cart"
                className={`relative ${textColor} hover:opacity-60 transition-colors`}
              >
                <ShoppingBag size={18} />

                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-v-black text-v-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                className={`md:hidden ${textColor}`}
                onClick={() => setMobileOpen(!mobileOpen)}
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


        {/* SEARCH BAR — KEEPING THE EXISTING EXTRA ROW */}
        {searchOpen && (
          <div className="border-t border-v-border bg-v-white shadow-lg">

            <div className="max-w-2xl mx-auto px-4 md:px-8 py-4">

              <div className="flex items-center gap-4">

                <Search
                  size={16}
                  className="text-v-gray flex-shrink-0"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    flex-1
                    bg-transparent
                    border-none
                    outline-none
                    text-sm
                    tracking-wide
                  "
                  autoFocus
                />

                <button
                  onClick={() => setSearchOpen(false)}
                >
                  <X
                    size={16}
                    className="text-v-gray"
                  />
                </button>

              </div>

              {/* Search suggestion area */}
              {searchQuery.trim() && (
                <div className="mt-4 pt-4 border-t border-v-border">

                  <p className="text-[10px] tracking-widest uppercase text-v-gray mb-3">
                    Search suggestions
                  </p>

                  <div className="text-sm text-v-black">
                    {searchQuery}
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </nav>


      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-v-white pt-20 overflow-y-auto">

          <div className="px-8 py-8">

            <div>

              <p className="section-label mb-4">
                Catalog
              </p>

              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-sm
                    tracking-wider
                    uppercase
                    border-b
                    border-v-border
                    text-v-black
                  "
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                  <span>→</span>
                </Link>
              ))}

            </div>

            <div className="flex flex-col gap-4 pt-8">

              <Link
                href="/shop"
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Shop All
              </Link>

              <Link
                href="/about"
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="nav-link"
                onClick={() => setMobileOpen(false)}
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
