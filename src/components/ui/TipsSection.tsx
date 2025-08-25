'use client'
import React, { useRef } from 'react'

export default function TipsSection({ tips }: { tips: string[] }) {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const scroll = (dir: 'left' | 'right') => {
        const el = trackRef.current
        if (!el) return
        const step = Math.min(el.clientWidth * 0.9, 480)
        el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
    }

    if (!tips?.length) return null

    return (
        <section>
            <h2 className="text-[40px] font-semibold tracking-tight text-zinc-800 text-center mb-12">
                Tips &amp; Tricks
            </h2>

            <div className="relative">
                {tips.length > 1 && (
                    <>
                        <NavButton side="left" onClick={() => scroll('left')} />
                        <NavButton side="right" onClick={() => scroll('right')} />
                    </>
                )}

                <div
                    ref={trackRef}
                    className="no-scrollbar flex flex-nowrap gap-6 overflow-x-auto snap-x snap-mandatory px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {tips.map((t, i) => (
                        <div key={i} className="snap-start shrink-0 w-[320px] md:w-[400px]">
                            <TipCard text={t} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TipCard({ text }: { text: string }) {
    return (
        <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 h-full">
            <div className="flex items-start gap-3">
                <p className="text-[#282828] leading-7">{text}</p>
            </div>
        </div>
    )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
    const isLeft = side === 'left'
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={isLeft ? 'Previous tips' : 'Next tips'}
            className={`absolute ${isLeft ? '-left-3' : '-right-3'} top-1/2 -translate-y-1/2 z-10
                  rounded-full border border-[#D0D5DD] bg-white w-10 h-10
                  flex items-center justify-center hover:bg-[#F3F4F6] transition shadow-sm`}
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    d={isLeft ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
                    stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}
