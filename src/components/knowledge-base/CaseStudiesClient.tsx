"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import { fadeInUp } from "@/lib/animations";
import ArticleGrid from "@/components/knowledge-base/ArticleGrid";
import { MotionSection } from "@/components/ui/layout/Section";
import type { ArticleSummary } from "@/lib/mdx";

type CaseStudiesClientProps = {
    caseStudies: ArticleSummary[];
};

export default function CaseStudiesClient({ caseStudies }: CaseStudiesClientProps) {
    return (
        <PageLayout>
            <PageHero
                id="cs-hero"
                eyebrow="Practice"
                title="Case Studies"
                subtitle="In-depth explorations of sustainable software practices in real-world contexts."
                size="xl"
            />

            <MotionSection id="cs-articles" variants={fadeInUp}>
                <ArticleGrid articles={caseStudies} basePath="case-studies" />
            </MotionSection>
        </PageLayout>
    );
}
