'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Send,
  ThumbsUp,
} from 'lucide-react'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

type Review = {
  id: string
  productId: string
  productName: string
  customerName: string
  rating: number
  comment: string
  date: string
  hidden: boolean
  likes: number
  reactions: {
    like: number
    love: number
    laugh: number
    angry: number
    sad: number
  }
  reply?: string
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = getProductById(params.id)

  if (!product) notFound()

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const [reviews, setReviews] = useState<Review[]>([])
  const [customerName, setCustomerName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem('velsario-reviews') || '[]'
    )

    setReviews(savedReviews)
  }, [])

  const productReviews = reviews.filter(
    review =>
      review.productId === product.id &&
      !review.hidden
  )

  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / productReviews.length
        ).toFixed(1)
      : '0.0'

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }

    setSizeError(false)

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
      quantity,
    })

    setAddedToCart(true)

    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  const submitReview = () => {
    if (!customerName.trim()) {
      setReviewError('Please enter your name.')
      return
    }

    if (!reviewText.trim()) {
      setReviewError('Please write your review.')
      return
    }

    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      customerName: customerName.trim(),
      rating: reviewRating,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString('en-GB'),
      hidden: false,
      likes: 0,
      reactions: {
        like: 0,
        love: 0,
        laugh: 0,
        angry: 0,
        sad: 0,
      },
    }

    const savedReviews = JSON.parse(
      localStorage.getItem('velsario-reviews') || '[]'
    )

    const updatedReviews = [
      ...savedReviews,
      newReview,
    ]

    localStorage.setItem(
      'velsario-reviews',
      JSON.stringify(updatedReviews)
    )

    setReviews(updatedReviews)
    setCustomerName('')
    setReviewText('')
    setReviewRating(5)
    setReviewError('')
    setReviewSuccess(true)

    setTimeout(() => {
      setReviewSuccess(false)
    }, 4000)
  }

  const updateReaction = (
    reviewId: string,
    reaction: 'like' | 'love' | 'laugh' | 'sad' | 'angry'
  ) => {
    const savedReviews: Review[] = JSON.parse(
      localStorage.getItem('velsario-reviews') || '[]'
    )

    const updatedReviews = savedReviews.map(review => {
      if (review.id !== reviewId) return review

      return {
        ...review,
        likes:
          reaction === 'like'
            ? (review.likes || 0) + 1
            : review.likes || 0,
        reactions: {
          ...review.reactions,
          [reaction]:
            (review.reactions?.[reaction] || 0) + 1,
        },
      }
    })

    localStorage.setItem(
      'velsario-reviews',
      JSON.stringify(updatedReviews)
    )

    setReviews(updatedReviews)
  }

  const related = products
    .filter(
      p =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3)

  return (
    <div className="pt-20">

      {/* Breadcrumb */}
      <div className="px-4 md:px-8 py-4 border-b border-v-border">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-v-gray">
          <Link
            href="/"
            className="hover:text-v-black transition-colors"
          >
            Home
          </Link>

          <ChevronRight size={12} />

          <Link
            href="/shop"
            className="hover:text-v-black transition-colors"
          >
            Shop
          </Link>

          <ChevronRight size={12} />

          <span className="text-v-black">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">

        {/* PRODUCT */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* Images */}

          <div>
            <div className="aspect-[3/4] bg-v-light overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setActiveImage(i)
                    }
                    className={`w-20 aspect-square bg-v-light overflow-hidden border-2 transition-colors ${
                      activeImage === i
                        ? 'border-v-black'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}

          <div className="flex flex-col">

            <p className="section-label mb-3">
              {product.subcategory.replace('-', ' ')}
            </p>

            <h1 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-3 mb-5">

              <div className="flex items-center gap-1">

                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={15}
                      className={
                        index <
                        Math.round(
                          Number(averageRating)
                        )
                          ? 'fill-black text-black'
                          : 'text-gray-300'
                      }
                    />
                  )
                )}

              </div>

              <span className="text-xs text-v-gray">
                {productReviews.length > 0
                  ? `${averageRating} (${productReviews.length} reviews)`
                  : 'No reviews yet'}
              </span>

            </div>

            <div className="flex items-center gap-4 mb-6">

              <span className="text-2xl font-medium">
                ৳{product.price.toLocaleString()}
              </span>

              {product.inStock ? (
                <span className="text-xs tracking-wider text-green-600 uppercase">
                  In Stock
                </span>
              ) : (
                <span className="text-xs tracking-wider text-red-500 uppercase">
                  Out of Stock
                </span>
              )}

            </div>

            <p className="text-v-gray text-sm leading-relaxed mb-8 font-light">
              {product.description}
            </p>

            {/* Color */}

            <div className="mb-6">

              <div className="flex justify-between mb-3">

                <p className="text-xs tracking-wider uppercase font-medium">
                  Color
                </p>

                <p className="text-xs text-v-gray">
                  {selectedColor}
                </p>

              </div>

              <div className="flex gap-3">

                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`flex items-center gap-2 px-4 py-2 border text-xs tracking-wider uppercase transition-all ${
                      selectedColor === color
                        ? 'border-v-black'
                        : 'border-v-border hover:border-v-gray'
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${
                        color === 'Black'
                          ? 'bg-black'
                          : 'bg-white border border-gray-300'
                      }`}
                    />

                    {color}
                  </button>
                ))}

              </div>
            </div>

            {/* Size */}

            <div className="mb-8">

              <div className="flex justify-between mb-3">

                <p className="text-xs tracking-wider uppercase font-medium">
                  Size
                </p>

                <button className="text-xs text-v-gray underline">
                  Size Guide
                </button>

              </div>

              <div className="flex gap-2 flex-wrap">

                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size)
                      setSizeError(false)
                    }}
                    className={`w-12 h-12 border text-xs font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-v-black text-v-white border-v-black'
                        : 'border-v-border hover:border-v-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}

              </div>

              {sizeError && (
                <p className="text-xs text-red-500 mt-2">
                  Please select a size
                </p>
              )}

            </div>

            {/* Quantity */}

            <div className="flex items-center gap-4 mb-6">

              <p className="text-xs tracking-wider uppercase font-medium">
                Quantity
              </p>

              <div className="flex items-center border border-v-border">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-v-light transition-colors"
                >
                  <Minus size={14} />
                </button>

                <span className="w-12 text-center text-sm">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-v-light transition-colors"
                >
                  <Plus size={14} />
                </button>

              </div>

            </div>

            {/* Add to Cart */}

            <div className="flex gap-3 mb-8">

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs tracking-widest uppercase font-medium transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-v-black text-v-white hover:bg-v-gray'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingBag size={16} />

                {addedToCart
                  ? 'Added to Cart!'
                  : 'Add to Cart'}
              </button>

              <button className="w-14 h-14 border border-v-border flex items-center justify-center hover:bg-v-light transition-colors">
                <Heart size={18} />
              </button>

              <button className="w-14 h-14 border border-v-border flex items-center justify-center hover:bg-v-light transition-colors">
                <Share2 size={18} />
              </button>

            </div>

            {/* Features */}

            <div className="border-t border-v-border pt-6">

              <p className="text-xs tracking-wider uppercase font-medium mb-4">
                Features
              </p>

              <ul className="flex flex-col gap-2">

                {product.features.map(f => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-v-gray font-light"
                  >
                    <span className="w-1 h-1 bg-v-black rounded-full" />
                    {f}
                  </li>
                ))}

              </ul>

            </div>

          </div>
        </div>

        {/* REVIEWS */}

        <section className="mt-20 md:mt-28 border-t border-v-border pt-16">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Review Summary */}

            <div>

              <p className="section-label mb-2">
                Customer Feedback
              </p>

              <h2 className="font-display text-3xl mb-6">
                Reviews
              </h2>

              <div className="flex items-center gap-4">

                <span className="text-4xl font-medium">
                  {averageRating}
                </span>

                <div>

                  <div className="flex gap-1 mb-1">

                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={
                            index <
                            Math.round(
                              Number(averageRating)
                            )
                              ? 'fill-black text-black'
                              : 'text-gray-300'
                          }
                        />
                      )
                    )}

                  </div>

                  <p className="text-xs text-v-gray">
                    {productReviews.length} review
                    {productReviews.length !== 1
                      ? 's'
                      : ''}
                  </p>

                </div>

              </div>

            </div>

            {/* Review Form */}

            <div className="lg:col-span-2">

              <div className="bg-white border border-v-border p-6 md:p-8">

                <p className="text-xs tracking-widest uppercase font-medium mb-5">
                  Write a Review
                </p>

                {/* Rating */}

                <div className="mb-5">

                  <p className="text-xs text-v-gray mb-2">
                    Your Rating
                  </p>

                  <div className="flex gap-1">

                    {Array.from({ length: 5 }).map(
                      (_, index) => {

                        const rating = index + 1

                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() =>
                              setReviewRating(rating)
                            }
                            className="p-1"
                          >
                            <Star
                              size={21}
                              className={
                                rating <=
                                reviewRating
                                  ? 'fill-black text-black'
                                  : 'text-gray-300'
                              }
                            />
                          </button>
                        )
                      }
                    )}

                  </div>

                </div>

                {/* Name */}

                <input
                  type="text"
                  value={customerName}
                  onChange={e =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none focus:border-black mb-4"
                />

                {/* Comment */}

                <textarea
                  value={reviewText}
                  onChange={e =>
                    setReviewText(e.target.value)
                  }
                  placeholder="Write your review..."
                  rows={5}
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none focus:border-black"
                />

                {reviewError && (
                  <p className="text-xs text-red-500 mt-2">
                    {reviewError}
                  </p>
                )}

                {reviewSuccess && (
                  <p className="text-xs text-green-600 mt-2">
                    Your review has been submitted successfully.
                  </p>
                )}

                <div className="flex justify-end mt-4">

                  <button
                    type="button"
                    onClick={submitReview}
                    className="flex items-center gap-2 bg-v-black text-white px-5 py-3 text-xs tracking-wider uppercase hover:opacity-90"
                  >
                    <Send size={14} />
                    Submit Review
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* REVIEW LIST */}

          <div className="mt-12">

            {productReviews.length === 0 ? (

              <div className="border border-v-border py-14 text-center">

                <MessageReviewIcon />

                <p className="text-sm text-v-gray mt-3">
                  No reviews yet.
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Be the first to review this product.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {productReviews.map(review => (

                  <div
                    key={review.id}
                    className="border border-v-border p-6"
                  >

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div>

                        <p className="text-sm font-medium">
                          {review.customerName}
                        </p>

                        <p className="text-xs text-v-gray mt-1">
                          {review.date}
                        </p>

                      </div>

                      <div className="flex gap-1">

                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={
                              index < review.rating
                                ? 'fill-black text-black'
                                : 'text-gray-300'
                            }
                          />
                        ))}

                      </div>

                    </div>

                    <p className="text-sm leading-6 text-gray-700 mt-5">
                      {review.comment}
                    </p>

                    {/* Reactions */}

                    <div className="flex flex-wrap items-center gap-2 mt-5">

                      <button
                        type="button"
                        onClick={() =>
                          updateReaction(
                            review.id,
                            'like'
                          )
                        }
                        className="flex items-center gap-1 border border-v-border px-3 py-1.5 text-xs hover:bg-v-light"
                      >
                        <ThumbsUp size={13} />
                        {review.likes || 0}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateReaction(
                            review.id,
                            'love'
                          )
                        }
                        className="border border-v-border px-3 py-1.5 text-xs hover:bg-v-light"
                      >
                        ❤️ {review.reactions?.love || 0}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateReaction(
                            review.id,
                            'laugh'
                          )
                        }
                        className="border border-v-border px-3 py-1.5 text-xs hover:bg-v-light"
                      >
                        😄 {review.reactions?.laugh || 0}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateReaction(
                            review.id,
                            'sad'
                          )
                        }
                        className="border border-v-border px-3 py-1.5 text-xs hover:bg-v-light"
                      >
                        😢 {review.reactions?.sad || 0}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateReaction(
                            review.id,
                            'angry'
                          )
                        }
                        className="border border-v-border px-3 py-1.5 text-xs hover:bg-v-light"
                      >
                        😡 {review.reactions?.angry || 0}
                      </button>

                    </div>

                    {/* Admin Reply */}

                    {review.reply && (

                      <div className="mt-6 ml-4 border-l-2 border-black pl-4">

                        <p className="text-xs tracking-widest uppercase font-medium mb-2">
                          Velsario Reply
                        </p>

                        <p className="text-sm text-gray-600 leading-6">
                          {review.reply}
                        </p>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

        {/* Related Products */}

        {related.length > 0 && (

          <div className="mt-20 md:mt-28">

            <div className="flex items-end justify-between mb-10">

              <div>

                <p className="section-label mb-2">
                  You may also like
                </p>

                <h2 className="font-display text-3xl">
                  Related Products
                </h2>

              </div>

              <Link
                href="/shop"
                className="text-xs tracking-wider uppercase text-v-gray hover:text-v-black transition-colors"
              >
                View all
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {related.map(p => (

                <Link
                  key={p.id}
                  href={`/shop/${p.id}`}
                  className="product-card group"
                >

                  <div className="aspect-[3/4] bg-v-light overflow-hidden mb-3">

                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="product-image w-full h-full object-cover"
                    />

                  </div>

                  <h3 className="text-sm font-medium mb-1 line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="text-sm text-v-gray">
                    ৳{p.price.toLocaleString()}
                  </p>

                </Link>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  )
}

function MessageReviewIcon() {
  return (
    <div className="mx-auto w-10 h-10 border border-v-border rounded-full flex items-center justify-center">
      <Star size={17} className="text-gray-400" />
    </div>
  )
}
