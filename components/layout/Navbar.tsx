'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const navCategories = [
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

  const [headerLogo, setHeaderLogo] = useState('')
  const [headerLogoEnabled, setHeaderLogoEnabled] = useState(true)
  const [headerEnabled, setHeaderEnabled] = useState(true)
  const [announcementEnabled, setAnnouncementEnabled] = useState(false)
  const [announcementText, setAnnouncementText] = useState('')

  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > 20)

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  /* Load settings */
  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved =
          localStorage.getItem(
            'velsario-settings'
          )

        if (!saved) return

        const settings = JSON.parse(saved)

        setHeaderLogo(
          settings.headerLogo || ''
        )

        setHeaderLogoEnabled(
          settings.headerLogoEnabled !== false
        )

        setHeaderEnabled(
          settings.headerEnabled !== false
        )

        setAnnouncementEnabled(
          settings.announcementEnabled === true
        )

        setAnnouncementText(
          settings.announcementText || ''
        )
      } catch {
        // Keep default values
      }
    }

    loadSettings()

    /*
     * Update immediately when Settings
     * are changed in another tab.
     */
    window.addEventListener(
      'storage',
      loadSettings
    )

    return () =>
      window.removeEventListener(
        'storage',
        loadSettings
      )
  }, [])

  if (!headerEnabled) {
    return null
  }

  return (
    <>
      {/* ANNOUNCEMENT BAR */}

      {announcementEnabled &&
        announcementText && (
          <div className="fixed top-0 left-0 right-0 z-[60] bg-v-black text-v-white text-center px-4 py-2 text-xs tracking-wider">
            {announcementText}
          </div>
        )}

      {/* NAVBAR */}

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          announcementEnabled &&
          announcementText
            ? 'top-8 md:top-9'
            : 'top-0'
        } ${
          isScrolled
            ? 'bg-v-white border-b border-v-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LEFT — CATALOG */}

            <div className="hidden md:flex items-center gap-8">

              <div
                className="relative group"
                onMouseEnter={() =>
                  setCatalogOpen(true)
                }
                onMouseLeave={() =>
                  setCatalogOpen(false)
                }
              >

                <button className="nav-link flex items-center gap-1">
                  Catalog
                  <ChevronDown size={12} />
                </button>

                {catalogOpen && (
                  <div className="absolute top-full left-0 pt-4">

                    <div className="bg-v-white border border-v-border shadow-lg min-w-48 py-2">

                      {navCategories.map(
                        cat => (
                          <Link
                            key={cat.slug}
                            href={`/shop?category=${cat.slug}`}
                            className="block px-6 py-3 text-xs tracking-wider uppercase text-v-black hover:bg-v-light transition-colors"
                          >
                            {cat.name}
                          </Link>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>

              <Link
                href="/shop"
                className="nav-link"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="nav-link"
              >
                About
              </Link>

            </div>


            {/* CENTER — DYNAMIC LOGO */}

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
            >

              {headerLogoEnabled &&
              headerLogo ? (

                <img
                  src={headerLogo}
                  alt="Velsario"
                  className="max-w-[160px] md:max-w-[190px] max-h-12 md:max-h-14 object-contain"
                />

              ) : (

                <span className="font-display text-2xl font-semibold tracking-widest text-v-black">
                  VELSARIO
                </span>

              )}

            </Link>


            {/* RIGHT — ICONS */}

            <div className="flex items-center gap-4 md:gap-6">

              <button
                onClick={() =>
                  setSearchOpen(!searchOpen)
                }
                className="text-v-black hover:text-v-gray transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/cart"
                className="relative text-v-black hover:text-v-gray transition-colors"
                aria-label="Shopping cart"
              >

                <ShoppingBag size={18} />

                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-v-black text-v-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}

              </Link>

              <button
                className="md:hidden text-v-black"
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


        {/* SEARCH BAR */}

        {searchOpen && (
          <div className="border-t border-v-border bg-v-white px-4 md:px-8 py-4">

            <div className="max-w-2xl mx-auto flex items-center gap-4">

              <Search
                size={16}
                className="text-v-gray"
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
                className="flex-1 bg-transparent border-none outline-none text-sm tracking-wide"
                autoFocus
              />

              <button
                onClick={() =>
                  setSearchOpen(false)
                }
                aria-label="Close search"
              >
                <X
                  size={16}
                  className="text-v-gray"
                />
              </button>

            </div>

          </div>
        )}

      </nav>


      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className={`fixed inset-0 z-40 bg-v-white ${
            announcementEnabled &&
            announcementText
              ? 'pt-28'
              : 'pt-20'
          }`}
        >

          <div className="px-8 py-8 flex flex-col gap-6">

            <div>

              <p className="section-label mb-4">
                Catalog
              </p>

              {navCategories.map(
                cat => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="block py-3 text-sm tracking-wider uppercase border-b border-v-border text-v-black"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    {cat.name}
                  </Link>
                )
              )}

            </div>

            <div className="flex flex-col gap-4 pt-4">

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
