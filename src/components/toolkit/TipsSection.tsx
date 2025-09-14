'use client'
import React, { useEffect, useMemo, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function TipsSection({ tips }: { tips: string[] }) {
    const trackRef = useRef<HTMLDivElement | null>(null)

    // Repeat tips 3x for seamless infinite loop
    const repeatedTips = useMemo(() => {
        if (!tips?.length) return []
        return [...tips, ...tips, ...tips]
    }, [tips])

    const getSegmentWidth = useCallback(() => {
        const el = trackRef.current
        return el ? el.scrollWidth / 3 : 0
    }, [])

    const normalizeScroll = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const segment = getSegmentWidth()
        if (!segment) return

        if (el.scrollLeft <= 1) {
            el.scrollTo({ left: el.scrollLeft + segment, behavior: 'auto' })
        } else if (el.scrollLeft >= segment * 2 - 1) {
            el.scrollTo({ left: el.scrollLeft - segment, behavior: 'auto' })
        }
    }, [getSegmentWidth])

    useEffect(() => {
        const el = trackRef.current
        if (!el || !tips?.length) return

        const centerOnMiddle = () => {
            const segment = getSegmentWidth()
            el.scrollTo({ left: segment, behavior: 'auto' })
        }

        centerOnMiddle()

        el.addEventListener('scroll', normalizeScroll, { passive: true })
        const ro = new ResizeObserver(centerOnMiddle)
        ro.observe(el)

        return () => {
            el.removeEventListener('scroll', normalizeScroll)
            ro.disconnect()
        }
    }, [tips?.length, getSegmentWidth, normalizeScroll])

    const scroll = (dir: 'left' | 'right') => {
        const el = trackRef.current
        if (!el) return
        const step = Math.min(el.clientWidth * 0.9, 480)
        el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
    }

    if (!tips?.length) return null

    return (
        <section>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg text-center mb-12">
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
                >
                    {repeatedTips.map((t, i) => (
                        <motion.div
                            key={i}
                            className="snap-start shrink-0 w-[320px] md:w-[400px]"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (i % tips.length) * 0.05 }}
                        >
                            <TipCard text={t} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TipCard({ text }: { text: string }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5 h-full transition hover:shadow-md hover:-translate-y-1 duration-200">
            <p className="text-fg leading-relaxed text-[15px]">{text}</p>
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
            className={`absolute ${isLeft ? '-left-4' : '-right-4'} top-1/2 -translate-y-1/2 z-10
        rounded-full border border-border bg-surface w-11 h-11
        flex items-center justify-center hover:bg-surface-hover transition shadow-md focus:outline-none focus:ring-2 focus:ring-primary`}
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    d={isLeft ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}
