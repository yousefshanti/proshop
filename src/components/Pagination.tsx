import type { PaginationProps } from '../types'

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 font-sans text-[15px]">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="h-10 px-4 rounded-input border border-surface disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`h-10 w-10 rounded-input border border-surface ${n === page ? 'bg-brand font-bold' : ''}`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="h-10 px-4 rounded-input border border-surface disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}
