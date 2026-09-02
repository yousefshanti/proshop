import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function Header() {
  const itemCount = useAppSelector((state) => state.cart.lines.reduce((sum, l) => sum + l.qty, 0))

  return (
    <header className="sticky top-0 z-50 h-[85px] bg-ink flex items-center px-6">
      <div className="w-full max-w-[1640px] mx-auto flex items-center justify-between gap-6">
        <Link to="/" className="font-sans font-black text-[40px] leading-none shrink-0">
          <span className="text-brand">Pro</span>
          <span className="text-white">Shop</span>
        </Link>

        <div className="flex items-center gap-2 flex-1 min-w-0 max-w-[861px]">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 min-w-0 max-w-[705px] h-10 rounded-input px-4 font-sans text-[13px] bg-white text-ink"
          />
          <button className="w-[152px] shrink-0 h-10 bg-brand rounded-input font-sans font-bold text-[16px] text-ink">
            Search
          </button>
        </div>

        <nav className="flex items-center gap-4 md:gap-8 shrink-0">
          <Link to="/login" className="flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
            <span className="w-6 h-6 bg-white/20 rounded-full" />
            Login / Sign up
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
            <span className="w-6 h-6 bg-white/20 rounded-full" />
            Wishlist
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
            <span className="w-6 h-6 bg-white/20 rounded-full" />
            {itemCount > 0 && (
              <span className="absolute -top-1 right-0 w-[15px] h-[15px] rounded-full bg-brand text-ink text-[10px] font-sans flex items-center justify-center">
                {itemCount}
              </span>
            )}
            Cart
          </Link>
        </nav>
      </div>
    </header>
  )
}
