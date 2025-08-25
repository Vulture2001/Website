'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/cn'

type Len = number | string

type GradientProps = {
    from: string
    to: string
    width?: Len
    height?: Len
    opacity?: number
    blur?: number
    cx?: Len
    cy?: Len
    rx?: Len
    ry?: Len
    centered?: boolean
    /** Extra classes (added on top of the default background classes) */
    className?: string
}

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

    const viewBox = '0 0 1440 1332'
    const ecx: Len = centered ? '50%' : cx
    const ecy: Len = centered ? '50%' : cy
    const erx: Len = centered ? '55%' : rx
    const ery: Len = centered ? '40%' : ry

    return (
        <svg
            className={cn(
                // default "always in the background" behavior:
                'absolute inset-0 -z-10 pointer-events-none',
                className
            )}
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
                <linearGradient id={gradId} x1="100%" y1="0%" x2="0%" y2="0%" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Gradient
