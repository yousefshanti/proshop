import type { StepIndicatorProps } from '../types'

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-10">
      {steps.map((s) => (
        <p
          key={s.n}
          className={`font-sans font-bold text-[16px] sm:text-[22px] ${s.n === current ? 'text-ink' : 'text-muted'}`}
        >
          {s.n} {s.label}
        </p>
      ))}
    </div>
  )
}
