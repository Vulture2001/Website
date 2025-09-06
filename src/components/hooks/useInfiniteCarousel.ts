'use client'

import * as React from 'react'

type Options = {
    /** number of unique items */
    count: number
    /** how many times to repeat the items (default 3) */
    repeat?: number
}

export function useInfiniteCarousel({ count, repeat = 3 }: Options) {
    const trackRef = React.useRef<HTMLDivElement | null>(null)

    const [active, setActive] = React.useState(0) // 0..count-1
    const activeRef = React.useRef(0)
    React.useEffect(() => { activeRef.current = active }, [active])

    const itemW = React.useRef(0)
    const gap = React.useRef(0)
    const blockW = React.useRef(0)
    const ready = React.useRef(false)
    const wrapGuard = React.useRef(false)

    const MID = count // start index of the middle block in a 3x array

    const measure = React.useCallback((el: HTMLElement) => {
        const first = el.children[0] as HTMLElement | undefined
        if (!first) return false

        itemW.current = first.clientWidth

        const styles = getComputedStyle(el)
        const gStr = styles.getPropertyValue('gap') || styles.getPropertyValue('column-gap') || '0'
        const g = parseFloat(gStr)
        gap.current = Number.isFinite(g) ? g : 0

        blockW.current = count * itemW.current + (count - 1) * gap.current
        return itemW.current > 0
    }, [count])

    const centerLeftForIndex = React.useCallback((el: HTMLElement, globalIndex: number) => {
        const child = el.children.item(globalIndex) as HTMLElement | null
        if (!child) return el.scrollLeft
        const w = child.clientWidth || itemW.current
        return child.offsetLeft - (el.clientWidth - w) / 2
    }, [])

    const scrollToBaseIndex = React.useCallback(
        (baseIndex: number, behavior: ScrollBehavior = 'smooth') => {
            const el = trackRef.current
            if (!el || !ready.current) return
            const normalized = ((baseIndex % count) + count) % count
            const globalIndex = MID + normalized
            const left = centerLeftForIndex(el, globalIndex)
            el.scrollTo({ left, behavior })
        },
        [count, MID, centerLeftForIndex]
    )

    const next = React.useCallback(() => scrollToBaseIndex(activeRef.current + 1), [scrollToBaseIndex])
    const prev = React.useCallback(() => scrollToBaseIndex(activeRef.current - 1), [scrollToBaseIndex])

    // init
    React.useLayoutEffect(() => {
        const el = trackRef.current
        if (!el) return
        let raf = requestAnimationFrame(() => {
            const didMeasure = measure(el)
            const kickOff = () => {
                const left = centerLeftForIndex(el, MID) // center first item of middle block
                el.scrollTo({ left, behavior: 'auto' })
                ready.current = true
                activeRef.current = 0
                setActive(0)
            }
            if (!didMeasure) {
                raf = requestAnimationFrame(() => { if (!measure(el)) return; kickOff() })
                return
            }
            kickOff()
        })
        return () => cancelAnimationFrame(raf)
    }, [measure, centerLeftForIndex, MID])

    // resize
    React.useEffect(() => {
        const el = trackRef.current
        if (!el) return
        let t: number | undefined
        const ro = new ResizeObserver(() => {
            if (t) clearTimeout(t)
            t = window.setTimeout(() => {
                if (!measure(el)) return
                const gi = MID + activeRef.current
                el.scrollTo({ left: centerLeftForIndex(el, gi), behavior: 'auto' })
            }, 120)
        })
        ro.observe(el)
        return () => { if (t) clearTimeout(t); ro.disconnect() }
    }, [measure, centerLeftForIndex, MID])

    // scroll listener
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
                    // wrap to middle block to keep indices stable
                    if (!wrapGuard.current) {
                        if (el.scrollLeft < bW * 0.25) {
                            wrapGuard.current = true
                            el.scrollLeft += bW
                            requestAnimationFrame(() => { wrapGuard.current = false })
                            ticking = false
                            return
                        }
                        if (el.scrollLeft > bW * 1.75) {
                            wrapGuard.current = true
                            el.scrollLeft -= bW
                            requestAnimationFrame(() => { wrapGuard.current = false })
                            ticking = false
                            return
                        }
                    }
                    // compute active index (closest to center)
                    const stride = itemW.current + gap.current
                    const center = el.scrollLeft + el.clientWidth / 2
                    const offsetWithinBlock = ((center % bW) + bW) % bW
                    const idxInBlock = Math.round((offsetWithinBlock - itemW.current / 2) / stride)
                    const base = Math.min(count - 1, Math.max(0, idxInBlock))
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
    }, [count])

    return {
        trackRef,
        active,
        next,
        prev,
        MID,
        repeat,
    }
}
