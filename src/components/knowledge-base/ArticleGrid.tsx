import type { ArticleSummary } from "@/types/Article";
import {ArticleCard} from "./ArticleCard"; // assuming ArticleCard is default export

type Props = {
    articles: ArticleSummary[];
    title?: string;
    id?: string; // for aria-labelledby or in-page anchors
};

export default function ArticleGrid({ articles, title, id }: Props) {
    const hasItems = articles?.length > 0;

    return (
        <section
            className="mx-auto max-w-6xl px-4 pb-24"
            aria-labelledby={id}
        >
            {title ? (
                <h2
                    id={id}
                    className="mb-6 text-2xl font-bold tracking-tight text-fg"
                >
                    {title}
                </h2>
            ) : null}

            {hasItems ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-[hsl(var(--muted-fg))]">
                    No articles yet. Check back soon.
                </p>
            )}
        </section>
    );
}
