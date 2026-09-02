type Props = {
  steps: { n: number; label: string }[]
  current: number
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="flex gap-10">
      {steps.map((s) => (
        <p
          key={s.n}
          className={`font-sans font-bold text-[22px] ${s.n === current ? 'text-ink' : 'text-muted'}`}
        >
          {s.n} {s.label}
        </p>
      ))}
    </div>
  )
}
