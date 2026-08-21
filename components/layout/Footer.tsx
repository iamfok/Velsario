'use client'

import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
  Music2,
  ArrowUpRight,
} from 'lucide-react'

const footerCategories = [
  { label: 'Velsario Shirt', slug: 'velsario-shirt' },
  { label: 'Velsario Pants', slug: 'velsario-pants' },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Activewear', slug: 'activewear' },
  { label: 'Evening Dresses', slug: 'evening-dresses' },
]

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund & Returns Policy', href: '/refund-returns' },
  { label: 'Contact Support', href: '/contact' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/velsarioofficial',
    icon: Facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/velsarioofficials/',
    icon: Instagram,
  },
  {
    label: 'YouTube',
    href: '#',
    icon: Youtube,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: Twitter,
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=8801825134723',
    icon: MessageCircle,
  },
  {
    label: 'Telegram',
    href: '#',
    icon: Send,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: Music2,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-v-black text-v-white">

      {/* Structural background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full border border-white/[0.04]" />
        <div className="absolute -top-24 -left-24 w-[280px] h-[280px] rounded-full border border-white/[0.04]" />

        <div className="absolute right-[-180px] bottom-[-180px] w-[520px] h-[520px] rounded-full border border-white/[0.04]" />
        <div className="absolute right-[-90px] bottom-[-90px] w-[340px] h-[340px] rounded-full border border-white/[0.04]" />

        <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.025]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer */}
        <div className="py-16 md:py-20 lg:py-24">

          {/* Newsletter — top */}
          <div className="pb-14 md:pb-16 border-b border-white/10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-4">
                  Stay in the loop
                </p>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
                  Stay ahead of
                  <br />
                  <em>the curve.</em>
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed mt-4 max-w-md">
                  Subscribe for new collections, exclusive updates and
                  selected stories from Velsario.
                </p>
              </div>

              <div className="w-full">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row border border-white/20 focus-within:border-white/50 transition-colors"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-4 text-sm text-white placeholder:text-gray-600 outline-none"
                  />

                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-4 text-[10px] tracking-[0.18em] uppercase font-medium hover:bg-gray-200 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>

                <p className="text-[10px] text-gray-600 mt-3">
                  By subscribing, you agree to receive Velsario updates.
                </p>
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 lg:gap-12 pt-14">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">

              <Link
                href="/"
                className="inline-block font-display text-2xl sm:text-3xl tracking-[0.18em] font-semibold"
              >
                VELSARIO
              </Link>

              <p className="mt-5 text-sm text-gray-400 leading-relaxed font-light max-w-sm">
                Our journey began with a simple yet powerful vision —
                to redefine the way men & women experience fashion.
              </p>

              {/* Social */}
              <div className="mt-7">

                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-4">
                  Follow Velsario
                </p>

                <div className="flex flex-wrap gap-2">

                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    const disabled = social.href === '#'

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={disabled ? undefined : '_blank'}
                        rel={disabled ? undefined : 'noopener noreferrer'}
                        aria-label={social.label}
                        title={social.label}
                        onClick={(e) => {
                          if (disabled) e.preventDefault()
                        }}
                        className={`footer-social ${
                          disabled ? 'footer-social-disabled' : ''
                        }`}
                      >
                        <Icon size={15} />
                      </a>
                    )
                  })}

                </div>

              </div>

            </div>

            {/* Company */}
            <div>

              <p className="footer-heading">
                Company
              </p>

              <div className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            </div>

            {/* Categories */}
            <div>

              <p className="footer-heading">
                Categories
              </p>

              <div className="flex flex-col gap-3">
                {footerCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="footer-link"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

            </div>

            {/* Payments + Apps */}
            <div>

              <p className="footer-heading">
                Payment Options
              </p>

              <div className="grid grid-cols-4 gap-2 max-w-[240px]">
                {['VISA', 'Mastercard', 'AMEX', 'bKash', 'Nagad', 'COD'].map(
                  (method) => (
                    <div
                      key={method}
                      className="h-9 border border-white/10 flex items-center justify-center px-2"
                    >
                      <span className="text-[8px] tracking-wider text-gray-400">
                        {method}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-10">

                <p className="footer-heading">
                  Get the App
                </p>

                <div className="flex flex-col gap-2">

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="app-download"
                  >
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-gray-500">
                        Download on the
                      </span>
                      <span className="block text-sm font-medium text-gray-200">
                        App Store
                      </span>
                    </div>

                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="app-download"
                  >
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-gray-500">
                        Get it on
                      </span>
                      <span className="block text-sm font-medium text-gray-200">
                        Google Play
                      </span>
                    </div>

                    <ArrowUpRight size={14} />
                  </a>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-7 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-[10px] sm:text-xs text-gray-600 tracking-wider text-center md:text-left">
            © 2026 VELSARIO | All Rights Reserved
          </p>

          <p className="text-[10px] sm:text-xs text-gray-600 tracking-[0.18em] uppercase text-center md:text-right">
            Minimal Colors. Maximum Impact.
          </p>

        </div>

      </div>
    </footer>
  )
}
