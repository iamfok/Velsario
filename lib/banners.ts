export type BannerType = 'image' | 'video'
export type BannerStatus = 'Active' | 'Inactive'

export type Banner = {
  id: string
  title: string
  type: BannerType
  desktopImage: string
  mobileImage?: string
  videoUrl?: string
  position: string
  status: BannerStatus

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
    return Array.isArray(parsed) ? parsed : []
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
  const index = banners.findIndex((item) => item.id === banner.id)

  if (index === -1) {
    saveBanners([...banners, banner])
    return
  }

  const updated = [...banners]
  updated[index] = banner
  saveBanners(updated)
}

export function deleteBanner(id: string) {
  saveBanners(getBanners().filter((banner) => banner.id !== id))
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
