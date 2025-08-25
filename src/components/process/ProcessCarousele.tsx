'use client'
import * as React from 'react'
import { cn } from '@/lib/cn'
import { TeamCard, TeamCardProps } from '@/components/about/TeamCard'

/* ---- Mock data ---- */
const TEAM: TeamCardProps['team'] = [
    { name: 'Monika Zielińska', role: 'Masters Thesis Author & Framework Developer',
        avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/c9063031171b997d3eff2be109286f9cbcc44804?width=75',
        statusColor: '#20C997' },
    { name: 'Lisi', role: 'Thesis Advisor',
        avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/3b325f6b5bb49352759c8fe3c84df50113f8b553?width=75',
        statusColor: '#FD7E14' },
    { name: 'Stephan', role: 'Thesis Supervisor',
        avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/b513a6ac364625b112024254538ce20b34942261?width=75',
        statusColor: '#9D9FA1' },
]

const BASE_CARDS: TeamCardProps[] = [
    { title: 'Explore Team', team: TEAM },
    { title: 'Frame Team', team: TEAM },
    { title: 'Prototype Team', team: TEAM },
    { title: 'Plan Team', team: TEAM },
    { title: 'Develop Team', team: TEAM },
    { title: 'Guidelines Team', team: TEAM },
    { title: 'Research Team', team: TEAM },
]

/* ---- Infinite by tripling ---- */
const REPEAT = 3
const CARDS = Array.from({ length: REPEAT }, () => BASE_CARDS).flat()
const N = BASE_CARDS.length
const MID = N // start index of the middle block

export function TeamCardsCarousel() {
    const trackRef = React.useRef<HTMLDivElement | null>(null)

    // state + refs that must not go stale in closures
    const [active, setActive] = React.useState(0)      // base index 0..N-1
    const activeRef = React.useRef(0)
    React.useEffect(() => { activeRef.current = active }, [active])

    const itemW = React.useRef(0)
    const gap = React.useRef(0)
    const blockW = React.useRef(0)
    const wrapGuard = React.useRef(false)              // prevents wrap loops

    /* ---------- helpers ---------- */
    const measure = (el: HTMLElement) => {
        const first = el.children[0] as HTMLElement | undefined
        if (!first) return false
        itemW.current = first.clientWidth
        const styles = getComputedStyle(el)
        const g = parseFloat(styles.getPropertyValue('gap') || styles.getPropertyValue('column-gap') || '0') || 0
        gap.current = isNaN(g) ? 0 : g
        blockW.current = N * itemW.current + (N - 1) * gap.current
        return true
    }

    const centerLeftForIndex = (el: HTMLElement, globalIndex: number) => {
        const child = el.children.item(globalIndex) as HTMLElement | null
        if (!child) return el.scrollLeft
        const w = child.clientWidth || itemW.current
        return child.offsetLeft - (el.clientWidth - w) / 2
    }

    const scrollToBaseIndex = (el: HTMLElement, baseIndex: number, behavior: ScrollBehavior = 'smooth') => {
        const gi = MID + ((baseIndex % N) + N) % N
        el.scrollTo({ left: centerLeftForIndex(el, gi), behavior })
    }

    const next = () => { const el = trackRef.current; if (el) scrollToBaseIndex(el, activeRef.current + 1) }
    const prev = () => { const el = trackRef.current; if (el) scrollToBaseIndex(el, activeRef.current - 1) }

    /* ---------- init (wait for children) ---------- */
    React.useEffect(() => {
        let raf = 0
        const init = () => {
            const el = trackRef.current
            if (!el || el.children.length === 0) { raf = requestAnimationFrame(init); return }
            if (!measure(el)) { raf = requestAnimationFrame(init); return }
            // land in the middle block, center first item (no animation)
            el.scrollTo({ left: centerLeftForIndex(el, MID), behavior: 'auto' })
            setActive(0); activeRef.current = 0
        }
        raf = requestAnimationFrame(init)
        return () => cancelAnimationFrame(raf)
    }, [])

    /* ---------- resize: debounce & do not recenter unless needed ---------- */
    React.useEffect(() => {
        const el = trackRef.current
        if (!el) return
        let t: any
        const ro = new ResizeObserver(() => {
            clearTimeout(t)
            t = setTimeout(() => {
                if (!measure(el)) return
                // keep current active centered (no animation)
                el.scrollTo({ left: centerLeftForIndex(el, MID + activeRef.current), behavior: 'auto' })
            }, 120) // debounce to avoid “self scroll” while things settle
        })
        ro.observe(el)
        return () => { clearTimeout(t); ro.disconnect() }
    }, [])

    /* ---------- onScroll: wrap once, then compute active ---------- */
    React.useEffect(() => {
        const el = trackRef.current
        if (!el) return
        let ticking = false

        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const bW = blockW.current
                if (bW) {
                    if (!wrapGuard.current) {
                        if (el.scrollLeft < bW * 0.25) {
                            wrapGuard.current = true
                            el.scrollLeft += bW
                            // release guard next frame
                            requestAnimationFrame(() => { wrapGuard.current = false })
                            ticking = false
                            return
                        } else if (el.scrollLeft > bW * 1.75) {
                            wrapGuard.current = true
                            el.scrollLeft -= bW
                            requestAnimationFrame(() => { wrapGuard.current = false })
                            ticking = false
                            return
                        }
                    }
                    // compute active (closest to center)
                    const stride = itemW.current + gap.current
                    const center = el.scrollLeft + el.clientWidth / 2
                    const offsetWithinBlock = ((center % bW) + bW) % bW
                    const idxInBlock = Math.round((offsetWithinBlock - itemW.current / 2) / stride)
                    const base = Math.min(N - 1, Math.max(0, idxInBlock))
                    if (base !== activeRef.current) {
                        activeRef.current = base
                        setActive(base)
                    }
                }
                ticking = false
            })
        }

        el.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => el.removeEventListener('scroll', onScroll)
    }, [])

    /* ---------- keep scroll inside track ---------- */
    const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const el = trackRef.current; if (!el) return
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault()
            el.scrollLeft += e.deltaY
        }
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next() }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
    }
    const stop = (e: React.SyntheticEvent) => { e.preventDefault(); e.stopPropagation() }

    return (
        <div className="relative w-full" onClickCapture={(e) => e.stopPropagation()}>
            <div className="mx-auto w-full max-w-[1280px] px-4">
                <div
                    ref={trackRef}
                    tabIndex={0}
                    onWheel={onWheel}
                    onKeyDown={onKeyDown}
                    className="
            flex gap-8 overflow-x-auto overflow-y-hidden
            overscroll-x-contain touch-pan-x
            [scrollbar-width:none] [-ms-overflow-style:none]
            focus:outline-none
          "
                    style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                    aria-roledescription="carousel"
                >
                    {CARDS.map((props, i) => {
                        const baseIdx = ((i - MID) % N + N) % N
                        const isActive = baseIdx === active
                        return (
                            <div
                                key={`${props.title}-${i}`}
                                className={cn(
                                    'shrink-0 transition-all duration-400',
                                    isActive ? 'opacity-100 scale-100 z-10' : 'opacity-60 scale-95'
                                )}
                                style={{ width: 'min(92vw, 520px)' }}
                            >
                                <TeamCard {...props} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* arrows */}
            <button
                type="button"
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] pointer-events-auto
                   grid h-10 w-10 place-items-center rounded-full border border-black/10
                   bg-white/80 backdrop-blur shadow-sm hover:bg-white"
                onPointerDown={stop}
                onClick={(e) => { stop(e); prev() }}
            >
                ‹
            </button>
            <button
                type="button"
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] pointer-events-auto
                   grid h-10 w-10 place-items-center rounded-full border border-black/10
                   bg-white/80 backdrop-blur shadow-sm hover:bg-white"
                onPointerDown={stop}
                onClick={(e) => { stop(e); next() }}
            >
                ›
            </button>
        </div>
    )
}
