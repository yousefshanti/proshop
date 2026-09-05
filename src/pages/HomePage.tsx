import HeroCarousel from '../components/HeroCarousel'
import CategoryCard from '../components/CategoryCard'
import ProductGrid from '../components/ProductGrid'
import ProductStrip from '../components/ProductStrip'
import heroSlides from '../data/heroSlides.json'
import categories from '../data/categories.json'
import products from '../data/products.json'

export default function HomePage() {
  const featured = products.slice(0, 3)
  const topRated = products.slice(3, 6)

  return (
    <div>
      <HeroCarousel slides={heroSlides} />

      <div className="max-w-[1640px] mx-auto mt-16 px-6">
        <h2 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mt-8">
          {categories.map((c) => (
            <CategoryCard key={c.label} {...c} />
          ))}
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto mt-24 px-6">
        <h2 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink text-center">Featured Products</h2>
        <div className="mt-8">
          <ProductGrid products={featured} />
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto mt-24 px-6">
        <h2 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Top Rate Products</h2>
        <div className="mt-8">
          <ProductStrip products={topRated} />
        </div>
      </div>
    </div>
  )
}
