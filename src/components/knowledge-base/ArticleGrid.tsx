import { ArticleCard } from "./ArticleCard";
import {ArticleSummary} from "@lib/mdx";

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
                <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {articles.map((article) => (
                        <li key={article.slug} className="list-none">
                            <ArticleCard article={article} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex h-24 items-center justify-center text-sm text-[hsl(var(--muted-fg))] border border-dashed rounded-lg">
                    No articles yet. Check back soon.
                </div>
            )}
        </section>
    );
}
