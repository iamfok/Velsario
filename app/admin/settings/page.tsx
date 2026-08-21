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

  headerLogo: string
  footerLogo: string
  favicon: string

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

  headerLogo: '',
  footerLogo: '',
  favicon: '',

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

  const [saved, setSaved] =
    useState(false)

  const [loaded, setLoaded] =
    useState(false)


  /* LOAD SETTINGS */

  useEffect(() => {

    try {

      const savedSettings =
        localStorage.getItem(
          'velsario-settings'
        )

      if (savedSettings) {

        const parsed =
          JSON.parse(savedSettings)

        setSettings({
          ...defaultSettings,
          ...parsed,

          /*
           * Old settings compatibility
           * If old "logo" exists, use it
           * as the header logo.
           */
          headerLogo:
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


  /* UPDATE SETTING */

  const updateSetting = <
    K extends keyof Settings
  >(
    key: K,
    value: Settings[K]
  ) => {

    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))

    setSaved(false)

  }


  /* IMAGE UPLOAD */

  const handleImageUpload = (
    key:
      | 'headerLogo'
      | 'footerLogo'
      | 'favicon',
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


  /* REMOVE IMAGE */

  const removeImage = (
    key:
      | 'headerLogo'
      | 'footerLogo'
      | 'favicon'
  ) => {

    updateSetting(key, '')

  }


  /* ADD SOCIAL */

  const addSocial = () => {

    if (settings.socialLinks.length >= 8) {

      alert(
        'You can add maximum 8 social media accounts.'
      )

      return

    }

    const availablePlatform =
      socialPlatforms.find(
        platform =>
          !settings.socialLinks.some(
            social =>
              social.platform === platform
          )
      ) || 'Custom'

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


  /* UPDATE SOCIAL */

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


  /* DELETE SOCIAL */

  const deleteSocial = (
    id: string
  ) => {

    updateSetting(
      'socialLinks',
      settings.socialLinks.filter(
        social => social.id !== id
      )
    )

  }


  /* SAVE */

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
          Manage your store, branding, header, footer and social media.
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
              Branding
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Upload separate logos for your header and footer.
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* HEADER LOGO */}

          <div>

            <label className="block text-xs tracking-wider mb-3">
              Header Logo
            </label>

            <div className="border border-dashed border-v-border p-5">

              {settings.headerLogo ? (

                <div>

                  <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

                    <img
                      src={settings.headerLogo}
                      alt="Header logo"
                      className="max-h-24 max-w-full object-contain"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(
                        'headerLogo'
                      )
                    }
                    className="flex items-center gap-2 text-xs text-red-500"
                  >

                    <X size={13} />

                    Remove Header Logo

                  </button>

                </div>

              ) : (

                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">

                  <Upload
                    size={20}
                    className="text-gray-400 mb-3"
                  />

                  <span className="text-xs font-medium">
                    Upload Header Logo
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
                        'headerLogo',
                        e.target.files?.[0]
                      )
                    }
                  />

                </label>

              )}

            </div>

          </div>


          {/* FOOTER LOGO */}

          <div>

            <label className="block text-xs tracking-wider mb-3">
              Footer Logo
            </label>

            <div className="border border-dashed border-v-border p-5">

              {settings.footerLogo ? (

                <div>

                  <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

                    <img
                      src={settings.footerLogo}
                      alt="Footer logo"
                      className="max-h-24 max-w-full object-contain"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(
                        'footerLogo'
                      )
                    }
                    className="flex items-center gap-2 text-xs text-red-500"
                  >

                    <X size={13} />

                    Remove Footer Logo

                  </button>

                </div>

              ) : (

                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">

                  <Upload
                    size={20}
                    className="text-gray-400 mb-3"
                  />

                  <span className="text-xs font-medium">
                    Upload Footer Logo
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
                        'footerLogo',
                        e.target.files?.[0]
                      )
                    }
                  />

                </label>

              )}

            </div>

          </div>


          {/* FAVICON */}

          <div className="md:col-span-2">

            <label className="block text-xs tracking-wider mb-3">
              Favicon
            </label>

            <div className="border border-dashed border-v-border p-5 max-w-md">

              {settings.favicon ? (

                <div>

                  <div className="h-28 bg-gray-50 flex items-center justify-center overflow-hidden mb-4">

                    <img
                      src={settings.favicon}
                      alt="Favicon"
                      className="w-16 h-16 object-contain"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(
                        'favicon'
                      )
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


          {/* SHOW HEADER */}

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
              checked={
                settings.headerEnabled
              }
              onChange={e =>
                updateSetting(
                  'headerEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* SHOW LOGO */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Header Logo
              </p>

              <p className="text-xs text-v-gray mt-1">
                Display the uploaded header logo.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                settings.headerLogoEnabled
              }
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
              Manage footer content and visibility.
            </p>

          </div>

        </div>


        <div className="space-y-6">


          {/* SHOW FOOTER */}

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
              checked={
                settings.footerEnabled
              }
              onChange={e =>
                updateSetting(
                  'footerEnabled',
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

          </label>


          {/* SHOW FOOTER LOGO */}

          <label className="flex items-center justify-between gap-4 cursor-pointer">

            <div>

              <p className="text-sm font-medium">
                Show Footer Logo
              </p>

              <p className="text-xs text-v-gray mt-1">
                Display the uploaded footer logo.
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
              value={
                settings.footerText
              }
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

        </div>

      </div>


      {/* SOCIAL MEDIA */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <div className="flex items-center justify-between gap-4 mb-6">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 bg-gray-100 flex items-center justify-center">

              <MessageCircle size={17} />

            </div>

            <div>

              <h2 className="text-sm font-medium">
                Social Media
              </h2>

              <p className="text-xs text-v-gray mt-1">
                Add up to 8 social media profiles.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={addSocial}
            disabled={
              settings.socialLinks.length >= 8
            }
            className="flex items-center gap-2 bg-v-black text-white px-4 py-2 text-xs tracking-wider disabled:opacity-40"
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

            <p className="text-xs text-gray-400 mt-2">
              Click "Add Social" to add your first profile.
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


                    {/* PLATFORM */}

                    <div>

                      <label className="block text-xs text-v-gray mb-2">
                        Platform
                      </label>

                      <select
                        value={
                          social.platform
                        }
                        onChange={e =>
                          updateSocial(
                            social.id,
                            'platform',
                            e.target.value
                          )
                        }
                        className="w-full border border-v-border px-3 py-3 text-sm outline-none bg-white focus:border-black"
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

                        {!socialPlatforms.includes(
                          social.platform
                        ) && (

                          <option
                            value={
                              social.platform
                            }
                          >
                            {social.platform}
                          </option>

                        )}

                      </select>

                    </div>


                    {/* URL */}

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


                    {/* ENABLE */}

                    <label className="flex items-center gap-2 h-11 px-3 border border-v-border cursor-pointer">

                      <input
                        type="checkbox"
                        checked={
                          social.enabled
                        }
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


                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        deleteSocial(
                          social.id
                        )
                      }
                      className="h-11 w-11 border border-v-border flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50"
                      title="Remove social"
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
