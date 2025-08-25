'use client'
import React, { useId } from 'react'
import { cn } from '@/lib/cn'

type GradientProps = {
    /** Fill gradient start HEX, e.g. '#B7CFFF' */
    from: string
    /** Fill gradient end HEX, e.g. '#8BB3FF' */
    to: string
    /** SVG width/height. Accepts number (px) or any CSS length string. */
    width?: number | string
    height?: number | string

    /** Overall opacity of the ellipse fill (0..1). Default 1 */
    opacity?: number
    /** Blur strength for the glow, SVG stdDeviation. Default 150 */
    blur?: number

    /** Ellipse geometry (defaults match your “blue” blob) */
    cx?: number
    cy?: number
    rx?: number
    ry?: number

    /** Optional className to position/size via Tailwind */
    className?: string
}

/**
 * Parametric blurred gradient blob (SVG).
 * - Unique filter/gradient IDs per instance (useId).
 * - Pass HEX colors + width/height directly.
 */
export function Gradient({
                             from,
                             to,
                             width = '100rem',
                             height = '60rem',
                             opacity = 1,
                             blur = 150,
                             cx = 545.549,
                             cy = 737.5,
                             rx = 388.549,
                             ry = 264.5,
                             className,
                         }: GradientProps) {
    const uid = useId()
    const filterId = `grad-filter-${uid}`
    const gradId = `grad-fill-${uid}`

    // If width/height are numbers, SVG treats them as px; strings allow rem/vw/etc.
    const wAttr = typeof width === 'number' ? width : width
    const hAttr = typeof height === 'number' ? height : height

    return (
        <svg
            className={cn('absolute pointer-events-none', className)}
            // Use a generous fixed viewBox for compatibility with given ellipse defaults.
            // You can adjust if you customize cx/cy/rx/ry extensively.
            viewBox="0 0 1440 1332"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={wAttr}
            height={hAttr}
            aria-hidden="true"
            focusable="false"
        >
            <g filter={`url(#${filterId})`}>
                <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    fill={`url(#${gradId})`}
                    fillOpacity={opacity}
                />
            </g>
            <defs>
                {/* Filter sized relative to the object’s bbox, so it safely covers the blur */}
                <filter
                    id={filterId}
                    x="-50%" y="-50%" width="200%" height="200%"
                    filterUnits="objectBoundingBox"
                    colorInterpolationFilters="sRGB"
                >
                    <feGaussianBlur stdDeviation={blur} />
                </filter>

                {/* Simple left-to-right linear gradient; tweak x1/x2 if needed */}
                <linearGradient
                    id={gradId}
                    x1="100%" y1="0%"
                    x2="0%" y2="0%"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
            </defs>
        </svg>
    )
}
