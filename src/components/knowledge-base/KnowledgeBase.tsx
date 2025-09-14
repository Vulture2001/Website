"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import { fadeInUp } from "@/lib/animations";
import ArticleGrid from "@/components/knowledge-base/ArticleGrid";
import type { ArticleSummary } from "@/lib/mdx";
import { MotionSection } from "@/components/ui/layout/Section";

type KnowledgeBaseClientProps = {
    articles: ArticleSummary[];
};

export default function KnowledgeBaseClient({ articles }: KnowledgeBaseClientProps) {
    return (
        <PageLayout>
            <PageHero
                id="kb-hero"
                eyebrow="Knowledge Base"
                title="Knowledge Base"
                subtitle="A library of principles, perspectives, and case studies that highlight the foundations of sustainable software."
                size="xl"
            />

            <MotionSection id="kb-articles" variants={fadeInUp}>
                <ArticleGrid articles={articles} basePath="knowledge-base" />
            </MotionSection>
        </PageLayout>
    );
}
