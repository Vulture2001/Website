import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/types/Article";

function normalizeSrc(src?: string): string | null {
    if (!src || typeof src !== "string") return null;
    if (src.startsWith("data:")) return src;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `/${src}`;
}

export function ArticleCard({ article }: { article: ArticleSummary }) {
    const src = normalizeSrc(article.heroSrc);
    const hasImage = !!src;

    return (
        <Link
            href={`/knowledge-base/${article.slug}`}
            className="group block transition-transform duration-200 hover:-translate-y-0.5"
            aria-label={article.title}
        >
            <div className="overflow-hidden rounded-2xl bg-[hsl(var(--surface)/0.8)]">
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
                        <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-fg))]">
                            No image
                        </div>
                    )}
                </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold leading-snug text-fg line-clamp-2">
                {article.title}
            </h3>

            {article.lead ? (
                <p className="mt-2 text-sm text-[hsl(var(--muted-fg))] line-clamp-3">
                    {article.lead}
                </p>
            ) : null}

            {article.date ? (
                <p className="mt-1 text-xs text-[hsl(var(--muted-fg))]">
                    {new Date(article.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </p>
            ) : null}
        </Link>
    );
}
