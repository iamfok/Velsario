import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
        <p className="section-label mb-4">Thank you!</p>
        <h1 className="font-display text-4xl mb-6">Order Placed Successfully</h1>
        <p className="text-v-gray font-light leading-relaxed mb-8">
          Your order has been received. We will contact you shortly to confirm delivery details.
          Thank you for choosing Velsario.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
