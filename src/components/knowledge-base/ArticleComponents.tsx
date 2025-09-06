// src/components/knowledge-base/ProseComponents.tsx
'use client';
import Image from "next/image";
import { cn } from "@/lib/cn";

/* ----------------------------- Headings ----------------------------- */
export function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-fg">
            {children}
        </h2>
    );
}

/* ----------------------------- Paragraphs ----------------------------- */
export function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="mt-4 text-[15px] leading-7 text-[hsl(var(--muted-fg))]">
            {children}
        </p>
    );
}

/* ----------------------------- Blockquotes ----------------------------- */
export function Quote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-[hsl(var(--muted-fg))]">
            {children}
        </blockquote>
    );
}

/* ----------------------------- Figures ----------------------------- */
export function Figure({
                           src,
                           alt = "",
                           caption,
                           aspect = "aspect-[16/9]",
                       }: {
    src: string;
    alt?: string;
    caption?: React.ReactNode;
    aspect?: string;
}) {
    return (
        <figure className="mt-6">
            <div className="overflow-hidden rounded-xl bg-[hsl(var(--surface)/0.8)] ring-1 ring-[hsl(var(--border))]">
                <div className={cn("relative w-full", aspect)}>
                    <Image src={src} alt={alt} fill className="object-cover" />
                </div>
            </div>
            {caption ? (
                <figcaption className="mt-2 text-xs text-[hsl(var(--muted-fg))]">
                    {caption}
                </figcaption>
            ) : null}
        </figure>
    );
}

/* ----------------------------- References ----------------------------- */
export function References({ children }: { children: React.ReactNode }) {
    return (
        <section className="mt-12 border-t pt-6">
            <h2 className="text-lg font-semibold">References</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[hsl(var(--muted-fg))]">
                {children}
            </ol>
        </section>
    );
}

/* ----------------------------- Feature List ----------------------------- */
export function FeatureList({ items }: { items: { title: string; body: string }[] }) {
    return (
        <ul className="grid gap-4 md:grid-cols-2 my-5">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="rounded-xl border bg-[hsl(var(--surface)/0.6)] p-4"
                >
                    <h3 className="font-semibold text-fg">{item.title}</h3>
                    <p className="mt-1 text-sm text-[hsl(var(--muted-fg))]">{item.body}</p>
                </li>
            ))}
        </ul>
    );
}

/* ----------------------------- Icon List ----------------------------- */
export type Item = {
    title: string;
    body: string;
};

export function IconList({ items }: { items: Item[] }) {
    return (
        <ul className="my-5 space-y-4">
            {items.map(({ title, body }, i) => (
                <li key={i} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-600" />
                    <div>
                        <h3 className="font-semibold text-fg">{title}</h3>
                        <p className="text-sm text-[hsl(var(--muted-fg))]">{body}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

/* ----------------------------- Table ----------------------------- */
export function Table({
                          headers,
                          rows,
                      }: {
    headers: string[];
    rows: string[][];
}) {
    return (
        <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-[hsl(var(--surface)/0.8)]">
                <tr>
                    {headers.map((header, i) => (
                        <th
                            key={i}
                            className="px-4 py-3 text-left font-semibold text-fg border-b border-[hsl(var(--border))]"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="odd:bg-[hsl(var(--surface)/0.5)]">
                        {row.map((cell, j) => (
                            <td
                                key={j}
                                className="px-4 py-4 align-top border-b border-[hsl(var(--border))] text-[hsl(var(--muted-fg))]"
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

/* ----------------------------- Callout ----------------------------- */
type CalloutVariant = 'info' | 'warning' | 'success' | 'tip';

const calloutVariants: Record<CalloutVariant, { bg: string; border: string; text: string }> = {
    info: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-400',
        text: 'text-blue-700 dark:text-blue-300',
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-amber-400',
        text: 'text-amber-700 dark:text-amber-300',
    },
    success: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-400',
        text: 'text-green-700 dark:text-green-300',
    },
    tip: {
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        border: 'border-purple-400',
        text: 'text-purple-700 dark:text-purple-300',
    },
};

export function Callout({
                            variant = 'info',
                            title,
                            children,
                            className,
                        }: {
    variant?: CalloutVariant;
    title?: string;
    children: React.ReactNode;
    className?: string;
}) {
    const style = calloutVariants[variant];

    return (
        <div
            className={cn(
                'my-6 rounded-xl px-10 py-6',
                style.bg,
                style.border,
                className
            )}
        >
            {title && (
                <h3 className={cn('font-semibold', style.text)}>{title}</h3>
            )}
            <div className="text-sm text-[hsl(var(--muted-fg))]">{children}</div>
        </div>
    );
}
