import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/types/Article";

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
export function ArticleCard({ article }: { article: ArticleSummary }) {
    const src = normalizeSrc(article.heroSrc);
    const hasImage = !!src;

    return (
        <Link
            href={`/knowledge-base/${article.slug}`}
            role="article"
            aria-label={article.title}
            className="group block transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl overflow-hidden"
        >
            {/* Image (no border) */}
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
                    <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-fg))] bg-[hsl(var(--surface)/0.6)]">
                        No image
                    </div>
                )}
            </div>

            {/* Content (bordered box under image) */}
            <div className="border border-gray-200 border-t-0 rounded-b-2xl bg-[hsl(var(--surface)/0.8)] p-4">
                <h3 className="text-lg font-semibold leading-snug text-fg line-clamp-2">
                    {article.title}
                </h3>

                {article.lead && (
                    <p className="mt-2 text-sm text-[hsl(var(--muted-fg))] line-clamp-3">
                        {article.lead}
                    </p>
                )}

                {article.date && (
                    <p className="mt-3 text-xs text-[hsl(var(--muted-fg))]">
                        {formatDate(article.date)}
                    </p>
                )}
            </div>
        </Link>
    );
}
