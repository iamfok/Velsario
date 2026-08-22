export type BannerType = 'image' | 'video'
export type BannerStatus = 'Active' | 'Inactive'

export type BannerPosition =
  | 'Homepage Hero'
  | 'Homepage Secondary'
  | 'Homepage Bottom'
  | 'Page Hero'

export type Banner = {
  id: string
  title: string
  type: BannerType
  desktopImage: string
  mobileImage?: string
  videoUrl?: string
  position: string
  status: BannerStatus

  // Page targeting for Global Page Hero.
  // '' means this banner can be used as the global fallback.
  pagePath?: string

  heading?: string
  subheading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  createdAt?: string
}

export const BANNERS_STORAGE_KEY = 'velsario-banners'

export function getBanners(): Banner[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(BANNERS_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.map((item: any) => ({
      ...item,
      position: item.position || 'Homepage Hero',
      status:
        item.status === 'Inactive'
          ? 'Inactive'
          : 'Active',
      pagePath: item.pagePath || '',
    })) as Banner[]
  } catch {
    return []
  }
}

export function getActiveBanners(position?: string): Banner[] {
  return getBanners().filter((banner) => {
    const active = banner.status === 'Active'
    return active && (!position || banner.position === position)
  })
}

export function getPageHeroBanners(): Banner[] {
  return getActiveBanners('Page Hero')
}

function normalizePath(path: string) {
  const value = (path || '/').trim()

  if (!value) return '/'
  if (value === '/') return '/'

  return value.endsWith('/')
    ? value.slice(0, -1)
    : value
}

export function getPageHeroBanner(pathname: string): Banner | null {
  const banners = getPageHeroBanners()

  const currentPath = normalizePath(pathname)

  // 1. Exact page match wins.
  const exact = banners.find(
    (banner) =>
      normalizePath(banner.pagePath || '') === currentPath
  )

  if (exact) return exact

  // 2. A banner with no pagePath is the global fallback.
  const fallback = banners.find(
    (banner) => !(banner.pagePath || '').trim()
  )

  return fallback || null
}

export function saveBanners(banners: Banner[]) {
  if (typeof window === 'undefined') return

  localStorage.setItem(
    BANNERS_STORAGE_KEY,
    JSON.stringify(banners)
  )

  window.dispatchEvent(
    new CustomEvent('velsario-banners-updated')
  )
}

export function upsertBanner(banner: Banner) {
  const banners = getBanners()
  const index = banners.findIndex(
    (item) => item.id === banner.id
  )

  if (index === -1) {
    saveBanners([...banners, banner])
    return
  }

  const updated = [...banners]
  updated[index] = banner
  saveBanners(updated)
}

export function deleteBanner(id: string) {
  saveBanners(
    getBanners().filter((banner) => banner.id !== id)
  )
}

export function toggleBannerStatus(id: string) {
  saveBanners(
    getBanners().map((banner) =>
      banner.id === id
        ? {
            ...banner,
            status:
              banner.status === 'Active'
                ? 'Inactive'
                : 'Active',
          }
        : banner
    )
  )
}
