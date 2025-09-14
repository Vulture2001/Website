// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getArticleBySlug } from "@/lib/mdx";
import { ArticleLayout } from "@components/articles/ArticleLayout";
import { MDXComponents } from "@components/articles/MDXComponents";

type ArticleSlugPageProps = {
    params: { slug: string };
};

export default async function ArticleSlugPage({ params }: ArticleSlugPageProps) {
    const { slug } = params;

    const article = await getArticleBySlug(slug);
    if (!article) return notFound();

    const { meta, content } = article;

    const breadcrumbs = [
        { href: "/articles", label: "Knowledge Base" },
        { href: `/knowledge-base/${slug}`, label: meta.title },
    ];

    return (
        <ArticleLayout
            title={meta.title}
            heroSrc={meta.heroSrc}
            heroAlt={meta.heroAlt}
            lead={meta.lead}
            date={meta.date}
            breadcrumbs={breadcrumbs}
        >
            <MDXRemote source={content} components={MDXComponents} />
        </ArticleLayout>
    );
}
