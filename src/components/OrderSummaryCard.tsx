import type { OrderSummaryCardProps } from '../types'

export default function OrderSummaryCard({ subtotal, tax, shipping, total, ctaLabel, onCta }: OrderSummaryCardProps) {
  return (
    <div className="bg-surface rounded-card p-8">
      <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Order Details</p>
      <div className="flex justify-between mt-6 font-sans text-[16px] text-ink">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-2 font-sans text-[16px] text-ink">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-2 font-sans text-[16px] text-ink">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4 pt-4 border-t border-surface-alt font-sans font-bold text-[16px] text-ink">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        onClick={onCta}
        className="mt-8 w-full h-[62px] bg-brand rounded-btn font-sans text-[24px] text-ink"
      >
        {ctaLabel}
      </button>
    </div>
  )
}
