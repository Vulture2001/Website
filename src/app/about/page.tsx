// app/about/page.tsx
"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import { ProfileCard } from "@/components/about/ProfileCard";
import { ThesisDetailsCard } from "@/components/about/ThesisDetailsCard";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <PageLayout>
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <PageHero
                    id="about-hero"
                    eyebrow="About"
                    title="About the Framework"
                    subtitle="Learn who created Software 5.0 and the research behind its development."
                    size="xl"
                />
            </motion.div>

            {/* Content */}
            <section className="mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr] items-stretch">
                        {/* ProfileCard */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ProfileCard />
                        </motion.div>

                        {/* ThesisDetailsCard */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <ThesisDetailsCard />
                        </motion.div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
