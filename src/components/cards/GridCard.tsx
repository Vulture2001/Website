import Link from "next/link";
import Image from "next/image";
import { cn } from "@lib/cn";
import type { ArticleSummary } from "@lib/mdx";

/* ----------------------------- utils ----------------------------- */
function normalizeSrc(src?: string): string | null {
    if (!src) return null;
    if (src.startsWith("data:")) return src;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `/${src}`;
}

function formatDate(date: string): string {
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}

/* ----------------------------- component ----------------------------- */
type GridCardProps = {
    article: ArticleSummary;
    basePath: "articles" | "projects";
    badge?: string;
    className?: string;
};

export function GridCard({ article, basePath, badge, className }: GridCardProps) {
    const src = normalizeSrc(article.heroSrc);
    const hasImage = !!src;

    return (
        <Link
            href={`/${basePath}/${article.slug}`}
            className={cn(
                "group block rounded-2xl overflow-hidden transition-transform duration-200",
                "hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                className
            )}
        >
            {/* Image */}
            <div className="relative aspect-[4/3]">
                {hasImage ? (
                    <Image
                        src={src!}
                        alt={article.heroAlt ?? article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        unoptimized={src!.startsWith("http")}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-text-muted bg-surface/60">
                        No image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="border border-surface-border border-t-0 rounded-b-2xl p-4">
                {badge && (
                    <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-text-muted">
            {badge}
          </span>
                )}

                <h3 className="text-lg font-semibold leading-snug text-surface-fg line-clamp-2">
                    {article.title}
                </h3>

                {article.lead && (
                    <p className="mt-2 text-sm text-text-muted line-clamp-3">
                        {article.lead}
                    </p>
                )}

                {article.date && (
                    <p className="mt-3 text-xs text-text-muted">
                        {formatDate(article.date)}
                    </p>
                )}
            </div>
        </Link>
    );
}
