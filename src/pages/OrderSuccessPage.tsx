import { Link, useParams } from 'react-router-dom'
import ProductStrip from '../components/ProductStrip'
import { useAppSelector } from '../store/hooks'
import products from '../data/products.json'

export default function OrderSuccessPage() {
  const { id } = useParams()
  const order = useAppSelector((state) => state.order.lastOrder)
  const recentlyViewed = products.slice(0, 3)

  if (!order || order.id !== id) {
    return (
      <div className="max-w-[1640px] mx-auto px-6 py-10 text-center">
        <p className="font-sans font-bold text-[32px] text-ink">Order not found</p>
        <Link to="/" className="inline-block mt-8 font-sans text-[22px] text-brand">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <p className="font-sans font-bold text-[32px] text-ink">Payment Success !</p>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-10 max-w-[1400px]">
        <div>
          <p className="font-sans text-[16px] text-muted">Order number</p>
          <p className="font-sans font-bold text-[16px] text-ink mt-1">{order.id}</p>
        </div>
        <div>
          <p className="font-sans text-[16px] text-muted">Shipping Address</p>
          <p className="font-sans font-bold text-[16px] text-ink mt-1">
            {order.shipping.street}, {order.shipping.city}, {order.shipping.country} - {order.shipping.zip}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-sans text-[16px] text-muted">Order Items</p>
          <div className="mt-1 flex flex-col gap-1">
            {order.lines.map((l) => (
              <p key={l.id} className="font-sans font-bold text-[16px] text-ink">
                {l.name} ×{l.qty} — ${(l.price * l.qty).toFixed(2)}
              </p>
            ))}
          </div>
        </div>
      </div>

      <p className="font-sans font-light text-[16px] text-muted mt-8">
        A confirmation email has been sent with your order details.
      </p>

      <Link
        to="/"
        className="inline-block mt-8 w-[220px] h-[56px] leading-[56px] text-center bg-brand rounded-pill font-sans text-[22px] text-ink"
      >
        Keep Shopping
      </Link>

      <div className="mt-24">
        <h2 className="font-sans font-bold text-[32px] text-ink">Recently viewed</h2>
        <div className="mt-8">
          <ProductStrip products={recentlyViewed} />
        </div>
      </div>
    </div>
  )
}
