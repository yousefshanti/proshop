import type { MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { toggleWishlist } from '../store/wishlistSlice'
import { WishlistIcon } from './Icon'
import type { ProductCardProps } from '../types'

export default function ProductCard({ id, slug, name, price, oldPrice, discountPct, rating, image }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const isWishlisted = useAppSelector((state) => state.wishlist.items.some((i) => i.id === id))

  function handleAddToCart(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ item: { id, slug, name, price, image } }))
  }

  function handleToggleWishlist(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleWishlist({ id, slug, name, price, image }))
  }

  return (
    <a href={`/product/${slug}`} className="w-full max-w-[520px] h-full bg-white rounded-card relative flex flex-col pb-6">
      {discountPct && (
        <span className="absolute top-[19px] right-[29px] w-[87px] h-[87px] rounded-full bg-danger text-white font-sans font-bold text-[24px] flex items-center justify-center">
          -{discountPct}%
        </span>
      )}
      <div className="w-[calc(100%-14px)] aspect-[513/342] mx-auto mt-[35px] bg-surface-alt overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="px-[27px] mt-[34px] flex-1 flex flex-col">
        <p className="font-sans text-[24px] text-ink line-clamp-2 min-h-[65px]">{name}</p>
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
      <div className="flex gap-3 mx-[27px] mt-6">
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`w-[62px] h-[62px] shrink-0 border rounded-btn flex items-center justify-center ${
            isWishlisted ? 'bg-brand border-brand text-ink' : 'border-surface text-ink'
          }`}
        >
          <WishlistIcon className="w-6 h-6" />
        </button>
        <button onClick={handleAddToCart} className="flex-1 h-[62px] bg-surface rounded-btn font-sans text-[24px] text-ink">
          Add to cart
        </button>
      </div>
    </a>
  )
}
