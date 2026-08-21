'use client'

import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Music2,
  Send,
  MessageCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type SocialLink = {
  platform: string
  url: string
  enabled: boolean
}

type FooterSettings = {
  storeName: string
  footerLogo: string
  footerEnabled: boolean
  footerLogoEnabled: boolean
  footerText: string
  footerCopyright: string
  facebook: string
  instagram: string
  whatsapp: string
  socialLinks: SocialLink[]
}

const defaultSettings: FooterSettings = {
  storeName: 'VELSARIO',
  footerLogo: '',
  footerEnabled: true,
  footerLogoEnabled: true,
  footerText:
    'Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.',
  footerCopyright:
    '© 2026 VELSARIO | All Rights Reserved',
  facebook:
    'https://www.facebook.com/velsarioofficial',
  instagram:
    'https://www.instagram.com/velsarioofficials/',
  whatsapp:
    'https://api.whatsapp.com/send?phone=8801825134723',
  socialLinks: [],
}

export default function Footer() {

  const [settings, setSettings] =
    useState<FooterSettings>(defaultSettings)

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          'velsario-settings'
        )

      if (saved) {

        const parsed = JSON.parse(saved)

        setSettings({
          ...defaultSettings,
          ...parsed,
        })

      }

    } catch {

      setSettings(defaultSettings)

    }

  }, [])


  if (!settings.footerEnabled) {
    return null
  }


  const socialLinks: SocialLink[] = [
    ...(settings.facebook
      ? [{
          platform: 'Facebook',
          url: settings.facebook,
          enabled: true,
        }]
      : []),

    ...(settings.instagram
      ? [{
          platform: 'Instagram',
          url: settings.instagram,
          enabled: true,
        }]
      : []),

    ...(settings.whatsapp
      ? [{
          platform: 'WhatsApp',
          url: settings.whatsapp,
          enabled: true,
        }]
      : []),

    ...(settings.socialLinks || []),
  ].filter(
    item =>
      item.enabled &&
      item.url.trim()
  )


  const getIcon = (
    platform: string
  ) => {

    const name =
      platform.toLowerCase()

    if (name.includes('facebook'))
      return <Facebook size={18} />

    if (name.includes('instagram'))
      return <Instagram size={18} />

    if (name.includes('youtube'))
      return <Youtube size={18} />

    if (
      name.includes('twitter') ||
      name.includes('x')
    )
      return <Twitter size={18} />

    if (name.includes('linkedin'))
      return <Linkedin size={18} />

    if (
      name.includes('tiktok') ||
      name.includes('music')
    )
      return <Music2 size={18} />

    if (
      name.includes('telegram')
    )
      return <Send size={18} />

    if (
      name.includes('whatsapp')
    )
      return <MessageCircle size={18} />

    return (
      <span className="text-[11px] font-medium">
        {platform
          .slice(0, 2)
          .toUpperCase()}
      </span>
    )

  }


  return (

    <footer className="bg-v-black text-v-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">


          {/* BRAND */}

          <div className="md:col-span-1">

            {settings.footerLogoEnabled &&
            settings.footerLogo ? (

              <Link href="/">

                <img
                  src={settings.footerLogo}
                  alt={settings.storeName}
                  className="max-w-[180px] max-h-16 object-contain object-left"
                />

              </Link>

            ) : (

              <Link href="/">

                <span className="font-display text-2xl tracking-widest font-semibold">
                  {settings.storeName}
                </span>

              </Link>

            )}


            <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light">

              {settings.footerText}

            </p>


            {/* SOCIAL MEDIA */}

            {socialLinks.length > 0 && (

              <div className="flex flex-wrap gap-4 mt-6">

                {socialLinks.map(
                  (social, index) => (

                    <a
                      key={`${social.platform}-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        social.platform
                      }
                      title={
                        social.platform
                      }
                      className="w-8 h-8 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-v-white hover:border-gray-400 transition-colors"
                    >

                      {getIcon(
                        social.platform
                      )}

                    </a>

                  )
                )}

              </div>

            )}

          </div>


          {/* COMPANY */}

          <div>

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              Company
            </p>

            <div className="flex flex-col gap-3">

              {[
                {
                  label: 'Home',
                  href: '/',
                },
                {
                  label: 'Shop',
                  href: '/shop',
                },
                {
                  label: 'About Us',
                  href: '/about',
                },
                {
                  label: 'Contact Us',
                  href: '/contact',
                },
                {
                  label: 'Privacy Policy',
                  href: '/privacy-policy',
                },
              ].map(link => (

                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light"
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

              {[
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
              ].map(cat => (

                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light"
                >
                  {cat.label}
                </Link>

              ))}

            </div>

          </div>


          {/* RESOURCES */}

          <div>

            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              Resources
            </p>

            <div className="flex flex-col gap-3">

              {[
                {
                  label: 'Refund & Returns Policy',
                  href: '/refund-returns',
                },
                {
                  label: 'Contact Support',
                  href: '/contact',
                },
              ].map(link => (

                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-v-white transition-colors font-light"
                >
                  {link.label}
                </Link>

              ))}

            </div>


            {/* NEWSLETTER */}

            <div className="mt-8">

              <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                Newsletter
              </p>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 bg-transparent border border-gray-700 px-4 py-2 text-sm text-v-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
                />

                <button
                  type="button"
                  className="bg-v-white text-v-black px-4 py-2 text-xs tracking-wider uppercase font-medium hover:bg-gray-200 transition-colors"
                >
                  Join
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-600 tracking-wider">

            {settings.footerCopyright}

          </p>

          <p className="text-xs text-gray-600 tracking-widest uppercase">
            Minimal Colors. Maximum Impact.
          </p>

        </div>

      </div>

    </footer>

  )
}
