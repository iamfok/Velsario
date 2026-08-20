'use client'

import { useState } from 'react'
import { Save, Store, Mail, Truck, Shield } from 'lucide-react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  const [storeName, setStoreName] = useState('VELSARIO')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [insideDhaka, setInsideDhaka] = useState('60')
  const [outsideDhaka, setOutsideDhaka] = useState('120')

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Configuration
        </p>

        <h1 className="text-2xl font-medium">
          Settings
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Manage your store settings and basic information.
        </p>

      </div>

      {/* STORE INFORMATION */}
      <div className="bg-white border border-v-border mb-6">

        <div className="px-6 py-5 border-b border-v-border flex items-center gap-3">

          <Store size={18} />

          <div>
            <h2 className="text-sm font-medium">
              Store Information
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Basic information about your store.
            </p>
          </div>

        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-xs text-v-gray mb-2">
              Store Name
            </label>

            <input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs text-v-gray mb-2">
              Contact Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs text-v-gray mb-2">
              Contact Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

        </div>

      </div>

      {/* SHIPPING */}
      <div className="bg-white border border-v-border mb-6">

        <div className="px-6 py-5 border-b border-v-border flex items-center gap-3">

          <Truck size={18} />

          <div>
            <h2 className="text-sm font-medium">
              Shipping
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Configure your delivery charges.
            </p>
          </div>

        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-xs text-v-gray mb-2">
              Inside Dhaka
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-v-gray">
                ৳
              </span>

              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(e.target.value)}
                className="w-full border border-v-border px-4 py-3 pl-9 text-sm outline-none focus:border-black"
              />

            </div>
          </div>

          <div>
            <label className="block text-xs text-v-gray mb-2">
              Outside Dhaka
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-v-gray">
                ৳
              </span>

              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(e.target.value)}
                className="w-full border border-v-border px-4 py-3 pl-9 text-sm outline-none focus:border-black"
              />

            </div>

          </div>

        </div>

      </div>

      {/* EMAIL */}
      <div className="bg-white border border-v-border mb-6">

        <div className="px-6 py-5 border-b border-v-border flex items-center gap-3">

          <Mail size={18} />

          <div>
            <h2 className="text-sm font-medium">
              Notifications
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Email notification settings.
            </p>
          </div>

        </div>

        <div className="p-6">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4"
            />

            <span className="text-sm">
              Receive new order notifications
            </span>

          </label>

        </div>

      </div>

      {/* SECURITY */}
      <div className="bg-white border border-v-border mb-6">

        <div className="px-6 py-5 border-b border-v-border flex items-center gap-3">

          <Shield size={18} />

          <div>
            <h2 className="text-sm font-medium">
              Security
            </h2>

            <p className="text-xs text-v-gray mt-1">
              Admin access and security settings.
            </p>
          </div>

        </div>

        <div className="p-6">

          <p className="text-sm text-v-gray">
            Role-based admin access will be connected here later.
          </p>

        </div>

      </div>

      {/* SAVE */}
      <div className="flex items-center justify-end gap-4">

        {saved && (
          <span className="text-xs text-green-600">
            Settings saved
          </span>
        )}

        <button
          onClick={handleSave}
          className="bg-v-black text-white px-6 py-3 text-xs tracking-wider flex items-center gap-2 hover:opacity-90"
        >
          <Save size={14} />
          Save Settings
        </button>

      </div>

    </div>
  )
}
