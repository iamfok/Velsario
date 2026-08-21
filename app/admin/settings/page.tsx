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
  Plus,
  Trash2,
  MessageCircle,
} from 'lucide-react'

type SocialLink = {
  id: string
  platform: string
  url: string
  enabled: boolean
}

type Settings = {
  storeName: string
  email: string
  phone: string
  currency: string

  headerLogoWhite: string
  headerLogoBlack: string
  footerLogo: string
  favicon: string

  headerLogoWhiteWidth: number
  headerLogoWhiteHeight: number
  headerLogoBlackWidth: number
  headerLogoBlackHeight: number
  footerLogoWidth: number
  footerLogoHeight: number
  faviconSize: number

  announcementEnabled: boolean
  announcementText: string

  headerEnabled: boolean
  headerLogoEnabled: boolean

  footerEnabled: boolean
  footerLogoEnabled: boolean
  footerText: string
  footerCopyright: string

  socialLinks: SocialLink[]

  orderNotifications: boolean
}

const defaultSettings: Settings = {
  storeName: 'VELSARIO',
  email: '',
  phone: '',
  currency: 'BDT',

  headerLogoWhite: '',
  headerLogoBlack: '',
  footerLogo: '',
  favicon: '',

  headerLogoWhiteWidth: 150,
  headerLogoWhiteHeight: 45,

  headerLogoBlackWidth: 150,
  headerLogoBlackHeight: 45,

  footerLogoWidth: 190,
  footerLogoHeight: 55,

  faviconSize: 32,

  announcementEnabled: false,
  announcementText: '',

  headerEnabled: true,
  headerLogoEnabled: true,

  footerEnabled: true,
  footerLogoEnabled: true,

  footerText:
    'Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.',

  footerCopyright:
    '© 2026 VELSARIO | All Rights Reserved',

  socialLinks: [],

  orderNotifications: true,
}

const socialPlatforms = [
  'Facebook',
  'Instagram',
  'WhatsApp',
  'YouTube',
  'TikTok',
  'X / Twitter',
  'LinkedIn',
  'Telegram',
]

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(defaultSettings)

  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedSettings =
        localStorage.getItem('velsario-settings')

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)

        setSettings({
          ...defaultSettings,
          ...parsed,

          headerLogoWhite:
            parsed.headerLogoWhite ||
            parsed.headerLogo ||
            parsed.logo ||
            '',

          headerLogoBlack:
            parsed.headerLogoBlack ||
            parsed.headerLogo ||
            parsed.logo ||
            '',

          footerLogo:
            parsed.footerLogo ||
            parsed.logo ||
            '',

          socialLinks:
            Array.isArray(parsed.socialLinks)
              ? parsed.socialLinks
              : [],
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
    key:
      | 'headerLogoWhite'
      | 'headerLogoBlack'
      | 'footerLogo'
      | 'favicon',
    file?: File
  ) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
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
    key:
      | 'headerLogoWhite'
      | 'headerLogoBlack'
      | 'footerLogo'
      | 'favicon'
  ) => {
    updateSetting(key, '')
  }

  const addSocial = () => {
    if (settings.socialLinks.length >= 8) {
      alert('You can add maximum 8 social media accounts.')
      return
    }

    const availablePlatform =
      socialPlatforms.find(
        platform =>
          !settings.socialLinks.some(
            social =>
              social.platform === platform
          )
      ) || 'Facebook'

    const newSocial: SocialLink = {
      id: Date.now().toString(),
      platform: availablePlatform,
      url: '',
      enabled: true,
    }

    updateSetting(
      'socialLinks',
      [
        ...settings.socialLinks,
        newSocial,
      ]
    )
  }

  const updateSocial = (
    id: string,
    key: keyof SocialLink,
    value: string | boolean
  ) => {
    updateSetting(
      'socialLinks',
      settings.socialLinks.map(
        social =>
          social.id === id
            ? {
                ...social,
                [key]: value,
              }
            : social
      )
    )
  }

  const deleteSocial = (id: string) => {
    updateSetting(
      'socialLinks',
      settings.socialLinks.filter(
        social => social.id !== id
      )
    )
  }

  const handleSave = () => {
    try {
      localStorage.setItem(
        'velsario-settings',
        JSON.stringify(settings)
      )

      setSaved(true)

      window.dispatchEvent(
        new Event('velsario-settings-updated')
      )

      setTimeout(() => {
        setSaved(false)
      }, 2500)
    } catch {
      alert(
        'Unable to save settings. Your uploaded files may be too large.'
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
          Manage your store, branding, header, footer and social media.
        </p>
      </div>


      {/* STORE */}

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

          <div>
            <label className="block text-xs tracking-wider mb-2">
              Store Name
            </label>

            <input
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
              <option value="BDT">BDT (৳)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

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
              Brand Assets
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Manage separate logos and favicon.
            </p>
          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* WHITE LOGO */}

          <BrandAsset
            title="Header Logo — White"
            value={settings.headerLogoWhite}
            onRemove={() =>
              removeImage('headerLogoWhite')
            }
            onUpload={file =>
              handleImageUpload(
                'headerLogoWhite',
                file
              )
            }
          />

          {/* BLACK LOGO */}

          <BrandAsset
            title="Header Logo — Black"
            value={settings.headerLogoBlack}
            onRemove={() =>
              removeImage('headerLogoBlack')
            }
            onUpload={file =>
              handleImageUpload(
                'headerLogoBlack',
                file
              )
            }
          />

          {/* FOOTER LOGO */}

          <BrandAsset
            title="Footer Logo"
            value={settings.footerLogo}
            onRemove={() =>
              removeImage('footerLogo')
            }
            onUpload={file =>
              handleImageUpload(
                'footerLogo',
                file
              )
            }
          />

          {/* FAVICON */}

          <BrandAsset
            title="Favicon"
            value={settings.favicon}
            onRemove={() =>
              removeImage('favicon')
            }
            onUpload={file =>
              handleImageUpload(
                'favicon',
                file
              )
            }
            favicon
          />

        </div>


        {/* SIZE SETTINGS */}

        <div className="border-t border-v-border mt-8 pt-8">

          <p className="text-xs tracking-widest uppercase font-medium mb-5">
            Asset Size
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <SizeInput
              label="White Logo Width"
              value={settings.headerLogoWhiteWidth}
              onChange={value =>
                updateSetting(
                  'headerLogoWhiteWidth',
                  value
                )
              }
            />

            <SizeInput
              label="Black Logo Width"
              value={settings.headerLogoBlackWidth}
              onChange={value =>
                updateSetting(
                  'headerLogoBlackWidth',
                  value
                )
              }
            />

            <SizeInput
              label="Footer Logo Width"
              value={settings.footerLogoWidth}
              onChange={value =>
                updateSetting(
                  'footerLogoWidth',
                  value
                )
              }
            />

            <SizeInput
              label="Favicon Size"
              value={settings.faviconSize}
              onChange={value =>
                updateSetting(
                  'faviconSize',
                  value
                )
              }
            />

          </div>

          <p className="text-[11px] text-gray-400 mt-4">
            Logo height automatically preserves the original image ratio.
            Favicon uses the selected pixel size.
          </p>

        </div>

      </div>


      {/* HEADER */}

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

          <Toggle
            title="Show Header"
            description="Show or hide the main website header."
            checked={settings.headerEnabled}
            onChange={value =>
              updateSetting(
                'headerEnabled',
                value
              )
            }
          />

          <Toggle
            title="Show Header Logo"
            description="Display the uploaded header logos."
            checked={settings.headerLogoEnabled}
            onChange={value =>
              updateSetting(
                'headerLogoEnabled',
                value
              )
            }
          />

          <div className="border-t border-v-border pt-5">

            <Toggle
              title="Announcement Bar"
              description="Show a promotional message above the header."
              checked={settings.announcementEnabled}
              onChange={value =>
                updateSetting(
                  'announcementEnabled',
                  value
                )
              }
            />

            <input
              value={settings.announcementText}
              onChange={e =>
                updateSetting(
                  'announcementText',
                  e.target.value
                )
              }
              placeholder="Free delivery inside Dhaka"
              className="w-full mt-4 border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

        </div>
      </div>


      {/* FOOTER */}

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
              Manage footer content and visibility.
            </p>
          </div>

        </div>

        <div className="space-y-6">

          <Toggle
            title="Show Footer"
            description="Show or hide the website footer."
            checked={settings.footerEnabled}
            onChange={value =>
              updateSetting(
                'footerEnabled',
                value
              )
            }
          />

          <Toggle
            title="Show Footer Logo"
            description="Display the uploaded footer logo."
            checked={settings.footerLogoEnabled}
            onChange={value =>
              updateSetting(
                'footerLogoEnabled',
                value
              )
            }
          />

          <div>
            <label className="block text-xs tracking-wider mb-2">
              Footer Description
            </label>

            <textarea
              value={settings.footerText}
              onChange={e =>
                updateSetting(
                  'footerText',
                  e.target.value
                )
              }
              rows={3}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-2">
              Copyright Text
            </label>

            <input
              value={settings.footerCopyright}
              onChange={e =>
                updateSetting(
                  'footerCopyright',
                  e.target.value
                )
              }
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

        </div>
      </div>


      {/* SOCIAL MEDIA */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">
              <MessageCircle size={17} />
            </div>

            <div>
              <h2 className="text-sm font-medium">
                Social Media
              </h2>

              <p className="text-xs text-v-gray mt-1">
                Add up to 8 profiles. Only active profiles appear on the website.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={addSocial}
            disabled={settings.socialLinks.length >= 8}
            className="flex items-center justify-center gap-2 bg-v-black text-white px-4 py-2 text-xs tracking-wider disabled:opacity-40"
          >
            <Plus size={14} />
            Add Social
          </button>

        </div>

        {settings.socialLinks.length === 0 ? (

          <div className="border border-dashed border-v-border py-10 text-center">
            <p className="text-sm text-v-gray">
              No social media accounts added.
            </p>
          </div>

        ) : (

          <div className="space-y-4">

            {settings.socialLinks.map(
              (social, index) => (

                <div
                  key={social.id}
                  className="border border-v-border p-4"
                >

                  <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto_auto] gap-3 items-end">

                    <div>
                      <label className="block text-xs text-v-gray mb-2">
                        Platform
                      </label>

                      <select
                        value={social.platform}
                        onChange={e =>
                          updateSocial(
                            social.id,
                            'platform',
                            e.target.value
                          )
                        }
                        className="w-full border border-v-border px-3 py-3 text-sm outline-none bg-white"
                      >

                        {socialPlatforms.map(
                          platform => (
                            <option
                              key={platform}
                              value={platform}
                            >
                              {platform}
                            </option>
                          )
                        )}

                      </select>
                    </div>


                    <div>
                      <label className="block text-xs text-v-gray mb-2">
                        Profile URL
                      </label>

                      <input
                        type="url"
                        value={social.url}
                        onChange={e =>
                          updateSocial(
                            social.id,
                            'url',
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="w-full border border-v-border px-3 py-3 text-sm outline-none focus:border-black"
                      />
                    </div>


                    <label className="flex items-center gap-2 h-11 px-3 border border-v-border cursor-pointer">
                      <input
                        type="checkbox"
                        checked={social.enabled}
                        onChange={e =>
                          updateSocial(
                            social.id,
                            'enabled',
                            e.target.checked
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span className="text-xs">
                        Active
                      </span>
                    </label>


                    <button
                      type="button"
                      onClick={() =>
                        deleteSocial(
                          social.id
                        )
                      }
                      className="h-11 w-11 border border-v-border flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                  <p className="text-[11px] text-gray-400 mt-3">
                    Social #{index + 1}
                  </p>

                </div>
              )
            )}

          </div>
        )}

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

        <Toggle
          title="New Order Notifications"
          description="Receive notifications when a new order is placed."
          checked={settings.orderNotifications}
          onChange={value =>
            updateSetting(
              'orderNotifications',
              value
            )
          }
        />

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

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pb-10">

        {saved && (
          <span className="text-xs text-green-600">
            Settings saved successfully
          </span>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-v-black text-white px-6 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Save size={15} />
          Save Settings
        </button>

      </div>

    </div>
  )
}


/* =========================================================
   COMPONENTS
========================================================= */

function Toggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="text-xs text-v-gray mt-1">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={e =>
          onChange(e.target.checked)
        }
        className="w-4 h-4 flex-shrink-0"
      />
    </label>
  )
}


function SizeInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div>
      <label className="block text-xs text-v-gray mb-2">
        {label}
      </label>

      <div className="flex items-center border border-v-border">
        <input
          type="number"
          min={10}
          max={600}
          value={value}
          onChange={e =>
            onChange(
              Math.max(
                10,
                Number(e.target.value)
              )
            )
          }
          className="w-full px-3 py-3 text-sm outline-none"
        />

        <span className="px-3 text-xs text-gray-400">
          px
        </span>
      </div>
    </div>
  )
}


function BrandAsset({
  title,
  value,
  onUpload,
  onRemove,
  favicon = false,
}: {
  title: string
  value: string
  onUpload: (file?: File) => void
  onRemove: () => void
  favicon?: boolean
}) {
  return (
    <div>

      <label className="block text-xs tracking-wider mb-3">
        {title}
      </label>

      <div className="border border-dashed border-v-border p-5">

        {value ? (

          <div>

            <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

              <img
                src={value}
                alt={title}
                className={
                  favicon
                    ? 'w-16 h-16 object-contain'
                    : 'max-h-24 max-w-full object-contain'
                }
              />

            </div>

            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-2 text-xs text-red-500"
            >
              <X size={13} />
              Remove
            </button>

          </div>

        ) : (

          <label className="flex flex-col items-center justify-center py-8 cursor-pointer">

            <Upload
              size={20}
              className="text-gray-400 mb-3"
            />

            <span className="text-xs font-medium">
              Upload {title}
            </span>

            <span className="text-xs text-gray-400 mt-1">
              PNG, JPG, WEBP
            </span>

            <input
              type="file"
              accept="image/*,.ico"
              className="hidden"
              onChange={e =>
                onUpload(
                  e.target.files?.[0]
                )
              }
            />

          </label>

        )}

      </div>

    </div>
  )
}
