import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { SearchIcon } from './Icon'

const MIN_CHARS = 3

export default function SearchBar() {
  const navigate = useNavigate()
  const products = useAppSelector((state) => state.products.items)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const q = query.trim().toLowerCase()
  const results =
    q.length >= MIN_CHARS
      ? products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0, 8)
      : []

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setOpen(false)
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search')
  }

  function goToProduct(slug: string) {
    setOpen(false)
    setQuery('')
    navigate(`/product/${slug}`)
  }

  return (
    <div
      ref={rootRef}
      className="relative order-3 md:order-none basis-full md:basis-auto w-full md:w-auto md:flex-1 min-w-0 md:max-w-[861px]"
    >
      <form onSubmit={handleSubmit} className="flex items-center w-full h-10 rounded-input bg-white overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products..."
          className="flex-1 min-w-0 h-full px-4 font-sans text-[16px] sm:text-[13px] bg-white text-ink outline-none"
        />
        <button
          type="submit"
          className="shrink-0 h-full px-3 sm:px-6 bg-brand font-sans font-bold text-[16px] text-ink flex items-center gap-2"
        >
          <SearchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {open && q.length >= MIN_CHARS && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-input shadow-lg z-50 max-h-[420px] overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-3 font-sans text-[14px] text-muted">No products found for "{query.trim()}".</p>
          ) : (
            results.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goToProduct(p.slug)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-alt text-left"
              >
                <img src={p.image} alt="" className="w-10 h-10 object-contain shrink-0" />
                <span className="flex-1 min-w-0 font-sans text-[14px] text-ink truncate">{p.name}</span>
                <span className="font-sans text-[14px] font-bold text-ink shrink-0">${p.price}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
