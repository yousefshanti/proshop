import { useNavigate } from 'react-router-dom'
import StepIndicator from '../components/StepIndicator'
import OrderSummaryCard from '../components/OrderSummaryCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { placeOrder } from '../store/orderSlice'
import { removeFromCart } from '../store/cartSlice'

function randomOrderId() {
  return Array.from({ length: 16 }, () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 36)]).join('')
}

export default function CheckoutReviewPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lines = useAppSelector((state) => state.cart.lines)
  const shipping = useAppSelector((state) => state.checkout.shipping)
  const payment = useAppSelector((state) => state.checkout.payment)

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const tax = subtotal * 0.01

  const shippingCost = 0
  const total = subtotal + tax + shippingCost

  function handlePlaceOrder() {
    const id = randomOrderId()
    dispatch(
      placeOrder({
        id,
        lines,
        shipping,
        payment,
        subtotal,
        tax,
        shipping_cost: shippingCost,
        total,
      })
    )
    lines.forEach((l) => dispatch(removeFromCart(l.id)))
    navigate(`/order/${id}`)
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <p className="font-sans font-bold text-[32px] text-ink">Review Order</p>
      <div className="mt-6">
        <StepIndicator steps={[{ n: 1, label: 'Shipping and Payment' }, { n: 2, label: 'Place an Order' }]} current={2} />
      </div>

      <div className="grid lg:grid-cols-[1fr_384px] gap-10 mt-10 items-start">
        <div className="bg-surface rounded-card p-8 flex flex-col gap-8">
          <div>
            <div className="flex justify-between">
              <p className="font-sans font-bold text-[24px] text-ink">Shipping Address</p>
              <button onClick={() => navigate('/checkout')} className="font-sans text-[22px] text-muted">Change</button>
            </div>
            <p className="font-sans text-[16px] text-ink mt-2">
              {shipping.street}, {shipping.city}, {shipping.country} - {shipping.zip}
            </p>
          </div>

          <div>
            <div className="flex justify-between">
              <p className="font-sans font-bold text-[24px] text-ink">Payment Details</p>
              <button onClick={() => navigate('/checkout')} className="font-sans text-[22px] text-muted">Change</button>
            </div>
            <p className="font-sans text-[16px] text-ink mt-2">**** {payment.cardNumber.slice(-4)}</p>
          </div>

          <div>
            <p className="font-sans font-bold text-[24px] text-ink">Order Details</p>
            <div className="mt-2 flex flex-col gap-2">
              {lines.map((l) => (
                <div key={l.id} className="flex justify-between font-sans text-[16px] text-ink">
                  <span>{l.name} ×{l.qty}</span>
                  <span>${(l.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <OrderSummaryCard
          subtotal={subtotal}
          tax={tax}
          shipping={shippingCost}
          total={total}
          ctaLabel="Place Order"
          onCta={handlePlaceOrder}
        />
      </div>
    </div>
  )
}
