export default function Breadcrumb({ label }: { label: string }) {
  return (
    <p className="font-sans text-[24px]">
      <span className="text-muted">Back / </span>
      <span className="text-ink">{label}</span>
    </p>
  )
}
