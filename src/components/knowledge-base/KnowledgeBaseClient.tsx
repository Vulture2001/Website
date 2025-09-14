"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import Grid from "@/components/ui/Grid";
import type { ArticleSummary } from "@/lib/mdx";
import { motion } from "framer-motion";

type KnowledgeBaseClientProps = {
    articles: ArticleSummary[];
};

export default function KnowledgeBaseClient({ articles }: KnowledgeBaseClientProps) {
    return (
        <PageLayout>
            {/* Hero with fade-down */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <PageHero
                    id="kb-hero"
                    eyebrow="Learn More"
                    title="Knowledge Base"
                    subtitle="A library of principles, perspectives, and case studies that highlight the foundations of sustainable software."
                    size="xl"
                />
            </motion.div>

            {/* Articles grid with gentle stagger */}
            <motion.section
                id="kb-articles"
                aria-labelledby="kb-hero"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08 },
                    },
                }}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                >
                    <Grid
                        articles={articles}
                        basePath="knowledge-base"
                        title="Articles"
                        id="kb-articles-title"
                    />
                </motion.div>
            </motion.section>
        </PageLayout>
    );
}
