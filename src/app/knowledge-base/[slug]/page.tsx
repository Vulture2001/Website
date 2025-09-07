// app/knowledge-base/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/knowledge-base/ArticleLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/ui/mdx-components";

export default async function ArticleSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await the params
    const { slug } = await params;

    // If your getArticleBySlug is synchronous, you don’t need `await` here.
    // If it’s async (e.g. reading from disk or fetching), add `await`.
    const article = await getArticleBySlug(slug);
    if (!article) return notFound();

    const breadcrumbs = [
        { href: "/knowledge-base", label: "Knowledge Base" },
        { href: `/knowledge-base/${slug}`, label: article.meta.title },
    ];

    return (
        <ArticleLayout
            title={article.meta.title}
            heroSrc={article.meta.heroSrc}
            heroAlt={article.meta.heroAlt}
            lead={article.meta.lead}
            date={article.meta.date}
            breadcrumbs={breadcrumbs}
        >
            <MDXRemote source={article.content} components={mdxComponents} />
        </ArticleLayout>
    );
}
