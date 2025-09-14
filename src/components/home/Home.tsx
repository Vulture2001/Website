"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { HomeHero } from "@/components/home/HomeHero";
import { Content } from "@/components/ui/Content";
import { Badge, NumBadge } from "@/components/ui/Badge";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import faqs from "@/data/faq_home_page.json";
import { FaqList } from "@/components/ui/FAQ";
import Header from "@/components/ui/layout/Header";
import phases from "@/data/phases.json";

export default function Home() {
    return (
        <main className="relative isolate overflow-hidden bg-bg text-text">
            {/* ===== HERO ===== */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <HomeHero />
                </motion.div>
            </motion.section>

            {/* ===== Section 1: Process ===== */}
            <section className="relative mt-[1rem]">
                <Header
                    id="kb-articles"
                    align="center"
                    size="md"
                    maxWidth="5xl"
                    title="Why Software 5.0?"
                    subtitle="Tech isn’t neutral. Every app, platform, or system we build affects people and the planet."
                />

                <motion.div
                    initial={false}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp}>
                        <Content
                            badge={<Badge variant="outline">Process</Badge>}
                            title="From Idea to Impact"
                            imagePosition="left"
                            imageSrc="svg/picture.svg"
                            description="Software 5.0 builds on the Double Diamond."
                        >
                            {phases.length > 0 && (
                                <ol className="space-y-3">
                                    {phases.map((x, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <NumBadge n={i + 1} />
                                            <p className="text-[#5F6980] leading-6">
                                                {x.label} – {x.homeDescription}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            )}
                            <ActionButton href="/process">Dive in Process</ActionButton>
                        </Content>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Section 2: Knowledge Base ===== */}
            <motion.section
                initial={false}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <Content
                        badge={<Badge variant="outline">Knowledge Base</Badge>}
                        title="Learn Through Examples"
                        imagePosition="right"
                        imageSrc="svg/toolkit.svg"
                        description="Explore case studies and stories."
                    >
                        <ActionButton href="/toolkit">Explore Knowledge Base</ActionButton>
                    </Content>
                </motion.div>
            </motion.section>

            {/* ===== FAQs ===== */}
            <section className="pb-28 bg-bg">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={false}
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold text-fg mb-4">
                            FAQs
                        </h2>
                        <div className="mx-auto h-[2px] w-20 bg-[hsl(var(--border))]" />
                    </motion.div>

                    <motion.div
                        initial={false}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <FaqList items={faqs} />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
