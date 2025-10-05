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
    // Group projects by year using Map for type safety
    const projectsByYearMap = new Map<number, ArticleSummary[]>();

    projects.forEach((project) => {
        if (!project.date) return;
        const year = new Date(project.date).getFullYear();
        if (!projectsByYearMap.has(year)) projectsByYearMap.set(year, []);
        projectsByYearMap.get(year)!.push(project);
    });

    // Sort years descending
    const sortedYears = Array.from(projectsByYearMap.keys()).sort((a, b) => b - a);

    return (
        <PageLayout>
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <PageHero
                    id="projects-hero"
                    title="Projects"
                    subtitle="Designs created by students during this course using the methodology of Responsible, Sustainable, and Inclusive Digital Product Creation."
                    size="xl"
                />
            </motion.div>

            {/* Year sections */}
            {sortedYears.map((year) => (
                <motion.section
                    key={year}
                    id={`projects-${year}`}
                    aria-labelledby={`projects-${year}-grid`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                    }}
                    className="mt-16"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                    >
                        <Grid
                            articles={projectsByYearMap.get(year) ?? []}
                            basePath="projects"
                            title={`${year}`}
                            id={`projects-${year}-grid`}
                        />
                    </motion.div>
                </motion.section>
            ))}
        </PageLayout>
    );
}
