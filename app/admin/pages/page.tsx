'use client'

import { FileText, ExternalLink } from 'lucide-react'

const pages = [
  {
    name: 'Home',
    path: '/',
    description: 'Main storefront homepage',
  },
  {
    name: 'Shop',
    path: '/main/shop',
    description: 'All products and shopping page',
  },
  {
    name: 'About',
    path: '/about',
    description: 'About Velsario',
  },
  {
    name: 'Contact',
    path: '/contact',
    description: 'Customer contact page',
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
    description: 'Privacy policy',
  },
  {
    name: 'Refund & Returns',
    path: '/refund-returns',
    description: 'Refund and returns policy',
  },
]

export default function AdminPagesPage() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Website
        </p>

        <h1 className="text-2xl font-medium">
          Pages
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Manage and access your website pages.
        </p>
      </div>

      {/* PAGES */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="grid grid-cols-1">

          {pages.map((page) => (

            <div
              key={page.path}
              className="flex items-center justify-between gap-4 px-6 py-5 border-b border-v-border last:border-0 hover:bg-v-light transition-colors"
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {page.name}
                  </p>

                  <p className="text-xs text-v-gray mt-1">
                    {page.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {page.path}
                  </p>
                </div>

              </div>

              <a
                href={page.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border border-v-border text-xs hover:bg-v-black hover:text-white transition-colors"
              >
                <ExternalLink size={13} />
                View
              </a>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}
