"use client";

import { Badge } from "@components/buttons/Badge";
import { cn } from "@lib/cn";

type TrackCardProps = {
    badge: string;
    title: string;
    description: string;
    accent?: "blue" | "green" | "purple";
    className?: string;
};

export function TrackCard({
                       badge,
                       title,
                       description,
                       className,
                   }: {
    badge: string;
    title: string;
    description: string;
    className?: string;
}) {
    return (
        <article
            className={cn(
                "w-full rounded-2xl border border-surface-border bg-surface/20 p-8",
                // no m-10, no flex-1 (grid handles widths)
                className
            )}
            role="region"
            aria-label={badge}
        >
            <Badge variant="outline" size="lg" shape="pill" className="mb-6">
                {badge}
            </Badge>
            <h3 className="text-lg font-semibold text-fg mb-3">{title}</h3>
            <p className="text-[15px] leading-relaxed text-muted-fg">{description}</p>
        </article>
    );
}

