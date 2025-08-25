'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/cn'

type Len = number | string

type GradientProps = {
    /** Start/End colors — works great with your CSS vars: e.g. "hsl(var(--color-blue))" */
    from: string
    to: string

    /** SVG box size (can be '100%', 'rem', px numbers, etc.) */
    width?: Len
    height?: Len

    /** Overall opacity (0..1) and blur strength */
    opacity?: number
    blur?: number

    /**
     * Ellipse geometry. Accepts numbers (px in viewBox space) or strings (e.g. '50%').
     * If `centered` is true, these are ignored and we use % values that auto-fit the box.
     */
    cx?: Len
    cy?: Len
    rx?: Len
    ry?: Len

    /** If true, auto-center the ellipse with % radii (nice for full-section backgrounds) */
    centered?: boolean

    /** Extra classes (positioning, z-index, etc.) */
    className?: string
}

/**
 * Blurred gradient blob (SVG) with optional auto-centering.
 * - Use CSS variables for colors: from="hsl(var(--color-blue))"
 * - Place with absolute positioning: className="absolute inset-0 -z-10"
 */
export function Gradient({
                             from,
                             to,
                             width = '100%',
                             height = '100%',
                             opacity = 0.5,
                             blur = 150,
                             cx = 545.549,
                             cy = 737.5,
                             rx = 388.549,
                             ry = 264.5,
                             centered = false,
                             className,
                         }: GradientProps) {
    const uid = useId()
    const filterId = `grad-filter-${uid}`
    const gradId = `grad-fill-${uid}`

    // ViewBox matches your original; works well as a scalable canvas.
    const viewBox = '0 0 1440 1332'

    // If centered, use % so the ellipse always sits in the middle and scales with the box.
    const ecx: Len = centered ? '50%' : cx
    const ecy: Len = centered ? '50%' : cy
    const erx: Len = centered ? '55%' : rx
    const ery: Len = centered ? '40%' : ry

    return (
        <svg
            className={cn('pointer-events-none', className)}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            aria-hidden="true"
            focusable="false"
        >
            <g filter={`url(#${filterId})`}>
                <ellipse
                    cx={ecx as any}
                    cy={ecy as any}
                    rx={erx as any}
                    ry={ery as any}
                    fill={`url(#${gradId})`}
                    fillOpacity={opacity}
                />
            </g>
            <defs>
                <filter
                    id={filterId}
                    x="-50%" y="-50%" width="200%" height="200%"
                    filterUnits="objectBoundingBox"
                    colorInterpolationFilters="sRGB"
                >
                    <feGaussianBlur stdDeviation={blur} />
                </filter>
                <linearGradient
                    id={gradId}
                    x1="100%" y1="0%"
                    x2="0%"   y2="0%"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0%"   stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Gradient
