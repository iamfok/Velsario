'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Eye,
  EyeOff,
  Trash2,
  MessageCircle,
  Search,
  Star,
  ThumbsUp,
} from 'lucide-react'

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

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [replyId, setReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem('velsario-reviews') || '[]'
    )

    setReviews(savedReviews)
  }, [])

  const saveReviews = (updated: Review[]) => {
    setReviews(updated)

    localStorage.setItem(
      'velsario-reviews',
      JSON.stringify(updated)
    )
  }

  const toggleHidden = (id: string) => {
    const updated = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            hidden: !review.hidden,
          }
        : review
    )

    saveReviews(updated)
  }

  const deleteReview = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    )

    if (!confirmed) return

    saveReviews(
      reviews.filter(
        (review) => review.id !== id
      )
    )
  }

  const saveReply = (id: string) => {
    if (!replyText.trim()) return

    const updated = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            reply: replyText.trim(),
          }
        : review
    )

    saveReviews(updated)

    setReplyId(null)
    setReplyText('')
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.productName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        review.customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        review.comment
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Visible' && !review.hidden) ||
        (filter === 'Hidden' && review.hidden)

      return matchesSearch && matchesFilter
    })
  }, [reviews, search, filter])

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
          Customer Feedback
        </p>

        <h1 className="text-2xl font-medium">
          Reviews
        </h1>

        <p className="text-sm text-v-gray mt-1">
          Manage product reviews, reactions and customer replies.
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white border border-v-border p-5">
          <p className="text-xs text-v-gray">
            Total Reviews
          </p>

          <p className="text-2xl font-medium mt-2">
            {reviews.length}
          </p>
        </div>

        <div className="bg-white border border-v-border p-5">
          <p className="text-xs text-v-gray">
            Visible
          </p>

          <p className="text-2xl font-medium mt-2">
            {reviews.filter(
              (review) => !review.hidden
            ).length}
          </p>
        </div>

        <div className="bg-white border border-v-border p-5">
          <p className="text-xs text-v-gray">
            Hidden
          </p>

          <p className="text-2xl font-medium mt-2">
            {reviews.filter(
              (review) => review.hidden
            ).length}
          </p>
        </div>

        <div className="bg-white border border-v-border p-5">
          <p className="text-xs text-v-gray">
            Average Rating
          </p>

          <p className="text-2xl font-medium mt-2">
            {reviews.length
              ? (
                  reviews.reduce(
                    (sum, review) =>
                      sum + review.rating,
                    0
                  ) / reviews.length
                ).toFixed(1)
              : '0.0'}
          </p>
        </div>

      </div>

      {/* FILTER */}

      <div className="bg-white border border-v-border p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-v-gray"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reviews..."
              className="w-full border border-v-border px-10 py-3 text-sm outline-none focus:border-black"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border border-v-border px-4 py-3 text-sm bg-white outline-none"
          >
            <option>All</option>
            <option>Visible</option>
            <option>Hidden</option>
          </select>

        </div>

      </div>

      {/* REVIEWS */}

      <div className="space-y-4">

        {filteredReviews.map((review) => (

          <div
            key={review.id}
            className={`bg-white border border-v-border p-6 ${
              review.hidden
                ? 'opacity-60'
                : ''
            }`}
          >

            {/* TOP */}

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

              <div>

                <p className="text-xs text-v-gray mb-1">
                  {review.productName}
                </p>

                <p className="text-sm font-medium">
                  {review.customerName}
                </p>

                <p className="text-xs text-v-gray mt-1">
                  {review.date}
                </p>

              </div>

              <div className="flex items-center gap-1">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <Star
                    key={index}
                    size={15}
                    className={
                      index < review.rating
                        ? 'fill-black text-black'
                        : 'text-gray-300'
                    }
                  />

                ))}

              </div>

            </div>

            {/* COMMENT */}

            <div className="mt-5">

              <p className="text-sm leading-6">
                {review.comment}
              </p>

            </div>

            {/* REACTIONS */}

            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-v-gray">

              <span className="flex items-center gap-1">
                <ThumbsUp size={14} />
                {review.likes || 0}
              </span>

              <span>
                ❤️ {review.reactions?.love || 0}
              </span>

              <span>
                😄 {review.reactions?.laugh || 0}
              </span>

              <span>
                😢 {review.reactions?.sad || 0}
              </span>

              <span>
                😡 {review.reactions?.angry || 0}
              </span>

            </div>

            {/* ADMIN REPLY */}

            {review.reply && (

              <div className="mt-5 ml-4 border-l-2 border-black pl-4">

                <p className="text-xs tracking-wider uppercase font-medium mb-2">
                  Velsario Reply
                </p>

                <p className="text-sm text-gray-600">
                  {review.reply}
                </p>

              </div>

            )}

            {/* REPLY FORM */}

            {replyId === review.id && (

              <div className="mt-5">

                <textarea
                  value={replyText}
                  onChange={(e) =>
                    setReplyText(
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Write your reply..."
                  className="w-full border border-v-border px-4 py-3 text-sm outline-none resize-none focus:border-black"
                />

                <div className="flex justify-end gap-2 mt-2">

                  <button
                    type="button"
                    onClick={() => {
                      setReplyId(null)
                      setReplyText('')
                    }}
                    className="px-4 py-2 border border-v-border text-xs"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      saveReply(review.id)
                    }
                    className="px-4 py-2 bg-black text-white text-xs"
                  >
                    Save Reply
                  </button>

                </div>

              </div>

            )}

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-v-border">

              <button
                type="button"
                onClick={() => {
                  setReplyId(review.id)
                  setReplyText(
                    review.reply || ''
                  )
                }}
                className="flex items-center gap-2 px-3 py-2 border border-v-border text-xs hover:bg-gray-100"
              >
                <MessageCircle size={14} />
                Reply
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleHidden(review.id)
                }
                className="flex items-center gap-2 px-3 py-2 border border-v-border text-xs hover:bg-gray-100"
              >
                {review.hidden ? (
                  <>
                    <Eye size={14} />
                    Show
                  </>
                ) : (
                  <>
                    <EyeOff size={14} />
                    Hide
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteReview(review.id)
                }
                className="flex items-center gap-2 px-3 py-2 border border-red-200 text-red-500 text-xs hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* EMPTY */}

      {filteredReviews.length === 0 && (

        <div className="bg-white border border-v-border py-20 text-center">

          <MessageCircle
            size={28}
            className="mx-auto mb-4 text-gray-400"
          />

          <p className="text-sm text-gray-500">
            No reviews yet
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Customer reviews will appear here.
          </p>

        </div>

      )}

    </div>
  )
}
