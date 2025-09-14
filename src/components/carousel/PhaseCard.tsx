'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';

export type PhaseCardData = {
    title: string;
    description?: string;
    color?: string;
    track?: 'Design' | 'Development';
    disabled?: boolean;
    index1?: number;
    className?: string;
};

export function PhaseCard({
                              title,
                              description,
                              color,
                              track = 'Design',
                              disabled = false,
                              index1,
                              className,
                          }: PhaseCardData) {
    const dotColor = disabled ? '#D0D5DD' : color ?? '#4F46E5';
    const id = index1 ?? title;

    return (
        <article
            className={cn(
                'rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col transition-transform duration-200',
                !disabled && 'hover:-translate-y-1 hover:shadow-lg',
                disabled && 'opacity-60 grayscale',
                className
            )}
            aria-disabled={disabled || undefined}
            aria-labelledby={`phase-title-${id}`}
            aria-describedby={
                description || disabled ? `phase-desc-${id}` : undefined
            }
            role="region"
        >
            {/* Badge Row */}
            <div className="flex items-center gap-2 mb-6">
                <Badge
                    variant="outline"
                    size="lg"
                    shape="pill"

                    style={!disabled ? { borderColor: dotColor, color: dotColor } : {}}
                >
                    {track} Track
                </Badge>

                {disabled && (
                    <Badge
                        variant="outline"
                        size="lg"
                        shape="pill"
                        className="inline-flex px-3 py-1"
                    >
                        Future Work
                    </Badge>
                )}
            </div>

            {/* Title */}
            <h3
                id={`phase-title-${id}`}
                className="text-xl font-semibold text-fg mb-3 flex items-center gap-2"
            >
        <span
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: dotColor }}
            aria-hidden="true"
        />
                {title} Phase
            </h3>

            {/* Description */}
            {description && (
                <p
                    id={`phase-desc-${id}`}
                    className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1"
                >
                    {description}
                </p>
            )}

            {/* Disabled note */}
            {disabled && (
                <p
                    id={`phase-disabled-${id}`}
                    className="mt-4 text-sm text-[hsl(var(--muted-fg))] italic"
                >
                    🚧 This phase is part of future work and will be developed later.
                </p>
            )}
        </article>
    );
}
