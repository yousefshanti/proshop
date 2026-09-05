import type { FieldProps } from '../types'

export default function Field({ label, value, onChange, type = 'text', placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="font-sans text-[16px] text-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 mt-1 rounded-input border border-grey-300 bg-white px-3 font-sans text-[16px] text-ink"
      />
    </label>
  )
}
