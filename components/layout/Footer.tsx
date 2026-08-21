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
import { useEffect, useState } from 'react'

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
]

const socialIcons: Record<string, any> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Twitter,
  WhatsApp: MessageCircle,
  Telegram: Send,
  TikTok: Music2,
}

const defaultSocials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/velsarioofficial',
    active: true,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/velsarioofficials/',
    active: true,
  },
  {
    name: 'YouTube',
    url: '',
    active: false,
  },
  {
    name: 'LinkedIn',
    url: '',
    active: false,
  },
  {
    name: 'Twitter',
    url: '',
    active: false,
  },
  {
    name: 'WhatsApp',
    url: 'https://api.whatsapp.com/send?phone=8801825134723',
    active: true,
  },
  {
    name: 'Telegram',
    url: '',
    active: false,
  },
  {
    name: 'TikTok',
    url: '',
    active: false,
  },
]

const defaultPayments = [
  { name: 'Visa', image: '' },
  { name: 'Mastercard', image: '' },
  { name: 'American Express', image: '' },
  { name: 'bKash', image: '' },
  { name: 'Nagad', image: '' },
  { name: 'COD', image: '' },
]

export default function Footer() {
  const [logo, setLogo] = useState('')
  const [socials, setSocials] = useState(defaultSocials)
  const [payments, setPayments] = useState(defaultPayments)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('velsario_settings')

      if (!saved) return

      const settings = JSON.parse(saved)

      if (settings.footerLogo) {
        setLogo(settings.footerLogo)
      }

      if (Array.isArray(settings.socialMedia)) {
        setSocials(settings.socialMedia)
      }

      if (Array.isArray(settings.paymentMethods)) {
        setPayments(settings.paymentMethods)
      }
    } catch {
      // Keep defaults
    }
  }, [])

  const activeSocials = socials.filter(
    (social) => social.active && social.url
  )

  return (
    <footer className="relative overflow-hidden bg-v-black text-v-white">

      {/* STRUCTURAL BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full border border-white/[0.04]" />

        <div className="absolute -top-24 -left-24 w-[280px] h-[280px] rounded-full border border-white/[0.04]" />

        <div className="absolute right-[-180px] bottom-[-180px] w-[520px] h-[520px] rounded-full border border-white/[0.04]" />

        <div className="absolute right-[-90px] bottom-[-90px] w-[340px] h-[340px] rounded-full border border-white/[0.04]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================
            MAIN FOOTER
        ========================================= */}
        <div className="py-14 md:py-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

            {/* BRAND */}
            <div className="sm:col-span-2 lg:col-span-1">

              <Link
                href="/"
                className="inline-flex items-center"
              >

                {logo ? (
                  <img
                    src={logo}
                    alt="Velsario"
                    className="w-auto max-w-[180px] h-auto max-h-12 object-contain"
                  />
                ) : (
                  <span className="font-display text-2xl tracking-[0.18em] font-semibold">
                    VELSARIO
                  </span>
                )}

              </Link>

              <p className="mt-5 text-sm text-gray-400 leading-relaxed font-light max-w-sm">
                Our journey began with a simple yet powerful vision —
                to redefine the way men & women experience fashion.
              </p>

              {/* ACTIVE SOCIALS ONLY */}
              {activeSocials.length > 0 && (
                <div className="mt-7">

                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-4">
                    Follow Velsario
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {activeSocials.map((social) => {

                      const Icon = socialIcons[social.name]

                      if (!Icon) return null

                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          title={social.name}
                          className="footer-social"
                        >
                          <Icon size={15} />
                        </a>
                      )
                    })}

                  </div>

                </div>
              )}

            </div>


            {/* COMPANY */}
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


            {/* CATEGORIES */}
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


            {/* RIGHT SIDE */}
            <div>

              {/* NEWSLETTER */}
              <div>

                <p className="footer-heading">
                  Newsletter
                </p>

                <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">
                  Get new collection updates, exclusive offers and
                  selected stories from Velsario.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex border border-white/15 focus-within:border-white/40 transition-colors"
                >

                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white placeholder:text-gray-600 outline-none"
                  />

                  <button
                    type="submit"
                    className="bg-white text-black px-4 py-3 text-[9px] tracking-[0.16em] uppercase font-medium hover:bg-gray-200 transition-colors"
                  >
                    Join
                  </button>

                </form>

              </div>


              {/* APPS */}
              <div className="mt-8">

                <p className="footer-heading">
                  Get the App
                </p>

                <div className="grid grid-cols-2 gap-2">

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="app-download"
                  >

                    <div>

                      <span className="block text-[7px] uppercase tracking-wider text-gray-500">
                        Download on the
                      </span>

                      <span className="block text-xs font-medium text-gray-200">
                        App Store
                      </span>

                    </div>

                    <ArrowUpRight size={12} />

                  </a>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="app-download"
                  >

                    <div>

                      <span className="block text-[7px] uppercase tracking-wider text-gray-500">
                        Get it on
                      </span>

                      <span className="block text-xs font-medium text-gray-200">
                        Google Play
                      </span>

                    </div>

                    <ArrowUpRight size={12} />

                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            PAYMENT OPTIONS
            CENTERED ROW
        ========================================= */}
        <div className="border-t border-white/10 py-8">

          <div className="flex flex-col items-center">

            <p className="footer-heading mb-5">
              Payment Options
            </p>

            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">

              {payments.map((payment, index) => (

                <div
                  key={`${payment.name}-${index}`}
                  className="h-10 min-w-[68px] sm:min-w-[78px] px-3 border border-white/10 bg-white/[0.02] flex items-center justify-center"
                  title={payment.name}
                >

                  {payment.image ? (
                    <img
                      src={payment.image}
                      alt={payment.name}
                      className="max-w-[60px] max-h-[25px] object-contain"
                    />
                  ) : (
                    <span className="text-[8px] tracking-wider text-gray-400">
                      {payment.name}
                    </span>
                  )}

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* =========================================
            COPYRIGHT
        ========================================= */}
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
