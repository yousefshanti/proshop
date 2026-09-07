import type { CategoryCardProps } from '../types'

export default function CategoryCard({ label, image, href }: CategoryCardProps) {
  return (
    <a href={href} className="w-full max-w-[380px] flex flex-col items-center gap-4">
      <div className="w-full aspect-[380/346] bg-surface-alt rounded-card overflow-hidden">
        <img src={image} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="font-sans font-bold text-[14px] sm:text-[18px] md:text-[24px] text-ink text-center">{label}</span>
    </a>
  )
}
