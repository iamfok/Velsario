'use client'

import { useState } from 'react'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-20">

      <div className="bg-v-black text-v-white py-20 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label text-gray-500 mb-6">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <p className="section-label mb-8">Reach Out</p>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase mb-3">WhatsApp</h3>
                <a href="https://api.whatsapp.com/send?phone=8801825134723"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-v-gray hover:text-v-black transition-colors group">
                  <MessageCircle size={18} className="group-hover:text-green-500 transition-colors" />
                  <span className="font-light">+880 1825 134723</span>
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase mb-3">Social Media</h3>
                <div className="flex flex-col gap-3">
                  <a href="https://www.facebook.com/velsarioofficial" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-v-gray hover:text-v-black transition-colors">
                    <Facebook size={18} />
                    <span className="font-light">@velsarioofficial</span>
                  </a>
                  <a href="https://www.instagram.com/velsarioofficials/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-v-gray hover:text-v-black transition-colors">
                    <Instagram size={18} />
                    <span className="font-light">@velsarioofficials</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase mb-3">Business Hours</h3>
                <p className="text-v-gray font-light text-sm leading-relaxed">
                  Saturday – Thursday: 10:00 AM – 8:00 PM<br />
                  Friday: 2:00 PM – 8:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-v-light p-10 text-center">
                <p className="font-display text-3xl mb-4">Thank you!</p>
                <p className="text-v-gray font-light">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Name *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Subject</label>
                  <input
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-v-gray block mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required rows={6} className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary self-start px-12">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
