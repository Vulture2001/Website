import { GridCard } from "../cards/GridCard";
import type { ArticleSummary } from "@lib/mdx";

type Props = {
    articles: ArticleSummary[];
    basePath: "articles" | "case-studies"; // tells grid what section it's for
    title?: string;
    id?: string; // used for aria-labelledby or in-page anchors
};

export default function Grid({ articles, basePath, title, id }: Props) {
    const hasItems = articles?.length > 0;

    return (
        <section
            className="mx-auto max-w-6xl px-4 py-16"
            aria-labelledby={id}
            aria-label={!id ? title || basePath : undefined}
        >
            {title ? (
                <h2
                    id={id}
                    className="mb-6 text-2xl font-bold tracking-tight text-surface-fg"
                >
                    {title}
                </h2>
            ) : null}

            {hasItems ? (
                <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {articles.map((article) => (
                        <li key={article.slug} className="list-none">
                            <GridCard article={article} basePath={basePath} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex h-24 items-center justify-center text-sm text-text-muted border border-surface-border border-dashed rounded-lg">
                    No articles yet. Check back soon.
                </div>
            )}
        </section>
    );
}
