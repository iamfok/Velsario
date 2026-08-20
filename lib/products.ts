export interface Product {
  id: string
  name: string
  price: number
  category: string
  subcategory: string
  colors: string[]
  sizes: string[]
  images: string[]
  description: string
  features: string[]
  inStock: boolean
  badge?: string
}

export const categories = [
  { id: 'shirt', name: 'Velsario Shirt', slug: 'velsario-shirt' },
  { id: 'pants', name: 'Velsario Pants', slug: 'velsario-pants' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'evening-dresses', name: 'Evening Dresses', slug: 'evening-dresses' },
  { id: 'activewear', name: 'Activewear', slug: 'activewear' },
]

// Replace image URLs with your actual product images from Google Drive or Hostinger
export const products: Product[] = [
  {
    id: 'ladies-black-formal-shirt',
    name: 'Velsario Ladies Black Formal Shirt — Premium Slim Fit',
    price: 500,
    category: 'shirt',
    subcategory: 'ladies-shirt',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://velsario.com/wp-content/uploads/2026/05/Velsario-Shirt-2-300x300.png',
    ],
    description: 'Effortlessly blend comfort and style with our Premium Slim Fit Ladies Formal Shirt. Crafted in pure black, built for those who value presence, precision, and timeless style.',
    features: ['Premium fabric', 'Slim fit', 'Formal wear', 'Machine washable'],
    inStock: true,
    badge: 'HOT',
  },
  {
    id: 'mens-white-oxford-shirt',
    name: "Velsario Men's White Oxford Formal Shirt — Button-Down Collar",
    price: 1000,
    category: 'shirt',
    subcategory: 'men-shirt',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://velsario.com/wp-content/uploads/2026/05/Velsario-Shirt-3-300x300.png',
    ],
    description: 'A classic Oxford formal shirt with button-down collar. Premium quality white fabric that commands attention in any professional setting.',
    features: ['Oxford weave', 'Button-down collar', 'Regular fit', 'Premium cotton'],
    inStock: true,
    badge: 'HOT',
  },
  {
    id: 'mens-white-textured-shirt',
    name: "Men's White Textured Formal Shirt — Premium Remi Cotton",
    price: 800,
    category: 'shirt',
    subcategory: 'men-shirt',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://velsario.com/wp-content/uploads/2026/05/Velsario-Shirt-1-300x300.png',
    ],
    description: 'Experience luxury with our Premium Remi Cotton textured formal shirt. Subtle texture adds depth while maintaining a sophisticated, professional appearance.',
    features: ['Remi Cotton', 'Textured weave', 'Classic fit', 'Wrinkle resistant'],
    inStock: true,
    badge: 'HOT',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}
