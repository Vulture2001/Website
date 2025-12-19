'use client';

import * as React from 'react';
import { cn } from '@lib/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '@styles/carousel.css';

type Props<T> = {
    items: T[];
    children: (item: T, baseIndex: number) => React.ReactNode;
    slideWidth?: string;
    gap?: number;
    ariaLabel?: string;
    autoplay?: boolean;
    autoplayInterval?: number;
    pauseOnHover?: boolean;
};

export function InfiniteCarousel<T>({
                                        items,
                                        children,
                                        slideWidth = 'clamp(320px, 92vw, 520px)',
                                        gap = 16,
                                        ariaLabel = 'Carousel',
                                        autoplay = false,
                                        autoplayInterval = 3000,
                                        pauseOnHover = true,
                                    }: Props<T>) {

    // --- 1. HOOKS MUST COME FIRST (Before any return statements) ---

    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const autoplayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const scrollEndTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    // The "real" number of items
    const n = items.length;

    // --- State ---
    const [active, setActive] = React.useState(0);
    const [hovering, setHovering] = React.useState(false);
    // Tracks if we are "jumping" from a clone to a real slide
    const [isJumping, setIsJumping] = React.useState(false);

    // Tracks the true global index. We start at `n` (the first "real" item).
    // Note: We use a ref for the index to avoid stale closures in event listeners
    const globalIndexRef = React.useRef(n);

    // --- Memoized Slides ---
    // Use the robust [items, items, items] structure
    const slides = React.useMemo(
        () => (n ? [...items, ...items, ...items] : []),
        [items, n]
    );

    // --- Core Functions ---
    const centerSlideAt = React.useCallback(
        (globalIndex: number, behavior: ScrollBehavior = 'smooth') => {
            const el = trackRef.current;
            if (!el) return;
            // Get the specific slide element
            const child = el.children.item(globalIndex) as HTMLElement | null;
            if (!child) return;

            // Calculate the exact left offset needed to center this child
            const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;

            el.scrollTo({ left, behavior });

            globalIndexRef.current = globalIndex;
            const baseIndex = globalIndex % n;
            // Only update state if different to prevent re-renders
            setActive((prev) => (prev !== baseIndex ? baseIndex : prev));
        },
        [n]
    );

    const scrollOne = React.useCallback((dir: 'left' | 'right') => {
        if (isJumping || !n) return; // Don't scroll while jumping or if empty

        const newIndex = globalIndexRef.current + (dir === 'left' ? -1 : 1);
        centerSlideAt(newIndex, 'smooth');
    }, [isJumping, centerSlideAt, n]);


    // --- Effects ---

    // Handle Infinite Scroll Logic
    const handleScroll = React.useCallback(() => {
        const track = trackRef.current;
        if (!track || isJumping || !n) return;

        // 1. Find the new centered slide
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let minDistance = Infinity;
        let newGlobalIndex = globalIndexRef.current;

        // Limit the search loop to avoid performance issues on large DOMs,
        // though strictly strictly speaking checking all children is most accurate.
        for (let i = 0; i < track.children.length; i++) {
            const slide = track.children[i] as HTMLElement;
            const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
            const distance = Math.abs(trackCenter - slideCenter);

            if (distance < minDistance) {
                minDistance = distance;
                newGlobalIndex = i;
            }
        }

        // 2. Update the active state
        if (newGlobalIndex !== globalIndexRef.current) {
            globalIndexRef.current = newGlobalIndex;
            const newActive = newGlobalIndex % n;
            setActive(newActive);
        }

        // 3. Debounce the "jump" check for infinite scroll
        if (scrollEndTimerRef.current) {
            clearTimeout(scrollEndTimerRef.current);
        }

        scrollEndTimerRef.current = setTimeout(() => {
            const i = globalIndexRef.current;

            // Check if we landed on a clone
            if (i < n) {
                // Landed on a "start" clone -> jump forward to real set
                globalIndexRef.current = i + n;
                setIsJumping(true);
            } else if (i >= n * 2) {
                // Landed on an "end" clone -> jump backward to real set
                globalIndexRef.current = i - n;
                setIsJumping(true);
            }
        }, 150); // Wait for scroll to settle

    }, [isJumping, n]);

    // Effect to perform the "jump" (Reset position without animation)
    React.useEffect(() => {
        if (!isJumping) return;

        const timer = setTimeout(() => {
            centerSlideAt(globalIndexRef.current, 'auto');
            setIsJumping(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [isJumping, centerSlideAt]);

    // Effect to center the initial slide on load or when items change
    React.useLayoutEffect(() => {
        if (!n) return; // Guard against empty items

        const el = trackRef.current;
        if (!el) return;

        // Reset to the middle set (first real item)
        globalIndexRef.current = n;

        // Wait for layout paint
        const timeout = setTimeout(() => {
            centerSlideAt(n, 'auto');
            setActive(0);
        }, 0);

        // Recenter on resize
        const ro = new ResizeObserver(() => {
            centerSlideAt(globalIndexRef.current, 'auto');
        });
        ro.observe(el);

        return () => {
            clearTimeout(timeout);
            ro.disconnect();
        };
    }, [centerSlideAt, n]); // Re-run if `n` changes

    // Effect for autoplay
    React.useEffect(() => {
        if (!autoplay || !n) return;

        const stopAutoplay = () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
                autoplayIntervalRef.current = null;
            }
        };

        const startAutoplay = () => {
            stopAutoplay();
            autoplayIntervalRef.current = setInterval(() => {
                scrollOne('right');
            }, autoplayInterval);
        };

        if (pauseOnHover && hovering) {
            stopAutoplay();
        } else {
            startAutoplay();
        }

        return () => stopAutoplay();
    }, [autoplay, autoplayInterval, pauseOnHover, hovering, scrollOne, n]);

    // Effect for keyboard controls
    React.useEffect(() => {
        if (!n) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') scrollOne('left');
            if (e.key === 'ArrowRight') scrollOne('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [scrollOne, n]);


    // --- 2. EARLY RETURN (Must occur AFTER hooks) ---
    if (items.length === 0) return null;

    // --- 3. RENDER ---
    return (
        <div
            className="carousel"
            aria-live="polite"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="carousel-container">
                <div
                    id="infinite-carousel-track"
                    ref={trackRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={ariaLabel}
                    tabIndex={0}
                    className={cn(
                        'carousel-track',
                        // We use inline style for behavior now to be safer,
                        // but keeping class for other CSS properties
                    )}
                    style={{
                        // This handles the "Jumping" logic without needing a separate CSS class injection
                        scrollBehavior: isJumping ? 'auto' : 'smooth'
                    }}
                    onScroll={handleScroll}
                >
                    {slides.map((item, i) => {
                        const baseIdx = i % n;
                        const isActive = globalIndexRef.current === i;

                        return (
                            <div
                                key={`${baseIdx}-${i}`}
                                style={{
                                    width: slideWidth,
                                    paddingLeft: `${gap / 2}px`,
                                    paddingRight: `${gap / 2}px`,
                                }}
                                className={cn(
                                    'carousel-slide',
                                    isActive
                                        ? 'carousel-slide--active'
                                        : 'carousel-slide--inactive'
                                )}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${baseIdx + 1}`}
                                aria-current={isActive ? 'true' : undefined}
                                aria-setsize={n}
                                aria-posinset={baseIdx + 1}
                            >
                                <div className="h-full w-full">
                                    {children(item, baseIdx)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Arrows */}
                <button
                    type="button"
                    aria-label="Previous"
                    aria-controls="infinite-carousel-track"
                    className="carousel-button carousel-button--prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        scrollOne('left');
                    }}
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    type="button"
                    aria-label="Next"
                    aria-controls="infinite-carousel-track"
                    className="carousel-button carousel-button--next"
                    onClick={(e) => {
                        e.stopPropagation();
                        scrollOne('right');
                    }}
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Indicators */}
            <div className="carousel-indicators">
                {items.map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            'carousel-indicator-dot',
                            i === active ? 'carousel-indicator-dot--active' : ''
                        )}
                    />
                ))}
            </div>
        </div>
    );
}