'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export type CardProps = {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    /** Preset content width for the white panel */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    /** Optional explicit CSS length for max width (e.g. 560, '560px', '42rem') */
    maxContentWidth?: number | string
    /** Extra classes for the inner white panel */
    contentClassName?: string
}

export function WhiteCard({
                              children,
                              className,
                              disabled = false,
                              size = 'sm',
                              maxContentWidth,
                              contentClassName,
                          }: CardProps) {
    const presetMax: Record<NonNullable<CardProps['size']>, string | undefined> = {
        sm: '336px',
        md: '480px',
        lg: '640px',
        xl: '800px',
        full: undefined, // no max — fills available width
    }

    const resolvedMax =
        maxContentWidth !== undefined
            ? typeof maxContentWidth === 'number'
                ? `${maxContentWidth}px`
                : maxContentWidth
            : presetMax[size]

    return (
        <div
            className={cn(
                `
        flex w-full justify-center items-center
        rounded-[40px]
        bg-gradient-to-b from-[rgba(255,255,255,0.40)] to-[rgba(255,255,255,0.10)]
        backdrop-blur
        px-6 md:px-[89px] pt-[51px] pb-[42px]
        shadow-[0_4px_43px_0_rgba(0,0,0,0.05)]
      `,
                disabled && 'opacity-60 pointer-events-none',
                className
            )}
            aria-disabled={disabled || undefined}
        >
            <div
                className={cn(
                    'relative w-full bg-white rounded-[23px] p-6',
                    size === 'full' ? 'max-w-none' : undefined,
                    contentClassName
                )}
                style={resolvedMax ? { maxWidth: resolvedMax } : undefined}
            >
                {children}
            </div>
        </div>
    )
}
