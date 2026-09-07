import type { ProductStripProps } from '../types'

export default function ProductStrip({ products }: ProductStripProps) {
  return (
    <div className="border border-brand rounded-card grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-surface">
      {products.map((p) => (
        <a key={p.id} href={`/product/${p.slug}`} className="p-8 flex gap-6 items-center">
          <div className="w-[150px] aspect-[375/216] shrink-0 bg-surface-alt overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-sans text-[16px] text-ink">{p.name}</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(p.rating) ? 'text-brand' : 'text-surface'}>★</span>
              ))}
            </div>
            <p className="font-sans font-bold text-[16px] text-ink mt-2">${p.price}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
