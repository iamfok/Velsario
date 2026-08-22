'use client'

export type AdminPageItem = {
  id: string
  name: string
  path: string
  type: 'system' | 'category' | 'custom'
  description?: string
}

export type CustomPage = {
  id: string
  name: string
  slug: string
  description: string
  content: string
  status: 'Active' | 'Inactive'
  heroBannerId?: string
  menuLabel?: string
  headerMenu: boolean
  footerMenu: boolean
  createdAt: string
  updatedAt: string
}

export const CUSTOM_PAGES_STORAGE_KEY = 'velsario-custom-pages'

export const SYSTEM_PAGES: AdminPageItem[] = [
  {
    id: 'home',
    name: 'Homepage',
    path: '/',
    type: 'system',
    description: 'Main storefront homepage',
  },
  {
    id: 'shop',
    name: 'Shop',
    path: '/shop',
    type: 'system',
    description: 'Products and shopping page',
  },
  {
    id: 'about',
    name: 'About',
    path: '/about',
    type: 'system',
    description: 'About Velsario',
  },
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact',
    type: 'system',
    description: 'Customer contact page',
  },
  {
    id: 'cart',
    name: 'Cart',
    path: '/cart',
    type: 'system',
    description: 'Shopping cart',
  },
  {
    id: 'checkout',
    name: 'Checkout',
    path: '/checkout',
    type: 'system',
    description: 'Checkout page',
  },
  {
    id: 'order-success',
    name: 'Order Success',
    path: '/order-success',
    type: 'system',
    description: 'Successful order page',
  },
  {
    id: 'privacy-policy',
    name: 'Privacy Policy',
    path: '/privacy-policy',
    type: 'system',
    description: 'Privacy policy',
  },
  {
    id: 'refund-returns',
    name: 'Refund & Returns',
    path: '/refund-returns',
    type: 'system',
    description: 'Refund and returns policy',
  },
]

export function getCategoriesForAdmin(): AdminPageItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem('velsario-categories')
    const categories = JSON.parse(raw || '[]')

    if (!Array.isArray(categories)) return []

    return categories
      .filter((category) => category?.status !== 'Inactive')
      .map((category) => ({
        id: `category-${category.id}`,
        name: category.name,
        path: `/shop?category=${category.slug}`,
        type: 'category' as const,
        description: 'Product category',
      }))
  } catch {
    return []
  }
}

export function getCustomPages(): CustomPage[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(CUSTOM_PAGES_STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCustomPages(pages: CustomPage[]) {
  if (typeof window === 'undefined') return

  localStorage.setItem(
    CUSTOM_PAGES_STORAGE_KEY,
    JSON.stringify(pages)
  )

  window.dispatchEvent(
    new CustomEvent('velsario-pages-updated')
  )
}

export function getAllAdminPages(): AdminPageItem[] {
  const categories = getCategoriesForAdmin()

  const customPages = getCustomPages().map((page) => ({
    id: page.id,
    name: page.name,
    path: `/pages/${page.slug}`,
    type: 'custom' as const,
    description: page.description || 'Custom website page',
  }))

  return [
    ...SYSTEM_PAGES,
    ...categories,
    ...customPages,
  ]
}

export function createCustomPage(
  page: CustomPage
) {
  const pages = getCustomPages()

  saveCustomPages([
    ...pages.filter((item) => item.id !== page.id),
    page,
  ])
}

export function deleteCustomPage(id: string) {
  saveCustomPages(
    getCustomPages().filter((page) => page.id !== id)
  )
}
