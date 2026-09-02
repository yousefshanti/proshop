import type { MouseEvent } from 'react'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'

type Props = {
  id: string
  slug: string
  name: string
  price: number
  oldPrice?: number
  discountPct?: number
  rating: number
  image: string
}

export default function ProductCard({ id, slug, name, price, oldPrice, discountPct, rating, image }: Props) {
  const dispatch = useAppDispatch()

  function handleAddToCart(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ item: { id, slug, name, price, image } }))
  }

  return (
    <a href={`/product/${slug}`} className="w-full max-w-[520px] bg-white rounded-card relative flex flex-col pb-6">
      {discountPct && (
        <span className="absolute top-[19px] right-[29px] w-[87px] h-[87px] rounded-full bg-danger text-white font-sans font-bold text-[24px] flex items-center justify-center">
          -{discountPct}%
        </span>
      )}
      <div className="w-[calc(100%-14px)] aspect-[513/342] mx-auto mt-[35px] bg-surface-alt overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="px-[27px] mt-[34px]">
        <p className="font-sans text-[24px] text-ink">{name}</p>
        <div className="flex gap-1 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.round(rating) ? 'text-brand' : 'text-surface'}>★</span>
          ))}
        </div>
        <div className="flex items-baseline gap-3 mt-2">
          {oldPrice && (
            <span className="font-sans font-bold text-[30px] text-ink line-through">${oldPrice}</span>
          )}
          <span className={`font-sans font-bold text-[30px] ${oldPrice ? 'text-danger' : 'text-ink'}`}>${price}</span>
        </div>
      </div>
      <button onClick={handleAddToCart} className="mx-[27px] mt-6 h-[62px] bg-surface rounded-btn font-sans text-[24px] text-ink">
        Add to cart
      </button>
    </a>
  )
}
