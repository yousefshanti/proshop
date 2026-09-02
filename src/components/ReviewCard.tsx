type Props = {
  author: string
  date: string
  rating: number
  body: string
}

export default function ReviewCard({ author, date, rating, body }: Props) {
  return (
    <div className="py-8 border-b border-surface">
      <div className="flex items-center justify-between">
        <p className="font-sans font-bold text-[24px] text-ink">{author}</p>
        <p className="font-sans text-[16px] text-muted">{date}</p>
      </div>
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < Math.round(rating) ? 'text-brand' : 'text-surface'}>★</span>
        ))}
      </div>
      <p className="font-sans text-[16px] text-ink mt-3 leading-[30px]">{body}</p>
    </div>
  )
}
