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

    return (
        <article
            className={cn(
                'rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col',
                disabled && 'opacity-70',
                className
            )}
            aria-disabled={disabled || undefined}
            aria-labelledby={`phase-title-${index1 ?? title}`}
            aria-describedby={description ? `phase-desc-${index1 ?? title}` : undefined}
            role="region"
        >
            {/* Badge Row */}
            <div className="flex items-center gap-2 mb-6">
                <Badge
                    variant="outline"
                    className="inline-flex px-4 py-1"
                    size="lg"
                    shape="pill"
                >
                    {track} Track
                </Badge>

                {disabled && (
                    <Badge
                        variant="outline"
                        tone="gray"
                        className="inline-flex px-3 py-1"
                        size="lg"
                        shape="pill"
                    >
                        Future Work
                    </Badge>
                )}
            </div>

            {/* Title */}
            <h3
                id={`phase-title-${index1 ?? title}`}
                className="text-lg font-semibold text-fg mb-3 flex items-center gap-2"
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
                    id={`phase-desc-${index1 ?? title}`}
                    className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1"
                >
                    {description}
                </p>
            )}

            {/* Extra note for disabled phases */}
            {disabled && (
                <p className="mt-4 text-sm text-[hsl(var(--muted-fg))] italic">
                    🚧 This phase is part of future work and will be developed later.
                </p>
            )}
        </article>
    );
}
