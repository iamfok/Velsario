export type MediaType = 'Image' | 'Video'

export type MediaItem = {
  id: string
  name: string
  url: string
  type: MediaType
  size?: number
  width?: number
  height?: number
  createdAt: string
}

export const MEDIA_STORAGE_KEY = 'velsario-media'

export function getMedia(): MediaItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveMedia(items: MediaItem[]) {
  if (typeof window === 'undefined') return

  localStorage.setItem(
    MEDIA_STORAGE_KEY,
    JSON.stringify(items)
  )

  window.dispatchEvent(
    new CustomEvent('velsario-media-updated')
  )
}

export function addMedia(item: MediaItem) {
  saveMedia([item, ...getMedia()])
}

export function updateMedia(
  id: string,
  changes: Partial<MediaItem>
) {
  const updated = getMedia().map((item) =>
    item.id === id
      ? {
          ...item,
          ...changes,
        }
      : item
  )

  saveMedia(updated)
}

export function deleteMedia(id: string) {
  saveMedia(
    getMedia().filter((item) => item.id !== id)
  )
}

export function getMediaById(id: string) {
  return getMedia().find((item) => item.id === id)
}
