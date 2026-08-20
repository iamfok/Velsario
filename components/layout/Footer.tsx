import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-v-black text-v-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl tracking-widest font-semibold">VELSARIO</span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light">
              Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/velsarioofficial" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-v-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/velsarioofficials/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-v-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=8801825134723" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-v-white transition-colors text-xs tracking-wider mt-1">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs tracking-widest3 uppercase text-gray-500 mb-6">Company</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs tracking-widest3 uppercase text-gray-500 mb-6">Categories</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Velsario Shirt', slug: 'velsario-shirt' },
                { label: 'Velsario Pants', slug: 'velsario-pants' },
                { label: 'Accessories', slug: 'accessories' },
                { label: 'Activewear', slug: 'activewear' },
                { label: 'Evening Dresses', slug: 'evening-dresses' },
              ].map(cat => (
                <Link key={cat.slug} href={`/shop?category=${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs tracking-widest3 uppercase text-gray-500 mb-6">Resources</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Refund & Returns Policy', href: '/refund-returns' },
                { label: 'Contact Support', href: '/contact' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-gray-700 px-4 py-2 text-sm text-v-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
                />
                <button className="bg-v-white text-v-black px-4 py-2 text-xs tracking-wider uppercase font-medium hover:bg-gray-200 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 tracking-wider">
            © 2026 VELSARIO | All Rights Reserved
          </p>
          <p className="text-xs text-gray-600 tracking-widest uppercase">
            Minimal Colors. Maximum Impact.
          </p>
        </div>
      </div>
    </footer>
  )
}
