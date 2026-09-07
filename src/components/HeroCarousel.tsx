import { useState } from 'react'
import type { HeroCarouselProps } from '../types'

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const slide = slides[active]

  const prev = () => setActive((active - 1 + slides.length) % slides.length)
  const next = () => setActive((active + 1) % slides.length)

  return (
    <div className="bg-surface flex items-center py-8 md:py-16">
      <div className="w-full max-w-[1640px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <p className="font-sans font-light text-[18px] sm:text-[24px] md:text-[32px] text-ink min-h-[24px] sm:min-h-[32px] md:min-h-[40px] line-clamp-1">{slide.eyebrow}</p>
            <h1 className="font-sans font-black text-[32px] sm:text-[44px] md:text-[60px] text-ink mt-2 min-h-[40px] sm:min-h-[54px] md:min-h-[72px] line-clamp-1">{slide.headline}</h1>
            <p className="font-sans font-light text-[16px] sm:text-[22px] md:text-[32px] text-ink mt-2 max-w-[600px] min-h-[44px] sm:min-h-[60px] md:min-h-[80px] line-clamp-2">{slide.body}</p>
            <a
              href={slide.href}
              className="inline-block mt-6 md:mt-8 w-[220px] h-[56px] leading-[56px] text-center bg-brand rounded-pill font-sans text-[22px] text-ink"
            >
              {slide.cta}
            </a>
          </div>

          <div className="w-full max-w-[500px] h-[220px] sm:h-[320px] md:h-[420px] mx-auto">
            <img src={slide.image} alt={slide.headline} className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-16">
          <button onClick={prev} aria-label="Previous slide" className="font-sans text-[32px] font-black text-ink leading-none">‹</button>
          <div className="flex gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-4 h-4 rounded-full ${i === active ? 'bg-brand' : 'bg-grey-300'}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next slide" className="font-sans text-[32px] font-black text-ink leading-none">›</button>
        </div>
      </div>
    </div>
  )
}
