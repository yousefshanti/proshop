import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ProductStrip from '../components/ProductStrip'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { removeFromWishlist } from '../store/wishlistSlice'
import products from '../data/products.json'

export default function WishlistPage() {
  const items = useAppSelector((state) => state.wishlist.items)
  const dispatch = useAppDispatch()

  if (items.length === 0) {
    return (
      <div className="max-w-[1640px] mx-auto px-6 py-10">
        <Breadcrumb label="Wishlist" />
        <div className="text-center mt-24">
          <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Your wishlist is empty</p>
          <Link
            to="/"
            className="inline-block mt-8 w-[220px] h-[56px] leading-[56px] text-center bg-brand rounded-pill font-sans text-[22px] text-ink"
          >
            Keep Shopping
          </Link>
        </div>

        <div className="mt-24">
          <h2 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Recently viewed</h2>
          <div className="mt-8">
            <ProductStrip products={products.slice(0, 3)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <Breadcrumb label="Wishlist" />

      <div className="flex flex-col gap-6 mt-10">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:contents">
              <div className="w-20 h-20 sm:w-[152px] sm:h-auto sm:aspect-[304/203] shrink-0 bg-surface-alt rounded-card overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <Link
                to={`/product/${item.slug}`}
                className="font-sans font-bold text-[16px] sm:text-[24px] text-ink flex-1 min-w-[140px] line-clamp-2 sm:line-clamp-none"
              >
                {item.name}
              </Link>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-normal">
              <p className="font-sans font-bold text-[20px] sm:text-[30px] text-ink sm:w-[120px] text-right">
                ${item.price}
              </p>
              <button
                onClick={() => dispatch(addToCart({ item }))}
                className="h-10 px-4 bg-brand rounded-input font-sans font-bold text-[14px] text-ink whitespace-nowrap"
              >
                Add to cart
              </button>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                aria-label="Remove from wishlist"
                className="text-[24px] text-muted"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
