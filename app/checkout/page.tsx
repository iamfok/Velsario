'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', district: '', notes: '',
    payment: 'cod'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Send to Google Sheet via Apps Script
      await fetch('https://script.google.com/macros/s/AKfycbxSOXG2YDG_O8QXIrVdEcXJ1uWDY8sdDZyYkqYtkh9sPFPv9dT8Hiqit-7sRtEZv5c/exec', {
        method: 'POST',
        body: JSON.stringify({
          action: 'saveOrder',
          customerName: `${form.firstName} ${form.lastName}`,
          customerId: form.email,
          productCode: items.map(i => i.id).join(', '),
          size: items.map(i => i.size).join(', '),
          color: items.map(i => i.color).join(', '),
          price: total,
          quantity: items.reduce((s, i) => s + i.quantity, 0),
          phone: form.phone,
          address: `${form.address}, ${form.city}, ${form.district}`,
        })
      })
      clearCart()
      router.push('/order-success')
    } catch (e) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="px-4 md:px-8 py-8 border-b border-v-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">Almost there</p>
          <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Contact */}
              <div>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-6 pb-3 border-b border-v-border">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">First Name *</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Last Name *</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className="input-field" placeholder="01XXXXXXXXX" />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-6 pb-3 border-b border-v-border">
                  Delivery Address
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Full Address *</label>
                    <input name="address" value={form.address} onChange={handleChange} required className="input-field" placeholder="House, Road, Area" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">City *</label>
                      <input name="city" value={form.city} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">District *</label>
                      <input name="district" value={form.district} onChange={handleChange} required className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Order Notes (Optional)</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="input-field resize-none" placeholder="Any special instructions?" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-xs tracking-widest uppercase font-medium mb-6 pb-3 border-b border-v-border">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                    { value: 'bkash', label: 'bKash', desc: 'Send payment to 01XXXXXXXXX' },
                    { value: 'nagad', label: 'Nagad', desc: 'Send payment to 01XXXXXXXXX' },
                  ].map(method => (
                    <label key={method.value} className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${form.payment === method.value ? 'border-v-black' : 'border-v-border hover:border-v-gray'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={form.payment === method.value}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <p className="text-sm font-medium">{method.label}</p>
                        <p className="text-xs text-v-gray font-light">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-v-light p-6 md:p-8 sticky top-28">
                <h2 className="text-xs tracking-widest uppercase font-medium mb-6">Your Order</h2>

                <div className="flex flex-col gap-4 mb-6">
                  {items.map(item => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                      <div className="w-14 aspect-square bg-white flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-2">{item.name}</p>
                        <p className="text-xs text-v-gray">{item.color} / {item.size} × {item.quantity}</p>
                        <p className="text-xs font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-v-border pt-4 mb-6 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-v-gray">Subtotal</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-v-gray">Shipping</span>
                    <span className="text-v-gray">TBD</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t border-v-border mt-2">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
