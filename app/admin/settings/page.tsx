'use client'

import { useState } from 'react'
import { Save, Store, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('VELSARIO')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [currency, setCurrency] = useState('BDT')
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="max-w-4xl">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Configuration
        </p>

        <h1 className="text-2xl font-medium">
          Settings
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Manage your store and admin settings.
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
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Currency
            </label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880..."
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

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
            checked={orderNotifications}
            onChange={(e) => setOrderNotifications(e.target.checked)}
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
              Admin security settings will be connected later.
            </p>

          </div>

        </div>

        <div className="p-4 bg-gray-50 border border-gray-100">

          <p className="text-xs text-gray-500">
            Authentication, access levels and password management
            will be connected when the database and authentication
            system are added.
          </p>

        </div>

      </div>

      {/* SAVE */}
      <div className="flex items-center justify-end gap-4">

        {saved && (
          <span className="text-xs text-green-600">
            Settings saved successfully
          </span>
        )}

        <button
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
