import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import QuantityStepper from '../components/QuantityStepper'
import ReviewCard from '../components/ReviewCard'
import ProductGrid from '../components/ProductGrid'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import products from '../data/products.json'
import reviews from '../data/reviews.json'

const colorSwatches = ['#F0C8A0', '#F5F5F5', '#5B6B5E']

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [activeImage, setActiveImage] = useState(0)
  const dispatch = useAppDispatch()

  if (!product) {
    return <div className="p-10">Product not found.</div>
  }

  const gallery = product.gallery ?? [product.image]
  const productReviews = reviews.filter((r) => r.productId === product.id)
  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <Breadcrumb label={product.name} />

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <div className="aspect-square bg-surface-alt rounded-card overflow-hidden">
            <img src={gallery[activeImage]} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-4 mt-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={`w-[142px] aspect-square bg-surface-alt rounded-card overflow-hidden border-2 ${
                  activeImage === i ? 'border-brand' : 'border-transparent'
                }`}
              >
                <img src={src} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start gap-4">
            <h1 className="font-sans font-bold text-[32px] text-ink">{product.name}</h1>
            <p className="font-sans font-bold text-[32px] text-ink shrink-0">${product.price}</p>
          </div>

          <div className="mt-6">
            <QuantityStepper value={qty} max={product.countInStock} onChange={setQty} />
          </div>

          {product.options?.map((opt) => {
            const current = selected[opt.label] ?? opt.values[0]
            const isColor = opt.label === 'Color'
            return (
              <div key={opt.label} className="mt-6">
                <p className="font-sans text-[16px] text-ink">
                  {opt.label} : <span className="font-sans font-bold">{current}</span>
                </p>
                <div className="flex gap-3 mt-2">
                  {opt.values.map((v, i) =>
                    isColor ? (
                      <button
                        key={v}
                        onClick={() => setSelected((s) => ({ ...s, [opt.label]: v }))}
                        aria-label={v}
                        style={{ backgroundColor: colorSwatches[i % colorSwatches.length] }}
                        className={`w-10 h-10 rounded-full border-2 ${current === v ? 'border-ink' : 'border-transparent'}`}
                      />
                    ) : (
                      <button
                        key={v}
                        onClick={() => setSelected((s) => ({ ...s, [opt.label]: v }))}
                        className={`px-5 py-2 rounded-btn font-sans font-bold text-[16px] ${
                          current === v ? 'bg-ink text-white' : 'bg-surface text-ink'
                        }`}
                      >
                        {v}
                      </button>
                    )
                  )}
                </div>
              </div>
            )
          })}

          <div className="flex gap-4 mt-8">
            <button
              aria-label="Save for later"
              className="w-[62px] h-[62px] shrink-0 border border-surface rounded-btn flex items-center justify-center text-[20px] text-ink"
            >
              ♡
            </button>
            <button
              onClick={() => dispatch(addToCart({ item: { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image }, qty }))}
              className="flex-1 max-w-[324px] h-[62px] bg-brand rounded-btn font-sans font-bold text-[24px] text-ink"
            >
              Add To Cart
            </button>
          </div>

          <p className="font-sans text-[16px] text-muted mt-8 leading-[30px]">{product.description}</p>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-sans font-bold text-[32px] text-ink">Specification</h2>
        <p className="font-sans font-bold text-[24px] text-ink mt-6">Technical Details</p>
        <div className="grid sm:grid-cols-2 gap-x-10 mt-4">
          {product.specs?.map((s) => (
            <div key={s.label} className="flex justify-between py-3 border-b border-surface">
              <span className="font-sans text-[16px] text-muted">{s.label}:</span>
              <span className="font-sans text-[16px] text-ink">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-sans font-bold text-[32px] text-ink">Reviews</h2>
        <div className="mt-6">
          {productReviews.length === 0 && (
            <p className="font-sans text-[16px] text-muted">No reviews yet.</p>
          )}
          {productReviews.map((r) => (
            <ReviewCard key={r.author + r.date} author={r.author} date={r.date} rating={r.rating} body={r.body} />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-sans font-bold text-[32px] text-ink text-center">Featured Products</h2>
        <div className="mt-8">
          <ProductGrid products={related} />
        </div>
      </div>
    </div>
  )
}
