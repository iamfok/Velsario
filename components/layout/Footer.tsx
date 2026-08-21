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
    useState<Settings>({})

  useEffect(() => {

    const loadSettings = () => {

      try {

        const saved =
          localStorage.getItem(
            'velsario-settings'
          )

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

        <div className="absolute right-[-160px] bottom-[-180px] w-[520px] h-[520px] rounded-full border border-white/[0.035]" />

        <div className="absolute right-[-90px] bottom-[-110px] w-[420px] h-[420px] rounded-full border border-white/[0.025]" />

        <div className="absolute left-[-180px] top-[-180px] w-[360px] h-[360px] rounded-full border border-white/[0.025]" />

      </div>


      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">


        {/* MAIN FOOTER ARCHITECTURE */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">


          {/* BRAND */}

          <div className="md:col-span-1">

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

            <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light max-w-xs">
              {settings.footerText ||
                'Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.'}
            </p>


            {/* ONLY ACTIVE SOCIAL MEDIA */}

            {activeSocials.length > 0 && (

              <div className="mt-6">

                <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
                  Follow Velsario
                </p>

                <div className="flex flex-wrap gap-2">

                  {activeSocials.map((social) => {

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
                        aria-label={social.platform}
                        className="
                          w-10 h-10
                          border border-white/10
                          flex items-center justify-center
                          text-gray-400
                          hover:text-white
                          hover:border-white/40
                          hover:bg-white/[0.05]
                          transition-all
                          duration-300
                        "
                      >
                        <Icon size={17} />
                      </a>
                    )

                  })}

                </div>

              </div>

            )}

          </div>


          {/* COMPANY */}

          <div>

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              Company
            </p>

            <div className="flex flex-col gap-3">

              {companyLinks.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                >
                  {link.label}
                </Link>

              ))}

            </div>

          </div>


          {/* CATEGORIES */}

          <div>

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              Categories
            </p>

            <div className="flex flex-col gap-3">

              {categories.map((cat) => (

                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors font-light"
                >
                  {cat.label}
                </Link>

              ))}

            </div>

          </div>


          {/* RIGHT COLUMN */}

          <div>

            {/* NEWSLETTER */}

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
              Newsletter
            </p>

            <div className="flex w-full">

              <input
                type="email"
                placeholder="Your email"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  border border-gray-700
                  px-4 py-3
                  text-sm
                  text-white
                  placeholder-gray-600
                  focus:outline-none
                  focus:border-gray-500
                "
              />

              <button
                className="
                  bg-white
                  text-black
                  px-4
                  py-3
                  text-xs
                  tracking-wider
                  uppercase
                  font-medium
                  hover:bg-gray-200
                  transition-colors
                "
              >
                Join
              </button>

            </div>


            {/* APPS — SIDE BY SIDE */}

            <div className="mt-8">

              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
                Get The App
              </p>

              <div className="grid grid-cols-2 gap-2">

                <a
                  href="#"
                  className="
                    border border-white/10
                    px-3 py-3
                    hover:border-white/30
                    transition-colors
                  "
                >

                  <span className="block text-[8px] tracking-widest uppercase text-gray-500">
                    Download on
                  </span>

                  <span className="text-sm text-white">
                    App Store ↗
                  </span>

                </a>


                <a
                  href="#"
                  className="
                    border border-white/10
                    px-3 py-3
                    hover:border-white/30
                    transition-colors
                  "
                >

                  <span className="block text-[8px] tracking-widest uppercase text-gray-500">
                    Get it on
                  </span>

                  <span className="text-sm text-white">
                    Google Play ↗
                  </span>

                </a>

              </div>

            </div>

          </div>

        </div>


        {/* PAYMENT ROW — EXACTLY ABOVE COPYRIGHT */}

        <div className="border-t border-gray-800 mt-14 pt-8">

          <div className="flex flex-col items-center">

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-5">
              Payment Options
            </p>

            <div className="flex flex-wrap justify-center gap-2">

              {/* VISA */}
              <div className="h-9 min-w-[64px] px-4 border border-gray-800 flex items-center justify-center">
                <span className="font-semibold italic text-xs text-gray-400">
                  VISA
                </span>
              </div>

              {/* MASTERCARD */}
              <div className="h-9 min-w-[78px] px-3 border border-gray-800 flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-gray-500/70" />
                  <span className="w-3.5 h-3.5 rounded-full bg-gray-400/50 -ml-2" />
                  <span className="text-[8px] text-gray-400 ml-1">
                    Mastercard
                  </span>
                </div>
              </div>

              {/* AMEX */}
              <div className="h-9 min-w-[64px] px-4 border border-gray-800 flex items-center justify-center">
                <span className="font-semibold text-[10px] text-gray-400">
                  AMEX
                </span>
              </div>

              {/* BKASH */}
              <div className="h-9 min-w-[64px] px-4 border border-gray-800 flex items-center justify-center">
                <span className="font-semibold text-[10px] text-gray-400">
                  bKash
                </span>
              </div>

              {/* NAGAD */}
              <div className="h-9 min-w-[64px] px-4 border border-gray-800 flex items-center justify-center">
                <span className="font-semibold text-[10px] text-gray-400">
                  Nagad
                </span>
              </div>

              {/* COD */}
              <div className="h-9 min-w-[64px] px-4 border border-gray-800 flex items-center justify-center">
                <span className="font-semibold text-[9px] text-gray-400">
                  COD
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* COPYRIGHT — SAME ARCHITECTURE */}

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-600 tracking-wider text-center md:text-left">
            {settings.footerCopyright ||
              '© 2026 VELSARIO | All Rights Reserved'}
          </p>

          <p className="text-xs text-gray-600 tracking-widest uppercase text-center md:text-right">
            Minimal Colors. Maximum Impact.
          </p>

        </div>

      </div>

    </footer>
  )
}
