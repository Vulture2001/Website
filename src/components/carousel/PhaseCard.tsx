'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge' // ← adjust import path if needed
import '@/styles/phasecard.css'

export type PhaseCardData = {
    title: string
    description?: string
    /** Accent dot color for the phase (ignored when disabled) */
    color?: string
    /** “Design” or “Delivery” (used for the badge + theme) */
    track?: 'Design' | 'Delivery'
    /** Disable style for future research (mutes colors / shows badge note) */
    disabled?: boolean
    /** 1-based index (Phase 1, 2, …) */
    index1?: number
    /** Optional extra className for the root */
    className?: string
}

export function PhaseCard({
                              title,
                              description,
                              color,
                              track = 'Design',
                              disabled = false,
                              index1,
                              className,
                          }: PhaseCardData) {
    // Dot color logic
    const dotColor = disabled ? '#D0D5DD' : color ?? '#4F46E5'

    // Badge tone mapping
    const badgeProps =
        disabled
            ? ({ variant: 'outline', tone: 'gray' } as const)
            : track === 'Delivery'
                ? ({ variant: 'soft', tone: 'warning' } as const)
                : ({ variant: 'soft', tone: 'primary' } as const)

    return (
        <article
            className={cn(
                'phase-card',
                disabled && 'phase-card--disabled',
                className
            )}
            aria-disabled={disabled || undefined}
            aria-labelledby={`phase-title-${index1 ?? title}`}
            aria-describedby={description ? `phase-desc-${index1 ?? title}` : undefined}
            role="region"
        >
            {/* Header Row */}
            <header className="phase-card__header">
                <Badge {...badgeProps}>{track}</Badge>
                {disabled && (
                    <Badge variant="outline" className="phase-card__future-badge">
                        Future Work
                    </Badge>
                )}
            </header>

            {/* Title & Index */}
            <div className="phase-card__title-row">
                <h3
                    id={`phase-title-${index1 ?? title}`}
                    className="phase-card__title"
                >
          <span
              className="phase-card__dot"
              style={{ backgroundColor: dotColor }}
              aria-hidden="true"
          />
                    <span className="phase-card__title-text">{title}</span>
                </h3>
            </div>

            {/* Description */}
            {description && (
                <p
                    id={`phase-desc-${index1 ?? title}`}
                    className={cn(
                        'phase-card__description',
                        disabled && 'phase-card__description--muted'
                    )}
                >
                    {description}
                </p>
            )}
        </article>
    )
}
