import ProductCard from './ProductCard'

type Product = {
  id: string
  slug: string
  name: string
  price: number
  oldPrice?: number
  discountPct?: number
  rating: number
  image: string
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-10 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 520px))' }}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  )
}
