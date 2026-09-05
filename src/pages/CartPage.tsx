import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import QuantityStepper from '../components/QuantityStepper'
import ProductStrip from '../components/ProductStrip'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { removeFromCart, updateQty } from '../store/cartSlice'
import products from '../data/products.json'

export default function CartPage() {
  const lines = useAppSelector((state) => state.cart.lines)
  const dispatch = useAppDispatch()
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const tax = subtotal * 0.01
  const total = subtotal - tax

  if (lines.length === 0) {
    return (
      <div className="max-w-[1640px] mx-auto px-6 py-10">
        <Breadcrumb label="Shopping Cart" />
        <div className="text-center mt-24">
          <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Your shopping cart is empty</p>
          <Link
            to="/"
            className="inline-block mt-8 w-[220px] h-[56px] leading-[56px] text-center bg-brand rounded-pill font-sans text-[22px] text-ink"
          >
            Keep Shopping
          </Link>
        </div>

        <div className="mt-24">
          <h2 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Recently viewed</h2>
          <div className="mt-8">
            <ProductStrip products={products.slice(0, 3)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <Breadcrumb label="Shopping Cart" />

      <div className="grid lg:grid-cols-[1fr_384px] gap-10 mt-10 items-start">
        <div className="flex flex-col gap-6">
          {lines.map((line) => (
            <div key={line.id} className="bg-surface rounded-card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-4 sm:contents">
                <div className="w-20 h-20 sm:w-[152px] sm:h-auto sm:aspect-[304/203] shrink-0 bg-surface-alt rounded-card overflow-hidden">
                  <img src={line.image} alt={line.name} className="w-full h-full object-contain" />
                </div>
                <p className="font-sans font-bold text-[16px] sm:text-[24px] text-ink flex-1 min-w-[140px] line-clamp-2 sm:line-clamp-none">
                  {line.name}
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-normal">
                <QuantityStepper value={line.qty} max={20} onChange={(q) => dispatch(updateQty({ id: line.id, qty: q }))} />
                <p className="font-sans font-bold text-[20px] sm:text-[30px] text-ink sm:w-[120px] text-right">
                  ${(line.price * line.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(line.id))}
                  aria-label="Remove from cart"
                  className="text-[24px] text-muted"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-card p-8">
          <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Subtotal ({lines.length}) items</p>
          <p className="font-sans font-bold text-[24px] text-ink mt-2">${subtotal.toFixed(2)}</p>
          <p className="font-sans font-black text-[38px] text-ink mt-4">${total.toFixed(2)}</p>
          <Link
            to="/checkout"
            className="mt-8 w-full max-w-[324px] h-[62px] flex items-center justify-center bg-brand rounded-btn font-sans text-[24px] text-ink"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
