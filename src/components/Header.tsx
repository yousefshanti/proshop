import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { UserIcon, WishlistIcon, CartIcon } from './Icon'
import SearchBar from './SearchBar'

export default function Header() {
  const itemCount = useAppSelector((state) => state.cart.lines.reduce((sum, l) => sum + l.qty, 0))
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length)
  const user = useAppSelector((state) => state.auth.user)

  return (
    <header className="sticky top-0 z-50 bg-ink flex items-center px-4 sm:px-6 py-3 md:h-[85px] md:py-0">
      <div className="w-full max-w-[1640px] mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6">
        <Link to="/" className="font-sans font-black text-[32px] md:text-[40px] leading-none shrink-0">
          <span className="text-brand">Pro</span>
          <span className="text-white">Shop</span>
        </Link>

        <SearchBar />

        <nav className="flex items-center gap-4 md:gap-8 shrink-0">
          {user ? (
            <div className="flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
              <Link to="/profile">
                <img src="/assets/profile-avatar.webp" alt={user.name} className="w-6 h-6 rounded-full object-cover" />
              </Link>
              <Link to="/profile" className="hidden sm:inline">{user.name}</Link>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
              <UserIcon className="w-6 h-6" />
              <span className="hidden sm:inline">Login / Sign up</span>
            </Link>
          )}
          <Link to="/wishlist" className="relative flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
            <WishlistIcon className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-0 w-[15px] h-[15px] rounded-full bg-brand text-ink text-[10px] font-sans flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="hidden sm:inline">Wishlist</span>
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center text-white font-sans text-[13px] gap-1 whitespace-nowrap">
            <CartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 right-0 w-[15px] h-[15px] rounded-full bg-brand text-ink text-[10px] font-sans flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
