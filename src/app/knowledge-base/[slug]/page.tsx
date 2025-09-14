// app/knowledge-base/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getArticleBySlug } from "@/lib/mdx";
import { ArticleLayout } from "@/components/knowledge-base/ArticleLayout";
import { mdxComponents } from "@/components/ui/mdx-components";

type ArticleSlugPageProps = {
    params: { slug: string };
};

export default async function ArticleSlugPage({ params }: ArticleSlugPageProps) {
    const { slug } = params;

    const article = await getArticleBySlug(slug);
    if (!article) return notFound();

    const { meta, content } = article;

    const breadcrumbs = [
        { href: "/knowledge-base", label: "Knowledge Base" },
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
            <MDXRemote source={content} components={mdxComponents} />
        </ArticleLayout>
    );
}
