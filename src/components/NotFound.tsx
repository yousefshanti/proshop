import { Link } from 'react-router-dom'
import type { NotFoundProps } from '../types'

export default function NotFound({ message = 'Data not found.', backTo = '/', backLabel = 'Back to Home' }: NotFoundProps) {
  return (
    <div className="max-w-[1640px] mx-auto px-6 py-24 text-center">
      <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">{message}</p>
      <Link to={backTo} className="inline-block mt-8 font-sans text-[22px] text-brand">
        {backLabel}
      </Link>
    </div>
  )
}
