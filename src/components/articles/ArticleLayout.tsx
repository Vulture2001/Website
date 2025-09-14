"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { Breadcrumb, type Crumb } from "@components/navigation/Breadcrumb";
import { formatDate } from "@/lib/formatDate";

export function normalizeSrc(src?: string): string | null {
    if (!src) return null;
    if (src.startsWith("data:")) return src;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("public/")) return src.replace(/^public\//, "");
    if (src.startsWith("/")) return src;
    return `/${src}`;
}

type ArticleLayoutProps = {
    title: string;
    heroSrc?: string;
    heroAlt?: string;
    heroAspect?: string;
    lead?: string;
    date?: string;
    className?: string;
    children: React.ReactNode;
    breadcrumbs?: Crumb[];
};

export function ArticleLayout({
                                  title,
                                  heroSrc,
                                  heroAlt,
                                  heroAspect = "aspect-[16/9]",
                                  lead,
                                  date,
                                  className,
                                  children,
                                  breadcrumbs,
                              }: ArticleLayoutProps) {
    return (
        <article className={cn("mx-auto mt-10 max-w-3xl px-4 py-10", className)}>
            {/* Breadcrumbs */}
            {breadcrumbs?.length ? (
                <Breadcrumb
                    items={breadcrumbs}
                    containerClassName="max-w-4xl mb-6"
                    className="text-xs md:text-sm"
                />
            ) : null}

            {/* Header */}
            <header>
                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-surface-fg md:text-4xl">
                    {title}
                </h1>

                {/* Date */}
                {date && (
                    <div className="mt-3 text-xs text-text-muted">
                        <time dateTime={date}>{formatDate(date)}</time>
                    </div>
                )}

                {/* Hero Image */}
                {heroSrc && (
                    <div className="mt-5 overflow-hidden rounded-2xl bg-surface/80">
                        <div className={cn("relative w-full", heroAspect)}>
                            <Image
                                src={normalizeSrc(heroSrc)!}
                                alt={heroAlt ?? ""}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Lead paragraph */}
                {lead && (
                    <p className="mt-6 text-base font-medium leading-7 text-text-muted">
                        {lead}
                    </p>
                )}
            </header>

            {/* Body */}
            <div className="mt-8 space-y-6">{children}</div>
        </article>
    );
}
