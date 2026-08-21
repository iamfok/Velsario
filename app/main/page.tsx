'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Shield,
  Truck,
  RefreshCw,
  MapPin,
} from 'lucide-react'
import { products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

type Product = (typeof products)[number] & {
  featured?: boolean
  createdAt?: string
  salePrice?: number | null
}

const menCategories = [
  { name: "Men's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'men-shirt' },
  { name: "Men's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-pants-700x1024.jpg', slug: 'velsario-pants', filter: '' },
  { name: 'Accessories', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
  { name: 'Evening Dresses', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Eve-700x1024.jpg', slug: 'evening-dresses', filter: '' },
]

const womenCategories = [
  { name: "Women's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'ladies-shirt' },
  { name: "Women's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/Untitled-1-700x1024.jpg', slug: 'velsario-pants', filter: '' },
  { name: 'Accessories', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
  { name: 'Evening Wear', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-even-700x1024.jpg', slug: 'evening-dresses', filter: '' },
]

const exploreSlides = [
  {
    image: 'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg',
    eyebrow: 'Our Collection',
    title: 'Explore our exquisite',
    accent: 'Collection now!',
    description: 'Discover refined silhouettes designed around precision, simplicity and timeless style.',
    button: 'View Collection',
    href: '/shop',
  },
  {
    image: 'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM-2.jpeg',
    eyebrow: 'Velsario Edit',
    title: 'Minimal form.',
    accent: 'Maximum presence.',
    description: 'A sharper wardrobe designed for confidence, comfort and timeless style.',
    button: 'Shop Now',
    href: '/shop',
  },
]

function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (product: Product, color: string) => void
}) {
  const [liked, setLiked] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('velsario-wishlist') || '[]')
      setLiked(saved.includes(product.id))
    } catch {}
  }, [product.id])

  const toggleWishlist = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('velsario-wishlist') || '[]')
      const updated = saved.includes(product.id)
        ? saved.filter(id => id !== product.id)
        : [...saved, product.id]

      localStorage.setItem('velsario-wishlist', JSON.stringify(updated))
      setLiked(!liked)
    } catch {}
  }

  const handleAdd = () => {
    onAdd(product, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const price = product.salePrice || product.price

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-v-light">
        <Link href={`/shop/${product.id}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-v-black px-3 py-1 text-[10px] uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label="Save product"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
            liked
              ? 'border-black bg-black text-white'
              : 'border-white/70 bg-white/85 text-black hover:bg-black hover:text-white'
          }`}
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-v-gray">
              {(product.subcategory || product.category).replace('-', ' ')}
            </p>
            <Link href={`/shop/${product.id}`} className="block text-sm font-medium leading-snug hover:opacity-60">
              {product.name}
            </Link>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-medium">৳{price.toLocaleString()}</p>
            {product.salePrice && (
              <p className="text-xs text-gray-400 line-through">৳{product.price.toLocaleString()}</p>
            )}
          </div>
        </div>

        {product.colors?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color}`}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider transition-all ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-v-border text-v-gray hover:border-black hover:text-black'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    color.toLowerCase() === 'black'
                      ? 'bg-black'
                      : 'border border-gray-300 bg-white'
                  }`}
                />
                {color}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 border border-v-black px-2 py-3 text-[9px] uppercase tracking-widest transition-all hover:bg-v-black hover:text-white sm:text-[10px]"
          >
            <ShoppingBag size={13} />
            {added ? 'Added' : 'Add to Cart'}
          </button>

          <Link
            href={`/shop/${product.id}`}
            className="flex items-center justify-center bg-v-black px-2 py-3 text-[9px] uppercase tracking-widest text-white transition-all hover:bg-v-gray sm:text-[10px]"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function HomePage() {
  const { addItem } = useCart()
  const [allProducts, setAllProducts] = useState<Product[]>(products)
  const [newArrivalLimit, setNewArrivalLimit] = useState(5)
  const [exploreIndex, setExploreIndex] = useState(0)

  useEffect(() => {
    const loadProducts = () => {
      try {
        const saved: Product[] = JSON.parse(localStorage.getItem('velsario-products') || '[]')

        const merged = [
          ...saved,
          ...products.filter(
            product => !saved.some(savedProduct => savedProduct.id === product.id)
          ),
        ]

        setAllProducts(merged)
      } catch {
        setAllProducts(products)
      }
    }

    loadProducts()
    window.addEventListener('storage', loadProducts)
    window.addEventListener('velsario-products-updated', loadProducts)

    return () => {
      window.removeEventListener('storage', loadProducts)
      window.removeEventListener('velsario-products-updated', loadProducts)
    }
  }, [])

  const mostPopular = useMemo(
    () => allProducts.filter(product => product.featured === true).slice(0, 5),
    [allProducts]
  )

  const newArrivals = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return bTime - aTime
      })
      .slice(0, newArrivalLimit)
  }, [allProducts, newArrivalLimit])

  const handleAddToCart = (product: Product, color: string) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      color,
      size: product.sizes?.[0] || '',
      image: product.images[0],
      quantity: 1,
    })
  }

  const currentSlide = exploreSlides[exploreIndex]

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-v-black text-v-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center md:px-8">
          <p className="section-label mb-8 text-gray-400">Minimal colors. Maximum impact</p>

          <h1 className="font-display text-5xl leading-tight md:text-7xl lg:text-8xl">
            Effortlessly blend
            <br />
            <em>comfort & style</em>
          </h1>

          <p className="mx-auto mb-10 mt-8 max-w-2xl text-sm font-light leading-relaxed text-gray-400 md:mb-12 md:text-lg">
            Premium formal wear for men and women — crafted in pure black & white,
            built for those who mean business, who value presence, precision, and timeless style.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="btn-white">Explore the Collection</Link>
            <Link
              href="/shop?category=velsario-shirt"
              className="btn-secondary border-gray-600 text-gray-300 hover:bg-white hover:text-black"
            >
              Shop Shirts
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="mx-auto h-12 w-px bg-gray-600" />
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="section-label mb-3">Featured</p>
              <h2 className="font-display text-3xl md:text-4xl">Most Popular</h2>
            </div>
            <Link href="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-v-gray transition-all hover:gap-4 hover:text-v-black">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {mostPopular.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {mostPopular.map(product => (
                <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="border border-v-border bg-v-light px-6 py-16 text-center">
              <p className="text-sm text-v-gray">No Most Popular products selected yet.</p>
              <p className="mt-2 text-xs text-gray-400">Mark products as Featured from Admin → Products.</p>
            </div>
          )}
        </div>
      </section>

      {/* MEN */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="section-label mb-3">For Him</p>
            <h2 className="font-display text-3xl md:text-4xl">Men's Closet</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {menCategories.map((cat, index) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.slug}${cat.filter ? `&sub=${cat.filter}` : ''}`}
                className="product-card group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-v-light">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="product-image h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    style={{ transitionDelay: `${index * 35}ms` }}
                  />
                </div>
                <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 group-hover:tracking-[0.23em] md:text-xs">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT / EXPLORE COLLECTION */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative min-h-[520px] overflow-hidden bg-v-black text-v-white md:min-h-[620px]">
            {exploreSlides.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === exploreIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}

            <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-20 text-center md:min-h-[620px] md:px-16">
              <div className="max-w-3xl">
                <p className="section-label mb-6 text-gray-400">{currentSlide.eyebrow}</p>

                <h2 className="font-display text-4xl md:text-6xl">
                  {currentSlide.title}
                  <br />
                  <em>{currentSlide.accent}</em>
                </h2>

                <p className="mx-auto mb-8 mt-6 max-w-xl text-sm font-light leading-relaxed text-gray-300">
                  {currentSlide.description}
                </p>

                <Link href={currentSlide.href} className="btn-white">
                  {currentSlide.button}
                </Link>
              </div>
            </div>

            <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
              <button
                type="button"
                onClick={() => setExploreIndex(i => (i - 1 + exploreSlides.length) % exploreSlides.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 transition hover:bg-white hover:text-black"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>

              {exploreSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setExploreIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === exploreIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}

              <button
                type="button"
                onClick={() => setExploreIndex(i => (i + 1) % exploreSlides.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 transition hover:bg-white hover:text-black"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WOMEN */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="section-label mb-3">For Her</p>
            <h2 className="font-display text-3xl md:text-4xl">Women Closet</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {womenCategories.map((cat, index) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.slug}${cat.filter ? `&sub=${cat.filter}` : ''}`}
                className="product-card group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-v-light">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="product-image h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    style={{ transitionDelay: `${index * 35}ms` }}
                  />
                </div>
                <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 group-hover:tracking-[0.23em] md:text-xs">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-v-light px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="section-label mb-3">Just In</p>
              <h2 className="font-display text-3xl md:text-4xl">New Arrivals</h2>
            </div>
            <Link href="/shop" className="hidden items-center gap-2 text-[10px] uppercase tracking-widest text-v-gray hover:text-v-black sm:flex">
              Shop all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>

          {newArrivalLimit < allProducts.length && (
            <div className="mt-12 text-center">
              <button type="button" onClick={() => setNewArrivalLimit(n => n + 5)} className="btn-secondary">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PINSTRIPE / WORK & OFFICE */}
      <section className="bg-v-light px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl md:flex md:items-center md:gap-16">
          <div className="mb-10 flex-1 md:mb-0">
            <p className="section-label mb-4">Work & Office Attire</p>
            <h2 className="font-display mb-6 text-4xl md:text-5xl">
              Professional pinstripe
              <br />
              <em>collection</em>
            </h2>
            <p className="mb-8 max-w-md font-light leading-relaxed text-v-gray">
              Elevate your workwear with our Professional Pinstripe Collection, where tailored sophistication meets modern confidence for a powerfully polished office look.
            </p>
            <Link href="/shop" className="btn-primary">Shop Now</Link>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4">
            {allProducts.slice(0, 2).map(product => (
              <Link key={product.id} href={`/shop/${product.id}`} className="product-card group">
                <div className="aspect-[3/4] overflow-hidden bg-v-white">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 truncate text-xs font-medium">{product.name}</p>
                <p className="text-xs text-v-gray">৳{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / SECURE PAYMENT */}
      <section className="border-t border-v-border px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {[
            { icon: Shield, title: 'Secure Payments', desc: 'Shop with confidence knowing that your transactions are safeguarded.' },
            { icon: Truck, title: 'Fastest Shipping', desc: 'Experience fast and secure delivery with every order.' },
            { icon: RefreshCw, title: 'Easy Returns', desc: 'With our hassle-free Easy Returns, changing your mind has never been more convenient.' },
            { icon: MapPin, title: 'Order Tracking', desc: 'Stay in the loop — from checkout to your doorstep.' },
          ].map(feature => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group border border-transparent p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-v-border hover:bg-v-light"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-v-border transition-all duration-300 group-hover:scale-110 group-hover:bg-v-black group-hover:text-white">
                  <Icon size={21} />
                </div>
                <h3 className="mb-2 text-[11px] font-medium tracking-wide md:text-sm">{feature.title}</h3>
                <p className="text-[10px] font-light leading-relaxed text-v-gray md:text-xs">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* DISCOVER THE ALLURE */}
      <section className="relative overflow-hidden">
        <img
          src="https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM-2.jpeg"
          alt="Velsario Fashion"
          className="h-96 w-full object-cover md:h-[620px]"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-4 text-center text-white">
          <div>
            <h2 className="font-display text-3xl md:text-5xl">
              Discover the allure of
              <br />
              <em>fashion reinvented!</em>
            </h2>

            <p className="mb-8 mt-6 font-light text-gray-300">
              Dive into a world of style with our latest collection!
            </p>

            <Link href="/shop" className="btn-white">Shop Now</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
