export type BannerPosition =
  | 'Homepage Hero'
  | 'Homepage Secondary'
  | 'Shop Banner'
  | 'Category Banner'
  | 'Homepage Bottom'

export type BannerType = 'image' | 'video'

export type Banner = {
  id: string
  title: string
  type: BannerType

  desktopImage: string
  mobileImage?: string
  videoUrl?: string

  position: BannerPosition

  heading?: string
  subheading?: string

  buttonText?: string
  buttonUrl?: string

  status: 'Active' | 'Inactive'

  order: number

  startDate?: string
  endDate?: string
}

export const banners: Banner[] = [
  {
    id: 'BAN-001',
    title: 'Main Hero Banner',
    type: 'image',

    desktopImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg',

    mobileImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg',

    position: 'Homepage Hero',

    heading: 'Effortlessly blend comfort & style',

    subheading:
      'Premium formal wear for men and women — crafted in pure black & white.',

    buttonText: 'Explore the Collection',
    buttonUrl: '/shop',

    status: 'Active',
    order: 1,
  },

  {
    id: 'BAN-002',
    title: 'Collection Banner',
    type: 'image',

    desktopImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg',

    mobileImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg',

    position: 'Homepage Secondary',

    heading: 'Explore our exquisite Collection now!',

    subheading: 'Discover the latest Velsario collection.',

    buttonText: 'View Collection',
    buttonUrl: '/shop',

    status: 'Active',
    order: 1,
  },

  {
    id: 'BAN-003',
    title: 'Fashion Banner',
    type: 'image',

    desktopImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM-2.jpeg',

    mobileImage:
      'https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM-2.jpeg',

    position: 'Homepage Bottom',

    heading: 'Discover the allure of fashion reinvented!',

    subheading:
      'Dive into a world of style with our latest collection!',

    buttonText: 'Shop Now',
    buttonUrl: '/shop',

    status: 'Active',
    order: 1,
  },
]

export function getActiveBanners(position?: BannerPosition) {
  const now = new Date()

  return banners
    .filter((banner) => {
      if (banner.status !== 'Active') return false

      if (position && banner.position !== position) {
        return false
      }

      if (banner.startDate) {
        const start = new Date(banner.startDate)

        if (now < start) return false
      }

      if (banner.endDate) {
        const end = new Date(banner.endDate)

        if (now > end) return false
      }

      return true
    })
    .sort((a, b) => a.order - b.order)
}
