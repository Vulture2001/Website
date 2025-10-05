"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { PageHero } from "@components/hero/PageHero";
import Grid from "@components/layout/Grid";
import type { ArticleSummary } from "@lib/mdx";
import { motion } from "framer-motion";

type ProjectsClientProps = {
    projects: ArticleSummary[];
};

export default function Projects({ projects }: ProjectsClientProps) {
    return (
        <PageLayout>
            {/* Hero with fade-down */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <PageHero
                    id="projects-hero"
                    eyebrow="Practice"
                    title="Projects"
                    subtitle="In-depth explorations of sustainable software practices in real-world contexts."
                    size="xl"
                />
            </motion.div>

            {/* Projects grid with gentle fade-up */}
            <motion.section
                id="projects-articles"
                aria-labelledby="projects-hero"
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
                        articles={projects}
                        basePath="projects"
                        title="Projects"
                        id="projects-articles-title"
                    />
                </motion.div>
            </motion.section>
        </PageLayout>
    );
}
