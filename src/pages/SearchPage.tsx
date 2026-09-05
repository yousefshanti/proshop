import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const category = searchParams.get('category')

  const results = products.filter((p) => {
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    const matchesCategory = !category || p.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-16">
      <div className="text-center mb-4">
        <h1 className="font-sans font-bold text-[24px] text-ink uppercase tracking-wide inline-block pb-3 border-b-4 border-brand">
          Featured Products
        </h1>
      </div>

      {results.length === 0 ? (
        <p className="text-center font-sans text-[16px] text-muted mt-8">
          No products found{q && <> for "{searchParams.get('q')}"</>}.
        </p>
      ) : (
        <div className="mt-10">
          <ProductGrid products={results} />
        </div>
      )}
    </div>
  )
}
