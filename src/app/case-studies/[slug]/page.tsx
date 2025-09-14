// app/case-studies/[slug]/page.tsx
import { getCaseStudyBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@components/articles/ArticleLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import {mdxComponents} from "@components/articles/MDXComponents";

type PageProps = {
    params: { slug: string };
};

export default async function CaseStudySlugPage({ params }: PageProps) {
    const { slug } = params;
    const caseStudy = getCaseStudyBySlug(slug);

    if (!caseStudy) return notFound();

    const breadcrumbs = [
        { href: "/case-studies", label: "Case Studies" },
        { href: `/case-studies/${slug}`, label: caseStudy.meta.title },
    ];

    return (
        <ArticleLayout
            title={caseStudy.meta.title}
            heroSrc={caseStudy.meta.heroSrc}
            heroAlt={caseStudy.meta.heroAlt}
            lead={caseStudy.meta.lead}
            date={caseStudy.meta.date}
            breadcrumbs={breadcrumbs}
        >
            <MDXRemote source={caseStudy.content} components={mdxComponents} />
        </ArticleLayout>
    );
}
