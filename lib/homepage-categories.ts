export type HomeCategoryCard = {
  id: string
  name: string
  image: string
  slug: string
  filter: string
}

export const HOME_CATEGORY_STORAGE_KEY = 'velsario-home-category-cards'

export const defaultHomeCategories: HomeCategoryCard[] = [
  { id: 'men-shirt', name: "Men's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'men-shirt' },
  { id: 'men-pants', name: "Men's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-pants-700x1024.jpg', slug: 'velsario-pants', filter: '' },
  { id: 'men-accessories', name: 'Accessories', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-m-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
  { id: 'men-evening', name: 'Evening Dresses', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Eve-700x1024.jpg', slug: 'evening-dresses', filter: '' },
  { id: 'women-shirt', name: "Women's Shirt", image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-shirt-700x1024.jpg', slug: 'velsario-shirt', filter: 'ladies-shirt' },
  { id: 'women-pants', name: "Women's Pants", image: 'https://velsario.com/wp-content/uploads/2026/03/Untitled-1-700x1024.jpg', slug: 'velsario-pants', filter: '' },
  { id: 'women-accessories', name: 'Accessories', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-Acc-700x1024.jpg', slug: 'accessories', filter: '' },
  { id: 'women-evening', name: 'Evening Wear', image: 'https://velsario.com/wp-content/uploads/2026/03/menu-w-even-700x1024.jpg', slug: 'evening-dresses', filter: '' },
]

export function getHomeCategoryCards(): HomeCategoryCard[] {
  if (typeof window === 'undefined') return defaultHomeCategories
  try {
    const saved = JSON.parse(localStorage.getItem(HOME_CATEGORY_STORAGE_KEY) || 'null')
    if (!Array.isArray(saved)) return defaultHomeCategories
    return defaultHomeCategories.map((fallback) => {
      const item = saved.find((x: any) => x?.id === fallback.id)
      return item ? { ...fallback, ...item, image: item.image || fallback.image } : fallback
    })
  } catch {
    return defaultHomeCategories
  }
}

export function saveHomeCategoryCards(cards: HomeCategoryCard[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(HOME_CATEGORY_STORAGE_KEY, JSON.stringify(cards))
  window.dispatchEvent(new CustomEvent('velsario-home-categories-updated'))
}
