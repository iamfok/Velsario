'use client'

import { useEffect, useState } from 'react'
import {
  Save,
  Store,
  Bell,
  Shield,
  Image as ImageIcon,
  Layout,
  PanelBottom,
  Upload,
  X,
} from 'lucide-react'

type Settings = {
  storeName: string
  email: string
  phone: string
  currency: string

  logo: string
  favicon: string

  announcementEnabled: boolean
  announcementText: string

  headerEnabled: boolean
  headerLogoEnabled: boolean

  footerEnabled: boolean
  footerText: string
  footerCopyright: string
  footerLogoEnabled: boolean

  facebook: string
  instagram: string
  whatsapp: string

  orderNotifications: boolean
}

const defaultSettings: Settings = {
  storeName: 'VELSARIO',
  email: '',
  phone: '',
  currency: 'BDT',

  logo: '',
  favicon: '',

  announcementEnabled: false,
  announcementText: '',

  headerEnabled: true,
  headerLogoEnabled: true,

  footerEnabled: true,
  footerText: '',
  footerCopyright: '© 2026 VELSARIO. All rights reserved.',
  footerLogoEnabled: true,

  facebook: '',
  instagram: '',
  whatsapp: '',

  orderNotifications: true,
}

export default function SettingsPage() {

  const [settings, setSettings] =
    useState<Settings>(defaultSettings)

  const [saved, setSaved] =
    useState(false)

  const [loaded, setLoaded] =
    useState(false)


  useEffect(() => {

    try {

      const savedSettings =
        localStorage.getItem(
          'velsario-settings'
        )

      if (savedSettings) {

        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        })

      }

    } catch {
      setSettings(defaultSettings)
    }

    setLoaded(true)

  }, [])


  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {

    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))

    setSaved(false)

  }


  const handleImageUpload = (
    key: 'logo' | 'favicon',
    file: File | undefined
  ) => {

    if (!file) return

    if (!file.type.startsWith('image/')) {

      alert('Please select an image file.')

      return

    }

    const reader = new FileReader()

    reader.onload = () => {

      updateSetting(
        key,
        reader.result as string
      )

    }

    reader.readAsDataURL(file)

  }


  const removeImage = (
    key: 'logo' | 'favicon'
  ) => {

    updateSetting(key, '')

  }


  const handleSave = () => {

    try {

      localStorage.setItem(
        'velsario-settings',
        JSON.stringify(settings)
      )

      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 2500)

    } catch {

      alert(
        'Unable to save settings.'
      )

    }

  }


  if (!loaded) {

    return (

      <div className="max-w-5xl">

        <div className="bg-white border border-v-border p-10 text-center">

          <p className="text-sm text-v-gray">
            Loading settings...
          </p>

        </div>

      </div>

    )

  }


  return (

    <div className="max-w-5xl">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Configuration
        </p>

        <h1 className="text-2xl font-medium">
          Settings
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Manage your store, branding, header and footer.
        </p>

      </div>


      {/* STORE SETTINGS */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <Store size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Store Settings
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Basic information about your store.
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* STORE NAME */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Store Name
            </label>

            <input
              type="text"
              value={settings.storeName}
              onChange={e =>
                updateSetting(
                  'storeName',
                  e.target.value
                )
              }
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>


          {/* CURRENCY */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Currency
            </label>

            <select
              value={settings.currency}
              onChange={e =>
                updateSetting(
                  'currency',
                  e.target.value
                )
              }
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >

              <option value="BDT">
                BDT (৳)
              </option>

              <option value="USD">
                USD ($)
              </option>

            </select>

          </div>


          {/* EMAIL */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Store Email
            </label>

            <input
              type="email"
              value={settings.email}
              onChange={e =>
                updateSetting(
                  'email',
                  e.target.value
                )
              }
              placeholder="hello@velsario.com"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>


          {/* PHONE */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Store Phone
            </label>

            <input
              type="tel"
              value={settings.phone}
              onChange={e =>
                updateSetting(
                  'phone',
                  e.target.value
                )
              }
              placeholder="+880..."
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

        </div>

      </div>


      {/* BRANDING */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <ImageIcon size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Branding
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Manage your brand logo and favicon.
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* LOGO */}

          <div>

            <label className="block text-xs tracking-wider mb-3">
              Brand Logo
            </label>

            <div className="border border-dashed border-v-border p-5">

              {settings.logo ? (

                <div>

                  <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

                    <img
                      src={settings.logo}
                      alt="Brand logo"
                      className="max-h-24 max-w-full object-contain"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage('logo')
                    }
                    className="flex items-center gap-2 text-xs text-red-500"
                  >

                    <X size={13} />

                    Remove Logo

                  </button>

                </div>

              ) : (

                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">

                  <Upload
                    size={20}
                    className="text-gray-400 mb-3"
                  />

                  <span className="text-xs font-medium">
                    Upload Logo
                  </span>

                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                      handleImageUpload(
                        'logo',
                        e.target.files?.[0]
                      )
                    }
                  />

                </label>

              )}

            </div>

          </div>


          {/* FAVICON */}

          <div>

            <label className="block text-xs tracking-wider mb-3">
              Favicon
            </label>

            <div className="border border-dashed border-v-border p-5">

              {settings.favicon ? (

                <div>

                  <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

                    <img
                      src={settings.favicon}
                      alt="Favicon"
                      className="w-16 h-16 object-contain"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage('favicon')
                    }
                    className="flex items-center gap-2 text-xs text-red-500"
                  >

                    <X size={13} />

                    Remove Favicon

                  </button>

                </div>

              ) : (

                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">

                  <Upload
                    size={20}
                    className="text-gray-400 mb-3"
                  />

                  <span className="text-xs font-medium">
                    Upload Favicon
                  </span>

                  <span className="text-xs text-gray-400 mt-1">
                    PNG, ICO, JPG
                  </span>

                  <input
                    type="file"
                    accept="image/*,.ico"
                    className="hidden"
                    onChange={e =>
                      handleImageUpload(
                        'favicon',
                        e.target.files?.[0]
                      )
                    }
                  />

                </label>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* HEADER SETTINGS */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <Layout size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Header
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Control your website header.
            </p>

          </div>

        </div>


        <div className="space-y-5">


          {/* HEADER ENABLE */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Header
              </p>

              <p className="text-xs text-v-gray mt-1">
                Show or hide the main website header.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings.headerEnabled}
              onChange={e =>
                updateSetting(
                  'headerEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* HEADER LOGO */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Brand Logo
              </p>

              <p className="text-xs text-v-gray mt-1">
                Display your uploaded brand logo in the header.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings.headerLogoEnabled}
              onChange={e =>
                updateSetting(
                  'headerLogoEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* ANNOUNCEMENT */}

          <div className="border-t border-v-border pt-5">

            <label className="flex items-center justify-between gap-4 cursor-pointer mb-4">

              <div>

                <p className="text-sm font-medium">
                  Announcement Bar
                </p>

                <p className="text-xs text-v-gray mt-1">
                  Show a promotional message above the header.
                </p>

              </div>

              <input
                type="checkbox"
                checked={
                  settings.announcementEnabled
                }
                onChange={e =>
                  updateSetting(
                    'announcementEnabled',
                    e.target.checked
                  )
                }
                className="w-4 h-4"
              />

            </label>


            <input
              type="text"
              value={
                settings.announcementText
              }
              onChange={e =>
                updateSetting(
                  'announcementText',
                  e.target.value
                )
              }
              placeholder="Free delivery inside Dhaka"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

        </div>

      </div>


      {/* FOOTER SETTINGS */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <PanelBottom size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Footer
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Manage your website footer content and social links.
            </p>

          </div>

        </div>


        <div className="space-y-6">


          {/* FOOTER ENABLE */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Footer
              </p>

              <p className="text-xs text-v-gray mt-1">
                Show or hide the website footer.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings.footerEnabled}
              onChange={e =>
                updateSetting(
                  'footerEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* FOOTER LOGO */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Footer Logo
              </p>

              <p className="text-xs text-v-gray mt-1">
                Display the brand logo in the footer.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.footerLogoEnabled
              }
              onChange={e =>
                updateSetting(
                  'footerLogoEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* FOOTER TEXT */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Footer Text
            </label>

            <textarea
              value={settings.footerText}
              onChange={e =>
                updateSetting(
                  'footerText',
                  e.target.value
                )
              }
              placeholder="Minimal colors. Maximum impact."
              rows={3}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none focus:border-black"
            />

          </div>


          {/* COPYRIGHT */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Copyright Text
            </label>

            <input
              type="text"
              value={
                settings.footerCopyright
              }
              onChange={e =>
                updateSetting(
                  'footerCopyright',
                  e.target.value
                )
              }
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>


          {/* SOCIAL LINKS */}

          <div>

            <p className="text-xs tracking-wider mb-4">
              Social Links
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


              <div>

                <label className="block text-xs text-v-gray mb-2">
                  Facebook
                </label>

                <input
                  type="url"
                  value={settings.facebook}
                  onChange={e =>
                    updateSetting(
                      'facebook',
                      e.target.value
                    )
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>


              <div>

                <label className="block text-xs text-v-gray mb-2">
                  Instagram
                </label>

                <input
                  type="url"
                  value={settings.instagram}
                  onChange={e =>
                    updateSetting(
                      'instagram',
                      e.target.value
                    )
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>


              <div>

                <label className="block text-xs text-v-gray mb-2">
                  WhatsApp
                </label>

                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={e =>
                    updateSetting(
                      'whatsapp',
                      e.target.value
                    )
                  }
                  placeholder="+880..."
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* NOTIFICATIONS */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <Bell size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Notifications
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Manage store notification preferences.
            </p>

          </div>

        </div>


        <label className="flex items-center justify-between gap-4 cursor-pointer">

          <div>

            <p className="text-sm font-medium">
              New Order Notifications
            </p>

            <p className="text-xs text-v-gray mt-1">
              Receive notifications when a new order is placed.
            </p>

          </div>

          <input
            type="checkbox"
            checked={
              settings.orderNotifications
            }
            onChange={e =>
              updateSetting(
                'orderNotifications',
                e.target.checked
              )
            }
            className="w-4 h-4"
          />

        </label>

      </div>


      {/* SECURITY */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
            <Shield size={17} />
          </div>

          <div>

            <h2 className="text-sm font-medium">
              Security
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Authentication will be connected later.
            </p>

          </div>

        </div>


        <div className="p-4 bg-gray-50 border border-gray-100">

          <p className="text-xs text-gray-500">
            Authentication, admin access levels and password
            management will be connected with the database
            and authentication system later.
          </p>

        </div>

      </div>


      {/* SAVE */}

      <div className="flex items-center justify-end gap-4 pb-10">

        {saved && (

          <span className="text-xs text-green-600">
            Settings saved successfully
          </span>

        )}

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 bg-v-black text-white px-6 py-3 text-xs tracking-wider hover:opacity-90"
        >

          <Save size={15} />

          Save Settings

        </button>

      </div>

    </div>

  )
}
