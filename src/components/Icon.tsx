import type { IconProps } from '../types'

export function UserIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
    </svg>
  )
}

export function WishlistIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function SearchIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.5-4.5" strokeLinecap="round" />
    </svg>
  )
}

export function CartIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2.25 3a.75.75 0 0 1 .75-.75h1.386c.51 0 .955.343 1.087.835l.383 1.437H21a.75.75 0 0 1 .728.929l-1.5 6a.75.75 0 0 1-.728.571H7.313l.311 1.171a.375.375 0 0 0 .363.279h9.263a.75.75 0 0 1 0 1.5H7.987a1.875 1.875 0 0 1-1.816-1.393L3.85 4.5H3a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
      <path d="M8.25 21a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM17.25 21a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
    </svg>
  )
}
