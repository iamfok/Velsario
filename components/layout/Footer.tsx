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
} from 'lucide-react'
import { useEffect, useState } from 'react'

type SocialLink = {
  id: string
  platform: string
  url: string
  enabled: boolean
}

type Settings = {
  footerEnabled?: boolean
  footerLogoEnabled?: boolean
  footerLogo?: string
  footerLogoWidth?: number
  footerText?: string
  footerCopyright?: string
  socialLinks?: SocialLink[]
}

const defaultSettings: Settings = {
  footerEnabled: true,
  footerLogoEnabled: true,
  footerLogo: '',
  footerLogoWidth: 190,
  footerText:
    'Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.',
  footerCopyright:
    '© 2026 VELSARIO | All Rights Reserved',
  socialLinks: [],
}

const socialIcons: Record<
  string,
  React.ElementType
> = {
  Facebook,
  Instagram,
  WhatsApp: MessageCircle,
  YouTube: Youtube,
  TikTok: Music2,
  'X / Twitter': Twitter,
  LinkedIn: Linkedin,
  Telegram: Send,
}

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund & Returns Policy', href: '/refund-returns' },
]

const categories = [
  {
    label: 'Velsario Shirt',
    slug: 'velsario-shirt',
  },
  {
    label: 'Velsario Pants',
    slug: 'velsario-pants',
  },
  {
    label: 'Accessories',
    slug: 'accessories',
  },
  {
    label: 'Activewear',
    slug: 'activewear',
  },
  {
    label: 'Evening Dresses',
    slug: 'evening-dresses',
  },
]

export default function Footer() {

  const [settings, setSettings] =
    useState<Settings>(defaultSettings)

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

    return () =>
      window.removeEventListener(
        'velsario-settings-updated',
        loadSettings
      )

  }, [])

  if (settings.footerEnabled === false) {
    return null
  }

  const activeSocials =
    (settings.socialLinks || []).filter(
      social =>
        social.enabled &&
        social.url.trim()
    )

  return (

    <footer className="relative overflow-hidden bg-[#080808] text-white">

      {/* STRUCTURAL BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />

        <div className="absolute -right-20 top-40 w-[420px] h-[420px] rounded-full border border-white/[0.03]" />

        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full border border-white/[0.03]" />

      </div>


      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">


          {/* BRAND */}

          <div>

            {settings.footerLogoEnabled !== false &&
            settings.footerLogo ? (

              <Link href="/">
                <img
                  src={settings.footerLogo}
                  alt="Velsario"
                  style={{
                    width: `${Math.min(
                      settings.footerLogoWidth || 190,
                      280
                    )}px`,
                  }}
                  className="h-auto max-w-full object-contain"
                />
              </Link>

            ) : (

              <Link
                href="/"
                className="font-display text-2xl tracking-widest font-semibold"
              >
                VELSARIO
              </Link>

            )}


            <p className="mt-5 text-sm text-gray-400 leading-relaxed font-light max-w-xs">
              {settings.footerText}
            </p>


            {/* SOCIAL */}

            {activeSocials.length > 0 && (

              <div className="mt-7">

                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-4">
                  Follow Velsario
                </p>

                <div className="flex flex-wrap gap-2">

                  {activeSocials.map(
                    social => {

                      const Icon =
                        socialIcons[
                          social.platform
                        ] || MessageCircle

                      return (

                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            social.platform
                          }
                          className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                        >
                          <Icon size={16} />
                        </a>

                      )

                    }
                  )}

                </div>

              </div>

            )}

          </div>


          {/* COMPANY */}

          <div>

            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-6">
              Company
            </p>

            <div className="flex flex-col gap-3">

              {companyLinks.map(
                link => (

                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                  >
                    {link.label}
                  </Link>

                )
              )}

            </div>

          </div>


          {/* CATEGORIES */}

          <div>

            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-6">
              Categories
            </p>

            <div className="flex flex-col gap-3">

              {categories.map(
                cat => (

                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                  >
                    {cat.label}
                  </Link>

                )
              )}

            </div>

          </div>


          {/* RIGHT */}

          <div>

            {/* NEWSLETTER */}

            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-4">
              Newsletter
            </p>

            <div className="flex border border-white/10">

              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 outline-none"
              />

              <button className="bg-white text-black px-4 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-gray-200 transition-colors">
                Join
              </button>

            </div>


            {/* PAYMENT */}

            <div className="mt-8">

              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-4">
                Payment Options
              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  'VISA',
                  'Mastercard',
                  'AMEX',
                  'bKash',
                  'Nagad',
                  'COD',
                ].map(
                  payment => (

                    <div
                      key={payment}
                      className="h-9 min-w-[55px] px-3 border border-white/10 flex items-center justify-center"
                    >

                      <span className="text-[9px] tracking-wider text-gray-400">
                        {payment}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* APPS */}

            <div className="mt-8">

              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-4">
                Get The App
              </p>

              <div className="grid grid-cols-2 gap-2">

                <a
                  href="#"
                  className="border border-white/10 px-3 py-3 hover:border-white/30 transition-colors"
                >

                  <span className="block text-[8px] tracking-widest uppercase text-gray-500">
                    Download on
                  </span>

                  <span className="text-xs text-white">
                    App Store ↗
                  </span>

                </a>

                <a
                  href="#"
                  className="border border-white/10 px-3 py-3 hover:border-white/30 transition-colors"
                >

                  <span className="block text-[8px] tracking-widest uppercase text-gray-500">
                    Get it on
                  </span>

                  <span className="text-xs text-white">
                    Google Play ↗
                  </span>

                </a>

              </div>

            </div>

          </div>

        </div>


        {/* PAYMENT / NEWSLETTER SUPPORT ROW */}

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col items-center justify-center">

          <p className="text-[9px] tracking-[0.3em] uppercase text-gray-600">
            Secure payments • Fast delivery • Premium quality
          </p>

        </div>


        {/* COPYRIGHT */}

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-[10px] text-gray-600 tracking-wider text-center md:text-left">
            {settings.footerCopyright}
          </p>

          <p className="text-[10px] text-gray-600 tracking-[0.25em] uppercase text-center md:text-right">
            Minimal Colors. Maximum Impact.
          </p>

        </div>

      </div>

    </footer>
  )
}
