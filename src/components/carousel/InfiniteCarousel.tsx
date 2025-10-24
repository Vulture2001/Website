'use client';

import * as React from 'react';
import { cn } from '@lib/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '@styles/carousel.css'; // Import your CSS file

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
                                        gap = 16, // Default gap.
                                        ariaLabel = 'Carousel',
                                        autoplay = false,
                                        autoplayInterval = 3000,
                                        pauseOnHover = true,
                                    }: Props<T>) {

    if (items.length === 0) return null;

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
            setActive(baseIndex);
        },
        [n]
    );

    const scrollOne = React.useCallback((dir: 'left' | 'right') => {
        if (isJumping) return; // Don't scroll while jumping

        const newIndex = globalIndexRef.current + (dir === 'left' ? -1 : 1);
        centerSlideAt(newIndex, 'smooth');

    }, [isJumping, centerSlideAt]);


    // --- Effects ---

    // [MODIFIED] This now handles real-time center detection and debounced "jump" logic
    const handleScroll = React.useCallback(() => {
        const track = trackRef.current;
        if (!track || isJumping) return;

        // 1. Find the new centered slide
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let minDistance = Infinity;
        let newGlobalIndex = globalIndexRef.current;

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
                // Landed on a "start" clone (in the first `n` items)
                globalIndexRef.current = i + n;
                setIsJumping(true); // Disable transitions
            } else if (i >= n * 2) {
                // Landed on an "end" clone (in the third `n` items)
                globalIndexRef.current = i - n;
                setIsJumping(true); // Disable transitions
            }
            // No 'else' needed - CSS snap handles centering on "real" slides
        }, 150); // 150ms after the last scroll event

    }, [isJumping, n]);

    // Effect to perform the "jump"
    React.useEffect(() => {
        if (!isJumping) return;

        // In the next tick, perform the jump.
        const timer = setTimeout(() => {
            // Jump instantly (`'auto'`) to the corresponding "real" slide
            centerSlideAt(globalIndexRef.current, 'auto');
            // After the jump, re-enable transitions
            setIsJumping(false);
        }, 0); // Using 0ms timeout to wait for next paint cycle

        return () => clearTimeout(timer);
    }, [isJumping, centerSlideAt]);


    // Effect to center the initial slide on load and resize
    React.useLayoutEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const centerInitial = () => {
            // Start at the first "real" item (index `n`)
            centerSlideAt(n, 'auto');
            setActive(0);
        };

        centerInitial();

        // Recenter on resize to the *current* slide
        const ro = new ResizeObserver(() => {
            centerSlideAt(globalIndexRef.current, 'auto');
        });
        ro.observe(el);
        return () => ro.disconnect();

    }, [centerSlideAt, n]);

    // Effect for autoplay
    React.useEffect(() => {
        if (!autoplay) return;

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
    }, [autoplay, autoplayInterval, pauseOnHover, hovering, scrollOne]);

    // Effect for keyboard controls
    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') scrollOne('left');
            if (e.key === 'ArrowRight') scrollOne('right');
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [scrollOne]);

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
                        !isJumping && 'scroll-smooth'
                    )}
                    onScroll={handleScroll}
                >
                    {slides.map((item, i) => {
                        const baseIdx = i % n;
                        // [MODIFIED] Simplified active check
                        const isActive = globalIndexRef.current === i;

                        return (
                            <div
                                key={`${baseIdx}-${i}`}
                                style={{
                                    width: slideWidth,
                                    paddingLeft: `${gap / 2}px`,
                                    paddingRight: `${gap / 2}px`,
                                }}
                                // [MODIFIED] Simplified className
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
                                {/* This inner div is what your `children` renders into */}
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

// --- Style injection for .scroll-smooth ---
const styles = `
.scroll-smooth {
  scroll-behavior: smooth;
}
`;

if (typeof window !== 'undefined') {
    if (!document.getElementById('carousel-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'carousel-styles';
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
}