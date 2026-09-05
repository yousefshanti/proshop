import type { ReactNode } from 'react'
import type { store } from '../store/store'

/* ---------- Domain ---------- */

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  price: number
  rating: number
  reviewCount: number
  countInStock: number
  image: string
  description: string
}

export type CartLine = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  qty: number
}

export type WishlistItem = {
  id: string
  slug: string
  name: string
  price: number
  image: string
}

export type ShippingAddress = {
  country: string
  city: string
  zip: string
  street: string
}

export type PaymentDetails = {
  nameOnCard: string
  cardNumber: string
  expMonth: string
  expYear: string
  cvc: string
}

export type Order = {
  id: string
  lines: CartLine[]
  shipping: ShippingAddress
  payment: PaymentDetails
  subtotal: number
  tax: number
  shipping_cost: number
  total: number
}

export type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

/* ---------- Store ---------- */

export type ProductsState = {
  items: Product[]
}

export type CartState = {
  lines: CartLine[]
}

export type WishlistState = {
  items: WishlistItem[]
}

export type CheckoutState = {
  shipping: ShippingAddress
  payment: PaymentDetails
}

export type OrderState = {
  lastOrder: Order | null
}

export type AuthState = {
  user: User | null
  error: string | null
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/* ---------- Component props ---------- */

export type ProductCardProps = {
  id: string
  slug: string
  name: string
  price: number
  oldPrice?: number
  discountPct?: number
  rating: number
  image: string
}

export type ProductGridProps = {
  products: ProductCardProps[]
}

export type ProductStripProps = {
  products: ProductCardProps[]
}

export type CategoryCardProps = {
  label: string
  image: string
  href: string
}

export type ReviewCardProps = {
  author: string
  date: string
  rating: number
  body: string
}

export type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}

export type IconProps = {
  className?: string
}

export type QuantityStepperProps = {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
}

export type OrderSummaryCardProps = {
  subtotal: number
  tax: number
  shipping: number
  total: number
  ctaLabel: string
  onCta: () => void
}

export type StepIndicatorProps = {
  steps: { n: number; label: string }[]
  current: number
}

export type NotFoundProps = {
  message?: string
  backTo?: string
  backLabel?: string
}

export type Slide = {
  eyebrow: string
  headline: string
  body: string
  cta: string
  href: string
  image: string
}

export type HeroCarouselProps = {
  slides: Slide[]
}

export type Column<T> = {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

export type DataTableProps<T> = {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
}
