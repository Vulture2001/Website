// app/knowledge-base/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/data/articleService";
import ArticlePage from "@/components/knowledge-base/ArticlePage";

export const dynamicParams = false;
export const revalidate = 3600; // ISR (seconds)

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map(a => ({ slug: a.slug }));
}

type PageParams = { params: { slug: string } };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const a = await getArticleBySlug(params.slug);
    if (!a) return {};

    const title = `${a.title} • Knowledge Base`;
    const description =
        a.lead ?? "Articles and guides from the Software 5.0 knowledge base.";
    const url = `https://your-domain.com/knowledge-base/${params.slug}`;
    const images = a.heroSrc ? [{ url: a.heroSrc, alt: a.heroAlt ?? a.title }] : [];

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: "article",
            images,
        },
        twitter: {
            card: images.length ? "summary_large_image" : "summary",
            title,
            description,
            images,
        },
    };
}

export default async function Page({ params }: PageParams) {
    const article = await getArticleBySlug(params.slug);
    if (!article) return notFound();

    const crumbs = [
        { label: "Home", href: "/" },
        { label: "Articles", href: "/knowledge-base" },
        { label: article.title },
    ];

    return <ArticlePage article={article} breadcrumbs={crumbs} />;
}
