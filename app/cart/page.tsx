'use client'

import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={48} className="text-v-border mb-6" />
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <p className="text-v-gray mb-8 font-light">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="btn-primary">Explore Collection</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="px-4 md:px-8 py-8 border-b border-v-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">Your Selection</p>
          <h1 className="font-display text-3xl md:text-4xl">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Items */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-v-border text-xs tracking-widest uppercase text-v-gray mb-6">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Size</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="flex flex-col divide-y divide-v-border">
              {items.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="py-6 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <div className="w-20 aspect-square bg-v-light flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug mb-1 line-clamp-2">{item.name}</p>
                      <p className="text-xs text-v-gray">{item.color}</p>
                      <p className="text-xs text-v-gray">৳{item.price.toLocaleString()}</p>
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="mt-2 flex items-center gap-1 text-xs text-v-gray hover:text-red-500 transition-colors md:hidden"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex col-span-2 justify-center">
                    <span className="text-sm font-medium border border-v-border px-3 py-1">{item.size}</span>
                  </div>

                  <div className="col-span-6 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-v-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-v-light transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-v-light transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-2 flex justify-end items-center gap-4">
                    <p className="text-sm font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeItem(item.id, item.color, item.size)}
                      className="hidden md:block text-v-gray hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t border-v-border">
              <Link href="/shop" className="flex items-center gap-2 text-xs tracking-wider uppercase text-v-gray hover:text-v-black transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-v-light p-6 md:p-8 sticky top-28">
              <h2 className="font-medium tracking-wider uppercase text-sm mb-6">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-v-gray">Subtotal ({itemCount} items)</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-v-gray">Shipping</span>
                  <span className="text-v-gray">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-v-border pt-4 mb-6">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="input-field flex-1 border-r-0 text-xs"
                  />
                  <button className="bg-v-black text-v-white px-4 text-xs tracking-wider uppercase font-medium hover:bg-v-gray transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-3">
                Checkout <ArrowRight size={14} />
              </Link>

              <p className="text-xs text-v-gray text-center mt-4 font-light">
                Free delivery on orders above ৳2000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
