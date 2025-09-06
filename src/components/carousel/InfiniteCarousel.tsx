'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { WhiteCard } from '@/components/ui/WhiteCard';
import '@/styles/carousel.css';

type Props<T> = {
    items: T[];
    renderItem: (item: T, baseIndex: number) => React.ReactNode;
    slideWidth?: string;
    ariaLabel?: string;
};

export function InfiniteCarousel<T>({
                                        items,
                                        renderItem,
                                        slideWidth = 'min(92vw, 520px)',
                                        ariaLabel = 'Carousel',
                                    }: Props<T>) {
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const [active, setActive] = React.useState(0);

    const repeated = React.useMemo(() => (items?.length ? [...items, ...items, ...items] : []), [items]);

    // --- sizing helpers -------------------------------------------------------
    const getSegmentWidth = React.useCallback(() => {
        const el = trackRef.current;
        return el ? el.scrollWidth / 3 : 0;
    }, []);

    const getGapAndWidth = React.useCallback(() => {
        const el = trackRef.current;
        if (!el) return { gap: 0, width: 0 };
        const first = el.querySelector<HTMLElement>('.carousel-slide');
        const second = el.querySelectorAll<HTMLElement>('.carousel-slide')[1];
        const width = first?.clientWidth ?? 0;
        const gap = second && first ? second.offsetLeft - first.offsetLeft - width : 0; // ⭐ measure real gap
        return { gap, width };
    }, []);

    // center a specific slide (by global index in repeated array)
    const centerSlideAt = React.useCallback((globalIndex: number, behavior: ScrollBehavior = 'smooth') => {
        const el = trackRef.current;
        if (!el) return;
        const child = el.children.item(globalIndex) as HTMLElement | null;
        if (!child) return;
        const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2; // ⭐ center math
        el.scrollTo({ left, behavior });
    }, []);

    // find slide nearest to center of viewport
    const computeNearestToCenter = React.useCallback(() => {
        const el = trackRef.current;
        if (!el || !items.length) return { base: 0, global: 0 };
        const seg = getSegmentWidth();
        const startIdx = items.length; // middle segment start
        const from = startIdx - 2;     // check a small window around visible area
        const to = startIdx + items.length + 2;

        const viewCenter = el.scrollLeft + el.clientWidth / 2;
        let best = { dist: Number.POSITIVE_INFINITY, global: startIdx, base: 0 };

        for (let i = from; i < to; i++) {
            const child = el.children.item(i) as HTMLElement | null;
            if (!child) continue;
            const center = child.offsetLeft + child.clientWidth / 2;
            const dist = Math.abs(center - viewCenter);
            if (dist < best.dist) {
                best = { dist, global: i, base: i % items.length };
            }
        }
        return { base: best.base, global: best.global };
    }, [getSegmentWidth, items.length]);

    // normalize scroll into middle segment & set active by nearest center
    const normalizeScroll = React.useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const seg = getSegmentWidth();
        if (!seg) return;

        if (el.scrollLeft <= 1) el.scrollTo({ left: el.scrollLeft + seg, behavior: 'auto' });
        else if (el.scrollLeft >= seg * 2 - 1) el.scrollTo({ left: el.scrollLeft - seg, behavior: 'auto' });

        const { base } = computeNearestToCenter(); // ⭐ robust active detection
        setActive(base);
    }, [getSegmentWidth, computeNearestToCenter]);

    // mount & resize: move to the **centered** first slide in the middle segment
    React.useEffect(() => {
        const el = trackRef.current;
        if (!el || !items.length) return;

        const centerInitial = () => {
            const seg = getSegmentWidth();
            if (!seg) return;
            const firstMiddleIdx = items.length; // first item of middle segment
            centerSlideAt(firstMiddleIdx, 'auto'); // ⭐ center on load
            setActive(0);
        };

        centerInitial();

        const onScroll = () => normalizeScroll();
        el.addEventListener('scroll', onScroll, { passive: true });

        const ro = new ResizeObserver(centerInitial);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', onScroll);
            ro.disconnect();
        };
    }, [items.length, getSegmentWidth, centerSlideAt, normalizeScroll]);

    // buttons: scroll exactly one slide width so snap-center lands perfectly
    const scrollOne = (dir: 'left' | 'right') => {
        const el = trackRef.current;
        if (!el) return;
        const { width, gap } = getGapAndWidth();
        const step = width + gap || Math.min(el.clientWidth * 0.9, 480);
        el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    };

    if (!items?.length) return null;

    return (
        <div className="carousel">
            <div className="carousel-container">
                <div
                    id="infinite-carousel-track"
                    ref={trackRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={ariaLabel}
                    tabIndex={0}
                    className={cn('carousel-track', 'snap-x snap-mandatory')}
                    style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                >
                    {repeated.map((item, i) => {
                        const baseIdx = i % items.length;
                        const isActive = baseIdx === active;
                        return (
                            <div
                                key={`${baseIdx}-${i}`}
                                className={cn(
                                    'carousel-slide snap-center',
                                    isActive ? 'carousel-slide--active' : 'carousel-slide--inactive'
                                )}
                                style={{ width: slideWidth, transitionDuration: '400ms' }}
                                aria-current={isActive ? 'true' : undefined}
                            >
                                <WhiteCard size={"full"}>{renderItem(item, baseIdx)}</WhiteCard>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                type="button"
                aria-label="Previous"
                aria-controls="infinite-carousel-track"
                className="carousel-button carousel-button--prev"
                onClick={(e) => { e.stopPropagation(); scrollOne('left'); }}
            >
                ‹
            </button>
            <button
                type="button"
                aria-label="Next"
                aria-controls="infinite-carousel-track"
                className="carousel-button carousel-button--next"
                onClick={(e) => { e.stopPropagation(); scrollOne('right'); }}
            >
                ›
            </button>
        </div>
    );
}
