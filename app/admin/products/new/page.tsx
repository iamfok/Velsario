'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  ImagePlus,
  Plus,
  Trash2,
} from 'lucide-react'

const COLORS = [
  'Black',
  'White',
]

const SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
]

const CATEGORIES = [
  'Shirts',
  'Pants',
  'T-Shirts',
  'Polo',
  'Dresses',
  'Accessories',
]

type Variant = {
  color: string
  size: string
  stock: number
}

export default function NewProductPage() {

  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [description, setDescription] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const [featuredImage, setFeaturedImage] = useState('')
  const [additionalImages, setAdditionalImages] = useState<string[]>([])

  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const [variants, setVariants] = useState<Variant[]>([])

  const [featured, setFeatured] = useState(false)
  const [inStock, setInStock] = useState(true)
  const [reviewsEnabled, setReviewsEnabled] = useState(true)

  const [saved, setSaved] = useState(false)

  /* IMAGE UPLOAD */

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'featured' | 'additional'
  ) => {

    const files = Array.from(e.target.files || [])

    if (!files.length) return

    files.forEach((file) => {

      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()

      reader.onload = () => {

        const result = reader.result as string

        if (type === 'featured') {
          setFeaturedImage(result)
        } else {

          setAdditionalImages((current) => {

            if (current.length >= 5) return current

            return [...current, result]
          })

        }

      }

      reader.readAsDataURL(file)

    })

    e.target.value = ''
  }

  const removeAdditionalImage = (index: number) => {

    setAdditionalImages((current) =>
      current.filter((_, i) => i !== index)
    )

  }

  /* COLOR */

  const toggleColor = (color: string) => {

    setSelectedColors((current) => {

      if (current.includes(color)) {
        return current.filter((item) => item !== color)
      }

      return [...current, color]
    })

  }

  /* SIZE */

  const toggleSize = (size: string) => {

    setSelectedSizes((current) => {

      if (current.includes(size)) {
        return current.filter((item) => item !== size)
      }

      return [...current, size]
    })

  }

  /* BUILD VARIANTS */

  const generateVariants = () => {

    const generated: Variant[] = []

    selectedColors.forEach((color) => {

      selectedSizes.forEach((size) => {

        const existing = variants.find(
          (variant) =>
            variant.color === color &&
            variant.size === size
        )

        generated.push({
          color,
          size,
          stock: existing?.stock || 0,
        })

      })

    })

    setVariants(generated)
  }

  const updateVariantStock = (
    color: string,
    size: string,
    stock: number
  ) => {

    setVariants((current) =>
      current.map((variant) => {

        if (
          variant.color === color &&
          variant.size === size
        ) {
          return {
            ...variant,
            stock,
          }
        }

        return variant

      })
    )

  }

  /* SAVE */

  const handleSave = () => {

    if (!name.trim()) {
      alert('Please enter a product name.')
      return
    }

    if (!price) {
      alert('Please enter the product price.')
      return
    }

    if (!featuredImage) {
      alert('Please upload a featured image.')
      return
    }

    const product = {

      id:
        sku.trim() ||
        `VEL-${Date.now()}`,

      name,

      sku,

      category,

      price: Number(price),

      salePrice:
        salePrice
          ? Number(salePrice)
          : null,

      description,

      additionalInfo,

      images: [
        featuredImage,
        ...additionalImages,
      ],

      featuredImage,

      additionalImages,

      colors: selectedColors,

      sizes: selectedSizes,

      variants,

      featured,

      inStock,

      reviewsEnabled,

      createdAt:
        new Date().toISOString(),

    }

    const existingProducts =
      JSON.parse(
        localStorage.getItem(
          'velsario-products'
        ) || '[]'
      )

    localStorage.setItem(
      'velsario-products',
      JSON.stringify([
        ...existingProducts,
        product,
      ])
    )

    setSaved(true)

    setTimeout(() => {
      window.location.href =
        '/admin/products'
    }, 800)

  }

  return (

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <Link
          href="/admin/products"
          className="p-2 border border-v-border hover:bg-gray-100"
        >
          <ArrowLeft size={17} />
        </Link>

        <div>

          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Products
          </p>

          <h1 className="text-2xl font-medium">
            Add New Product
          </h1>

        </div>

      </div>


      {/* BASIC INFORMATION */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <h2 className="text-xs tracking-widest uppercase font-medium mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="md:col-span-2">

            <label className="block text-xs tracking-wider mb-2">
              Product Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Product name"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>


          <div>

            <label className="block text-xs tracking-wider mb-2">
              SKU
            </label>

            <input
              value={sku}
              onChange={(e) =>
                setSku(e.target.value)
              }
              placeholder="VEL-SHIRT-001"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

          </div>


          <div>

            <label className="block text-xs tracking-wider mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full border border-v-border px-4 py-3 text-sm outline-none bg-white"
            >

              <option value="">
                Select Category
              </option>

              {CATEGORIES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label className="block text-xs tracking-wider mb-2">
              Regular Price (BDT)
            </label>

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              placeholder="0"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none"
            />

          </div>


          <div>

            <label className="block text-xs tracking-wider mb-2">
              Sale Price (BDT)
            </label>

            <input
              type="number"
              min="0"
              value={salePrice}
              onChange={(e) =>
                setSalePrice(e.target.value)
              }
              placeholder="Optional"
              className="w-full border border-v-border px-4 py-3 text-sm outline-none"
            />

          </div>

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <h2 className="text-xs tracking-widest uppercase font-medium mb-6">
          Product Content
        </h2>

        <div className="space-y-6">

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={7}
              placeholder="Write product description..."
              className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none"
            />

          </div>


          <div>

            <label className="block text-xs tracking-wider mb-2">
              Additional Information
            </label>

            <textarea
              value={additionalInfo}
              onChange={(e) =>
                setAdditionalInfo(e.target.value)
              }
              rows={5}
              placeholder="Fabric, material, fit, care instructions, measurements, country of origin, etc."
              className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none"
            />

          </div>

        </div>

      </div>


      {/* IMAGES */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <h2 className="text-xs tracking-widest uppercase font-medium mb-6">
          Product Images
        </h2>


        {/* FEATURED */}

        <div className="mb-8">

          <label className="block text-xs tracking-wider mb-3">
            Featured Image
          </label>

          <div className="w-64 h-64 bg-gray-50 border border-dashed border-gray-300 overflow-hidden relative flex items-center justify-center">

            {featuredImage ? (

              <>
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setFeaturedImage('')
                  }
                  className="absolute top-2 right-2 w-8 h-8 bg-black text-white flex items-center justify-center"
                >
                  <X size={15} />
                </button>
              </>

            ) : (

              <label className="cursor-pointer text-center">

                <ImagePlus
                  size={30}
                  className="mx-auto mb-3 text-gray-400"
                />

                <span className="flex items-center gap-2 bg-black text-white px-4 py-3 text-xs">
                  <Upload size={14} />
                  Upload Featured Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    uploadImage(
                      e,
                      'featured'
                    )
                  }
                  className="hidden"
                />

              </label>

            )}

          </div>

        </div>


        {/* ADDITIONAL */}

        <div>

          <div className="flex items-center justify-between mb-3">

            <label className="text-xs tracking-wider">
              Additional Images
            </label>

            <span className="text-xs text-v-gray">
              {additionalImages.length}/5
            </span>

          </div>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

            {additionalImages.map(
              (image, index) => (

                <div
                  key={index}
                  className="aspect-square bg-gray-50 border overflow-hidden relative"
                >

                  <img
                    src={image}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeAdditionalImage(
                        index
                      )
                    }
                    className="absolute top-2 right-2 w-7 h-7 bg-black text-white flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>

                </div>

              )
            )}


            {additionalImages.length < 5 && (

              <label className="aspect-square border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">

                <Plus
                  size={22}
                  className="text-gray-400 mb-2"
                />

                <span className="text-xs text-gray-500">
                  Add Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    uploadImage(
                      e,
                      'additional'
                    )
                  }
                  className="hidden"
                />

              </label>

            )}

          </div>

        </div>

      </div>


      {/* VARIABLES */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <h2 className="text-xs tracking-widest uppercase font-medium mb-2">
          Product Variables
        </h2>

        <p className="text-xs text-v-gray mb-6">
          Select colors and sizes. Each combination can have its own stock quantity.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COLORS */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Colors
            </label>

            <select
              value=""
              onChange={(e) => {

                if (
                  e.target.value &&
                  !selectedColors.includes(
                    e.target.value
                  )
                ) {
                  setSelectedColors([
                    ...selectedColors,
                    e.target.value,
                  ])
                }

              }}
              className="w-full border border-v-border px-4 py-3 text-sm bg-white"
            >

              <option value="">
                Select Color
              </option>

              {COLORS.map((color) => (

                <option
                  key={color}
                  value={color}
                >
                  {color}
                </option>

              ))}

            </select>


            <div className="flex flex-wrap gap-2 mt-3">

              {selectedColors.map(
                (color) => (

                  <button
                    type="button"
                    key={color}
                    onClick={() =>
                      toggleColor(color)
                    }
                    className="px-3 py-2 bg-black text-white text-xs"
                  >
                    {color} ×
                  </button>

                )
              )}

            </div>

          </div>


          {/* SIZES */}

          <div>

            <label className="block text-xs tracking-wider mb-2">
              Sizes
            </label>

            <select
              value=""
              onChange={(e) => {

                if (
                  e.target.value &&
                  !selectedSizes.includes(
                    e.target.value
                  )
                ) {
                  setSelectedSizes([
                    ...selectedSizes,
                    e.target.value,
                  ])
                }

              }}
              className="w-full border border-v-border px-4 py-3 text-sm bg-white"
            >

              <option value="">
                Select Size
              </option>

              {SIZES.map((size) => (

                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>

              ))}

            </select>


            <div className="flex flex-wrap gap-2 mt-3">

              {selectedSizes.map(
                (size) => (

                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      toggleSize(size)
                    }
                    className="px-3 py-2 bg-black text-white text-xs"
                  >
                    {size} ×
                  </button>

                )
              )}

            </div>

          </div>

        </div>


        {/* GENERATE */}

        {selectedColors.length > 0 &&
          selectedSizes.length > 0 && (

            <button
              type="button"
              onClick={generateVariants}
              className="mt-6 flex items-center gap-2 border border-black px-5 py-3 text-xs tracking-wider hover:bg-black hover:text-white"
            >
              <Plus size={14} />
              Generate Variants
            </button>

          )}


        {/* MATRIX */}

        {variants.length > 0 && (

          <div className="mt-8">

            <p className="text-xs tracking-widest uppercase font-medium mb-4">
              Stock by Variant
            </p>

            <div className="overflow-x-auto border border-v-border">

              <table className="w-full min-w-[500px]">

                <thead>

                  <tr className="bg-gray-50 border-b border-v-border">

                    <th className="text-left px-4 py-3 text-xs">
                      Color
                    </th>

                    <th className="text-left px-4 py-3 text-xs">
                      Size
                    </th>

                    <th className="text-left px-4 py-3 text-xs">
                      Stock Quantity
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {variants.map(
                    (variant) => (

                      <tr
                        key={`${variant.color}-${variant.size}`}
                        className="border-b border-v-border last:border-0"
                      >

                        <td className="px-4 py-3 text-sm">
                          {variant.color}
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {variant.size}
                        </td>

                        <td className="px-4 py-3">

                          <input
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariantStock(
                                variant.color,
                                variant.size,
                                Number(
                                  e.target.value
                                )
                              )
                            }
                            className="w-32 border border-v-border px-3 py-2 text-sm outline-none"
                          />

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>


      {/* STATUS & REVIEWS */}

      <div className="bg-white border border-v-border p-6 md:p-8 mb-6">

        <h2 className="text-xs tracking-widest uppercase font-medium mb-6">
          Product Settings
        </h2>

        <div className="space-y-5">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) =>
                setInStock(
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

            <span className="text-sm">
              Product is in stock
            </span>

          </label>


          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

            <span className="text-sm">
              Featured Product
            </span>

          </label>


          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={reviewsEnabled}
              onChange={(e) =>
                setReviewsEnabled(
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />

            <span className="text-sm">
              Allow Product Reviews
            </span>

          </label>

        </div>

      </div>


      {/* ACTIONS */}

      <div className="flex justify-end gap-3 pb-10">

        <Link
          href="/admin/products"
          className="px-5 py-3 border border-v-border text-xs tracking-wider hover:bg-gray-100"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 bg-v-black text-white px-6 py-3 text-xs tracking-wider hover:opacity-90"
        >

          <Save size={15} />

          {saved
            ? 'Saved!'
            : 'Save Product'}

        </button>

      </div>

    </div>

  )
}
