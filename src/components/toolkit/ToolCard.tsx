'use client';

import Link from 'next/link';
import { truncate } from '@/lib/truncate';
import { Card, CardBody } from '@/components/ui/Card';

export function ToolCard({
                             tool,
                             catLabel,
                             catColor,
                         }: {
    tool: any;
    catLabel?: string;
    catColor?: string;
}) {
    return (
        <Card className="rounded-2xl border border-text-muted bg-white h-full flex flex-col">
            <CardBody className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Category */}
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: catColor ?? 'hsl(var(--muted-fg))' }}
                    />
                    {tool._category !== 'uncategorized' && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-fg">
              {catLabel ?? tool._category}
            </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-fg leading-snug line-clamp-2">
                    {tool.title}
                </h3>

                {/* Blurb */}
                <p className="mt-3 text-sm text-muted-fg leading-relaxed line-clamp-3 flex-1">
                    {truncate(tool._blurb, 100)}
                </p>

                {/* Footer */}
                <div className="flex justify-end pt-4">
                    <Link
                        href={`/toolkit/${encodeURIComponent(String(tool.id))}`}
                        className="text-sm font-medium text-brand-primary hover:underline"
                        aria-label={`Explore tool: ${tool.title}`}
                    >
                        Explore Tool →
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}
