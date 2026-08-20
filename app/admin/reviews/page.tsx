'use client'

import { useState } from 'react'
import { Star, Search, Eye, Trash2 } from 'lucide-react'

const initialReviews = [
  {
    id: 'REV-001',
    customer: 'Customer',
    product: 'Premium Formal Shirt',
    rating: 5,
    comment: 'Excellent quality and fitting.',
    date: '21 Aug 2026',
    status: 'Published',
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [search, setSearch] = useState('')

  const filtered = reviews.filter(
    (review) =>
      review.customer.toLowerCase().includes(search.toLowerCase()) ||
      review.product.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase())
  )

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Management
        </p>

        <h1 className="text-2xl font-medium">
          Reviews
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Review and manage customer feedback.
        </p>

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
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
          />

        </div>

      </div>

      {/* REVIEWS TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-v-border bg-gray-50">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Rating
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Review
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {filtered.map((review) => (

                <tr
                  key={review.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* CUSTOMER */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-medium">
                      {review.customer}
                    </p>

                    <p className="text-xs text-v-gray mt-1">
                      {review.date}
                    </p>

                  </td>

                  {/* PRODUCT */}
                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {review.product}
                    </span>

                  </td>

                  {/* RATING */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-1">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <Star
                          key={star}
                          size={14}
                          className={
                            star <= review.rating
                              ? 'fill-current text-yellow-500'
                              : 'text-gray-300'
                          }
                        />

                      ))}

                    </div>

                  </td>

                  {/* REVIEW */}
                  <td className="px-6 py-4 max-w-xs">

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {review.comment}
                    </p>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span className="inline-flex bg-green-50 text-green-700 px-3 py-1 text-xs">
                      {review.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100"
                        title="View review"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50"
                        title="Delete review"
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

        {filtered.length === 0 && (

          <div className="text-center py-16">

            <Star
              size={28}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-sm text-v-gray">
              No reviews found.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}
