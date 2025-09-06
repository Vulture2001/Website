'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { type Crumb } from '@/components/ui/Breadcrumb';
import { ArticleLayout } from '@/components/knowledge-base/ArticleLayout';
import {mdxComponents} from "@/components/mdx-components";

export default function ArticlePage({
                                        article,
                                        breadcrumbs,
                                    }: {
    article: {
        title: string;
        heroSrc?: string;
        heroAlt?: string;
        lead?: string;
        date?: string;
        body: string; // raw MDX string
        references?: string[];
    };
    breadcrumbs?: Crumb[];
}) {
    return (
        <ArticleLayout
            title={article.title}
            heroSrc={article.heroSrc}
            heroAlt={article.heroAlt}
            lead={article.lead}
            date={article.date}
            breadcrumbs={breadcrumbs}
        >
            <MDXRemote source={article.body} components={mdxComponents} />


            {article.references?.length ? (
                <section className="mt-10">
                    <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-7 text-[hsl(var(--muted-fg))]">
                        {article.references.map((ref, i) => (
                            <li key={i}>{ref}</li>
                        ))}
                    </ol>
                </section>
            ) : null}
        </ArticleLayout>
    );
}
