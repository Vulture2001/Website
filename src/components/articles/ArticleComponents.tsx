"use client";
import Image from "next/image";
import { cn } from "@/lib/cn";

/* ----------------------------- Headings ----------------------------- */
export function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-surface-fg">
            {children}
        </h2>
    );
}

export function H3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-surface-fg">
            {children}
        </h3>
    );
}

export function H4({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="mt-6 scroll-mt-24 text-lg font-semibold tracking-tight text-surface-fg">
            {children}
        </h4>
    );
}

/* ----------------------------- Paragraphs ----------------------------- */
export function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="mt-4 text-base leading-7 text-text-muted">{children}</p>
    );
}

/* ----------------------------- Lists ----------------------------- */
export function UL({ children }: { children: React.ReactNode }) {
    return (
        <ul className="mt-4 list-disc pl-6 space-y-2 text-text-muted">
            {children}
        </ul>
    );
}

export function OL({ children }: { children: React.ReactNode }) {
    return (
        <ol className="mt-4 list-decimal pl-6 space-y-2 text-text-muted">
            {children}
        </ol>
    );
}

/* ----------------------------- Blockquotes ----------------------------- */
export function Quote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="mt-6 border-l-4 border-brand-primary pl-4 italic text-text-muted">
            {children}
        </blockquote>
    );
}

/* ----------------------------- Figures ----------------------------- */
export function Figure({
                           src,
                           alt = "",
                           caption,
                       }: {
    src: string;
    alt?: string;
    caption?: React.ReactNode;
}) {
    return (
        <figure className="mt-6">
            <div className="overflow-hidden rounded-xl bg-surface/80">
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="object-contain w-full h-auto"
                />
            </div>
            {caption ? (
                <figcaption className="mt-2 text-xs text-text-muted">
                    {caption}
                </figcaption>
            ) : null}
        </figure>
    );
}

/* ----------------------------- References ----------------------------- */
export function References({ children }: { children: React.ReactNode }) {
    return (
        <section className="mt-12 border-t border-surface-border pt-6">
            <h2 className="text-lg font-semibold text-surface-fg">References</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-text-muted">
                {children}
            </ol>
        </section>
    );
}

/* ----------------------------- Feature List ----------------------------- */
export function FeatureList({
                                items,
                            }: {
    items: { title: string; body: string }[];
}) {
    return (
        <ul className="grid gap-4 md:grid-cols-2 my-5">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="rounded-xl border border-surface-border bg-surface/60 p-4"
                >
                    <h3 className="font-semibold text-surface-fg">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{item.body}</p>
                </li>
            ))}
        </ul>
    );
}

/* ----------------------------- Icon List ----------------------------- */
export type Item = { title: string; body: string };

export function IconList({ items }: { items: Item[] }) {
    return (
        <ul className="my-5 space-y-4">
            {items.map(({ title, body }, i) => (
                <li key={i} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                    <div>
                        <h3 className="font-semibold text-surface-fg">{title}</h3>
                        <p className="text-sm text-text-muted">{body}</p>
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
            <table className="w-full border border-surface-border text-sm">
                <thead className="bg-surface/80">
                <tr>
                    <th className="px-4 py-3 border border-surface-border"></th>
                    {headers.map((header, i) => (
                        <th
                            key={i}
                            className="px-4 py-3 text-left font-semibold text-surface-fg border border-surface-border"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {/* First cell as row header */}
                        <th
                            className="px-4 py-4 text-left font-semibold text-surface-fg border border-surface-border"
                        >
                            {row[0]}
                        </th>
                        {/* Rest of the row */}
                        {row.slice(1).map((cell, j) => (
                            <td
                                key={j}
                                className="px-4 py-4 border border-surface-border text-text-muted"
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
type CalloutVariant = "info" | "warning" | "success" | "tip";

const calloutVariants: Record<
    CalloutVariant,
    { bg: string; border: string; text: string }
> = {
    info: {
        bg: "bg-brand-blue/10",
        border: "border-brand-blue",
        text: "text-brand-blue",
    },
    warning: {
        bg: "bg-brand-yellow/10",
        border: "border-brand-yellow",
        text: "text-brand-yellow",
    },
    success: {
        bg: "bg-brand-green/10",
        border: "border-brand-green",
        text: "text-brand-green",
    },
    tip: {
        bg: "bg-brand-purple/10",
        border: "border-brand-purple",
        text: "text-brand-purple",
    },
};

export function Callout({
                            variant = "info",
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
                "my-6 rounded-xl border px-6 py-4",
                style.bg,
                style.border,
                className
            )}
        >
            {title && <h3 className={cn("font-semibold mb-2", style.text)}>{title}</h3>}
            <div className="text-sm text-text-muted">{children}</div>
        </div>
    );
}

/* ----------------------------- Video ----------------------------- */
export function Video({
                          src,
                          caption,
                          poster,
                          className,
                      }: {
    src: string;
    caption?: React.ReactNode;
    poster?: string;
    className?: string;
}) {
    // Check if the src is a YouTube URL
    const isYouTube = /youtube\.com|youtu\.be/.test(src);

    return (
        <figure className="mt-6">
            <div className={cn("overflow-hidden rounded-xl bg-surface/80", className)}>
                {isYouTube ? (
                    <iframe
                        width="100%"
                        height="450"
                        src={src.includes("embed") ? src : getYouTubeEmbedURL(src)}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <video
                        controls
                        src={src}
                        poster={poster}
                        className="w-full h-auto rounded-lg object-contain"
                    />
                )}
            </div>
            {caption && (
                <figcaption className="mt-2 text-xs text-text-muted">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

// Utility to convert normal YouTube URL to embed URL
function getYouTubeEmbedURL(url: string) {
    const idMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
    if (!idMatch) return url; // fallback if regex fails
    return `https://www.youtube.com/embed/${idMatch[1]}`;
}
/* ----------------------------- PDF ----------------------------- */
export function PDF({
                        src,
                        caption,
                        className,
                    }: {
    src: string;
    caption?: React.ReactNode;
    className?: string;
}) {
    return (
        <figure className="mt-6">
            <div className={cn("overflow-hidden rounded-xl border bg-surface/80", className)}>
                <iframe
                    src={src}
                    width="100%"
                    height="600"
                    className="border-none"
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-xs text-text-muted">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
