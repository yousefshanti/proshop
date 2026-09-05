import type { QuantityStepperProps } from '../types'

export default function QuantityStepper({ value, min = 1, max, onChange }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center h-10 rounded-input overflow-hidden border border-surface">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-12 h-10 bg-surface font-sans font-bold text-[24px] text-ink"
      >
        −
      </button>
      <span className="w-12 h-10 flex items-center justify-center font-sans font-bold text-[24px] text-ink">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-12 h-10 bg-surface font-sans font-bold text-[24px] text-ink"
      >
        +
      </button>
    </div>
  )
}
