'use client';

import * as React from 'react';
import { cn } from '@lib/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // modern icons
import '@styles/carousel.css';

type Props<T> = {
    items: T[];
    children: (item: T, baseIndex: number) => React.ReactNode;
    slideWidth?: string;
    gap?: number;
    ariaLabel?: string;
};

export function InfiniteCarousel<T>({
                                        items,
                                        children,
                                        slideWidth = 'clamp(320px, 92vw, 520px)',
                                        gap = 24,
                                        ariaLabel = 'Carousel',
                                    }: Props<T>) {
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const [active, setActive] = React.useState(0);

    const repeated = React.useMemo(
        () => (items?.length ? [...items, ...items, ...items] : []),
        [items]
    );

    const getSegmentWidth = React.useCallback(() => {
        const el = trackRef.current;
        return el ? el.scrollWidth / 3 : 0;
    }, []);

    const centerSlideAt = React.useCallback(
        (globalIndex: number, behavior: ScrollBehavior = 'smooth') => {
            const el = trackRef.current;
            if (!el) return;
            const child = el.children.item(globalIndex) as HTMLElement | null;
            if (!child) return;
            const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
            el.scrollTo({ left, behavior });
        },
        []
    );

    const computeNearestToCenter = React.useCallback(() => {
        const el = trackRef.current;
        if (!el || !items.length) return { base: 0, global: 0 };
        const startIdx = items.length;
        const viewCenter = el.scrollLeft + el.clientWidth / 2;

        let best = { dist: Number.POSITIVE_INFINITY, global: startIdx, base: 0 };

        for (let i = startIdx - 2; i < startIdx + items.length + 2; i++) {
            const child = el.children.item(i) as HTMLElement | null;
            if (!child) continue;
            const center = child.offsetLeft + child.clientWidth / 2;
            const dist = Math.abs(center - viewCenter);
            if (dist < best.dist)
                best = { dist, global: i, base: i % items.length };
        }
        return { base: best.base, global: best.global };
    }, [items.length]);

    const normalizeScroll = React.useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const seg = getSegmentWidth();
        if (!seg) return;

        const scrollLeft = el.scrollLeft;
        const totalWidth = seg;

        if (scrollLeft <= totalWidth * 0.2) {
            el.scrollTo({ left: scrollLeft + totalWidth, behavior: 'auto' });
        } else if (scrollLeft >= totalWidth * 1.8) {
            el.scrollTo({ left: scrollLeft - totalWidth, behavior: 'auto' });
        }

        const { base } = computeNearestToCenter();
        setActive(base);
    }, [getSegmentWidth, computeNearestToCenter]);

    React.useEffect(() => {
        const el = trackRef.current;
        if (!el || !items.length) return;

        const centerInitial = () => {
            const seg = getSegmentWidth();
            if (!seg) return;
            const firstMiddleIdx = items.length;
            centerSlideAt(firstMiddleIdx, 'auto');
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

    const scrollOne = (dir: 'left' | 'right') => {
        const el = trackRef.current;
        if (!el) return;
        const first = el.querySelector<HTMLElement>('.carousel-slide');
        const width = first?.clientWidth ?? 0;
        const step = width + gap;
        el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    };

    // keyboard navigation
    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') scrollOne('left');
            if (e.key === 'ArrowRight') scrollOne('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    });

    if (!items?.length) return null;

    return (
        <div className="carousel relative flex flex-col items-center" aria-live="polite">
            <div className="carousel-container relative w-full max-w-7xl px-6">
                <div
                    id="infinite-carousel-track"
                    ref={trackRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={ariaLabel}
                    tabIndex={0}
                    className={cn(
                        'carousel-track flex gap-6 md:gap-8 snap-x snap-mandatory scroll-smooth'
                    )}
                >
                    {repeated.map((item, i) => {
                        const baseIdx = i % items.length;
                        const isActive = baseIdx === active;
                        return (
                            <div
                                key={`${baseIdx}-${i}`}
                                className={cn(
                                    'carousel-slide snap-center transition-all duration-300 rounded-2xl',
                                    isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-70'
                                )}
                                style={{ width: slideWidth }}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${baseIdx + 1}`}
                                aria-current={isActive ? 'true' : undefined}
                                aria-setsize={items.length}
                                aria-posinset={baseIdx + 1}
                            >
                                {children(item, baseIdx)}
                            </div>
                        );
                    })}
                </div>

                {/* Arrows */}
                <button
                    type="button"
                    aria-label="Previous"
                    aria-controls="infinite-carousel-track"
                    className="carousel-button absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full p-2 bg-surface shadow hover:bg-primary/10 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        scrollOne('left');
                    }}
                >
                    <ChevronLeft className="h-6 w-6 text-fg" />
                </button>
                <button
                    type="button"
                    aria-label="Next"
                    aria-controls="infinite-carousel-track"
                    className="carousel-button absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full p-2 bg-surface shadow hover:bg-primary/10 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        scrollOne('right');
                    }}
                >
                    <ChevronRight className="h-6 w-6 text-fg" />
                </button>
            </div>

            {/* Indicators */}
            <div className="mt-6 flex gap-2">
                {items.map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            'h-2 w-2 rounded-full transition-all duration-300',
                            i === active ? 'bg-brand-pink scale-125' : 'bg-black/20 scale-100'
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
