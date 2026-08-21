import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'
import { getActiveBanners } from '@/lib/banners'
import { ArrowRight, Shield, Truck, RefreshCw, MapPin } from 'lucide-react'

export default function HomePage() {
  const featuredProducts = products.slice(0, 3)

  const menCategories = [
    { name: "Men's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'men-shirt' },
    { name: "Men's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-pants-700x1024.jpg', slug: 'velsario-pants', filter: '' },
    { name: "Accessories", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
    { name: "Evening Dresses", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Eve-700x1024.jpg', slug: 'evening-dresses', filter: '' },
  ]

  const womenCategories = [
    { name: "Women's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'ladies-shirt' },
    { name: "Women's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/Untitled-1-700x1024.jpg', slug: 'velsario-pants', filter: '' },
    { name: "Accessories", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
    { name: "Evening Wear", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-even-700x1024.jpg', slug: 'evening-dresses', filter: '' },
  ]

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-v-black text-v-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-3 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto pt-20">
          <p className="section-label text-gray-400 mb-8">Minimal colors. Maximum impact</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-400 leading-tight mb-8">
            Effortlessly blend
            <br />
            <em>comfort & style</em>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Premium formal wear for men and women — crafted in pure black & white, 
            built for those who mean business, who value presence, precision, and timeless style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-white">
              Explore the Collection
            </Link>
            <Link href="/shop?category=velsario-shirt" className="btn-secondary border-gray-600 text-gray-300 hover:bg-white hover:text-black">
              Shop Shirts
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gray-600 mx-auto" />
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Featured</p>
            <h2 className="font-display text-3xl md:text-4xl">Most Popular</h2>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-xs tracking-wider uppercase hover:gap-4 transition-all text-v-gray hover:text-v-black">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <Link key={product.id} href={`/shop/${product.id}`} className="product-card group">
              <div className="aspect-[3/4] bg-v-light overflow-hidden mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-v-black text-v-white text-xs px-3 py-1 tracking-wider uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-v-gray tracking-wider uppercase mb-1">
                    {product.subcategory.replace('-', ' ')}
                  </p>
                  <h3 className="text-sm font-medium leading-snug max-w-48">{product.name}</h3>
                </div>
                <p className="text-sm font-medium">৳{product.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2 mt-3">
                {product.colors.map(color => (
                  <span key={color} className="text-xs text-v-gray">{color}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEN'S CLOSET */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="section-label mb-3">For Him</p>
          <h2 className="font-display text-3xl md:text-4xl">Men's Closet</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {menCategories.map(cat => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.slug}${cat.filter ? `&sub=${cat.filter}` : ''}`}
              className="product-card group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-v-light">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="product-image w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm tracking-wider uppercase font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-v-black text-v-white">
          <div className="absolute inset-0">
            <img
              src="https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg"
              alt="Velsario Collection"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 py-20 md:py-32 px-8 md:px-16 text-center">
            <p className="section-label text-gray-400 mb-6">Our Collection</p>
            <h2 className="font-display text-4xl md:text-6xl mb-8">
              Explore our exquisite
              <br />
              <em>Collection now!</em>
            </h2>
            <Link href="/shop" className="btn-white">View Collection</Link>
          </div>
        </div>
      </section>

      {/* WOMEN'S CLOSET */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="section-label mb-3">For Her</p>
          <h2 className="font-display text-3xl md:text-4xl">Women Closet</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {womenCategories.map(cat => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.slug}${cat.filter ? `&sub=${cat.filter}` : ''}`}
              className="product-card group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-v-light">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="product-image w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm tracking-wider uppercase font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* PINSTRIPE COLLECTION CTA */}
      <section className="py-20 px-4 md:px-8 bg-v-light">
        <div className="max-w-7xl mx-auto md:flex items-center gap-16">
          <div className="flex-1 mb-10 md:mb-0">
            <p className="section-label mb-4">Work & Office Attire</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Professional pinstripe
              <br />
              <em>collection</em>
            </h2>
            <p className="text-v-gray leading-relaxed mb-8 max-w-md font-light">
              Elevate your workwear with our Professional Pinstripe Collection, where tailored sophistication meets modern confidence for a powerfully polished office look.
            </p>
            <Link href="/shop" className="btn-primary">Shop Now</Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 2).map(product => (
              <Link key={product.id} href={`/shop/${product.id}`} className="product-card group">
                <div className="aspect-[3/4] bg-v-white overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs font-medium truncate">{product.name}</p>
                <p className="text-xs text-v-gray">৳{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-4 md:px-8 border-t border-v-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: 'Secure Payments', desc: 'Shop with confidence knowing that your transactions are safeguarded.' },
            { icon: Truck, title: 'Fastest Shipping', desc: 'Experience fast and secure delivery with every order.' },
            { icon: RefreshCw, title: 'Easy Returns', desc: 'With our hassle-free Easy Returns, changing your mind has never been more convenient.' },
            { icon: MapPin, title: 'Order Tracking', desc: 'Stay in the loop — from checkout to your doorstep.' },
          ].map(feature => (
            <div key={feature.title} className="text-center">
              <feature.icon size={24} className="mx-auto mb-4 text-v-black" />
              <h3 className="text-sm font-medium tracking-wide mb-2">{feature.title}</h3>
              <p className="text-xs text-v-gray leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM-2.jpeg"
          alt="Velsario Fashion"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center px-4">
          <div>
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              Discover the allure of
              <br />
              <em>fashion reinvented!</em>
            </h2>
            <p className="text-gray-300 mb-8 font-light">Dive into a world of style with our latest collection!</p>
            <Link href="/shop" className="btn-white">Shop Now</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
