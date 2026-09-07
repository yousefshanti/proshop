import ProductCard from './ProductCard'
import type { ProductGridProps } from '../types'

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  )
}
