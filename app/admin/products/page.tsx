'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  Star,
} from 'lucide-react'
import { products as defaultProducts } from '@/lib/products'

type Variant = {
  color: string
  size: string
  stock: number
}

type AdminProduct = {
  id: string
  name: string
  price: number
  salePrice?: number | null
  category: string
  sku?: string
  images: string[]
  featuredImage?: string
  additionalImages?: string[]
  variants?: Variant[]
  stock: number
  inStock: boolean
  featured?: boolean
}

export default function AdminProductsPage() {

  const [search, setSearch] = useState('')
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([])

  const loadProducts = () => {

    const savedProducts = JSON.parse(
      localStorage.getItem('velsario-products') || '[]'
    )

    const savedFormatted: AdminProduct[] =
      savedProducts.map((product: any) => {

        const variants: Variant[] =
          product.variants || []

        const variantStock = variants.reduce(
          (total, variant) =>
            total + Number(variant.stock || 0),
          0
        )

        const images =
          product.images?.length
            ? product.images
            : product.featuredImage
              ? [
                  product.featuredImage,
                  ...(product.additionalImages || []),
                ]
              : product.image
                ? [product.image]
                : []

        return {
          id: product.id,
          name: product.name,
          sku: product.sku || '',
          price: Number(product.price || 0),
          salePrice:
            product.salePrice
              ? Number(product.salePrice)
              : null,
          category:
            product.category || 'Uncategorized',
          images,
          featuredImage:
            product.featuredImage ||
            images[0] ||
            '',
          additionalImages:
            product.additionalImages || [],
          variants,
          stock:
            variants.length > 0
              ? variantStock
              : Number(product.stock || 0),
          inStock:
            product.inStock !== undefined
              ? Boolean(product.inStock)
              : variantStock > 0,
          featured:
            Boolean(product.featured),
        }
      })

    const defaultFormatted: AdminProduct[] =
      defaultProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        sku: product.id,
        images: product.images || [],
        featuredImage:
          product.images?.[0] || '',
        additionalImages:
          product.images?.slice(1, 6) || [],
        variants: [],
        stock: product.inStock ? 1 : 0,
        inStock: product.inStock,
        featured: false,
      }))

    const merged = [
      ...savedFormatted,
      ...defaultFormatted.filter(
        (defaultProduct) =>
          !savedFormatted.some(
            (savedProduct) =>
              savedProduct.id ===
              defaultProduct.id
          )
      ),
    ]

    setAllProducts(merged)
  }

  useEffect(() => {
    loadProducts()

    const handleStorage = () => {
      loadProducts()
    }

    window.addEventListener(
      'storage',
      handleStorage
    )

    return () => {
      window.removeEventListener(
        'storage',
        handleStorage
      )
    }
  }, [])

  const filtered = allProducts.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    const savedProducts = JSON.parse(
      localStorage.getItem(
        'velsario-products'
      ) || '[]'
    )

    const updatedProducts =
      savedProducts.filter(
        (product: any) =>
          product.id !== id
      )

    localStorage.setItem(
      'velsario-products',
      JSON.stringify(updatedProducts)
    )

    setAllProducts((current) =>
      current.filter(
        (product) =>
          product.id !== id
      )
    )
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>

          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Catalog
          </p>

          <h1 className="text-2xl font-medium">
            Products
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage your Velsario product catalog.
          </p>

        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider hover:opacity-90"
        >
          <Plus size={15} />
          Add Product
        </Link>

      </div>


      {/* SEARCH */}

      <div className="bg-white border border-v-border p-4 mb-6">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
          />

          <input
            type="text"
            placeholder="Search by name, SKU or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>


      {/* PRODUCT TABLE */}

      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Price
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Variants
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Stock
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-v-border">

              {filtered.map((product) => (

                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* PRODUCT */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 bg-gray-100 flex-shrink-0 overflow-hidden relative">

                        {product.images?.[0] ? (

                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center">

                            <Package
                              size={18}
                              className="text-gray-400"
                            />

                          </div>

                        )}

                        {product.featured && (

                          <div className="absolute top-1 left-1 bg-black text-white p-1">

                            <Star
                              size={9}
                              className="fill-white"
                            />

                          </div>

                        )}

                      </div>


                      <div>

                        <p className="text-sm font-medium max-w-[300px]">
                          {product.name}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {product.sku || product.id}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* CATEGORY */}

                  <td className="px-6 py-4">

                    <span className="text-xs text-v-gray">
                      {product.category}
                    </span>

                  </td>


                  {/* PRICE */}

                  <td className="px-6 py-4">

                    <div>

                      {product.salePrice ? (

                        <>

                          <span className="text-sm font-medium">
                            ৳{product.salePrice.toLocaleString()}
                          </span>

                          <span className="text-xs text-gray-400 line-through ml-2">
                            ৳{product.price.toLocaleString()}
                          </span>

                        </>

                      ) : (

                        <span className="text-sm font-medium">
                          ৳{product.price.toLocaleString()}
                        </span>

                      )}

                    </div>

                  </td>


                  {/* VARIANTS */}

                  <td className="px-6 py-4">

                    {product.variants &&
                    product.variants.length > 0 ? (

                      <div className="text-xs">

                        <p className="text-gray-700">
                          {product.variants.length} combinations
                        </p>

                        <p className="text-gray-400 mt-1">
                        {Array.from(
  new Set(
    product.variants.map(
      variant => variant.color
    )
  )
).join(', ')}
                        </p>

                      </div>

                    ) : (

                      <span className="text-xs text-gray-400">
                        No variants
                      </span>

                    )}

                  </td>


                  {/* STOCK */}

                  <td className="px-6 py-4">

                    <div className="flex flex-col gap-1">

                      <span
                        className={`inline-flex w-fit px-3 py-1 text-xs ${
                          product.inStock
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {product.inStock
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </span>

                      <span className="text-xs text-gray-400">
                        {product.stock} units
                      </span>

                    </div>

                  </td>


                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="Edit product"
                      >
                        <Edit size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* EMPTY */}

        {filtered.length === 0 && (

          <div className="text-center py-16">

            <Package
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-gray-500">
              No products found
            </p>

          </div>

        )}

      </div>


      {/* TOTAL */}

      <div className="mt-4 text-xs text-v-gray">
        Showing {filtered.length} of{' '}
        {allProducts.length} products
      </div>

    </div>
  )
}
