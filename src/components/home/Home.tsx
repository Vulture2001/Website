"use client";

import { HomeHero } from "@/components/home/HomeHero";
import { Content } from "../ui/Content";
import {Badge, NumBadge} from "../ui/Badge";
import { ActionButton } from "../ui/ActionButton";
import faqs from "@/data/faq_home_page.json";
import { FaqList } from "../ui/FAQ";
import { motion, Variants } from "framer-motion";
import Header from "@/components/ui/Header";
import React from "react";
import phases from "@/data/phases.json";
import Gradient from "@/components/ui/Gradient";

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            when: "beforeChildren",
        },
    },
};

export default function Home() {
    return (
        <main className="relative isolate overflow-hidden bg-bg text-text">
            {/* ===== HERO ===== */}
            <motion.section
                className="relative z-10"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                <motion.div variants={fadeIn}>
                    <HomeHero />
                </motion.div>
            </motion.section>

            {/* ===== Section 1: Process ===== */}
            <section className="relative mt-[1rem]">
                <Gradient
                    from="hsl(var(--brand-blue))"
                    to="hsl(var(--brand-green))"
                    width="clamp(20rem, 40vw, 40rem)"
                    height="clamp(40rem, 70vh, 60rem)"
                    opacity={0.3}
                    className="absolute left-1/3 -translate-x-1/2 -top-40 -z-10"
                />

                <Header
                    id="kb-articles"
                    align="center"
                    size="md"
                    maxWidth="5xl"
                    title="Why Software 5.0?"
                    subtitle="Tech isn’t neutral. Every app, platform, or system we build affects people and the planet. Most design processes only chase efficiency — but forget about inclusion, fairness, or sustainability."
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={stagger}
                >
                    <motion.div variants={fadeIn}>
                        <Content
                            badge={<Badge variant="outline">Process</Badge>}
                            title="From Idea to Impact"
                            titleClassName="text-[clamp(2rem,4vw,2.5rem)]"
                            imagePosition="left"
                            imageSrc="process.png"
                            imageAlt="Diagram showing Software 5.0 process"
                            description="Software 5.0 builds on the Double Diamond — a proven way to tackle complex problems."
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

                            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ y: 0 }}>
                                <ActionButton href="/process">Dive in Process</ActionButton>
                            </motion.div>
                        </Content>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Section 2: Toolkit ===== */}
            <section className="relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                >
                    <motion.div variants={fadeIn}>
                        <Content
                            badge={<Badge variant="outline">Knowledge Base</Badge>}
                            title="Learn Through Examples"
                            titleClassName="text-[clamp(2rem,4vw,2.5rem)]"
                            description="The Software 5.0 Knowledge Base shows how ideas become real impact. Explore case studies, examples, and stories that connect sustainability and inclusion to everyday design and development."
                            imagePosition="right"
                            imageSrc="toolkit.png"
                            imageAlt="Preview of the Software 5.0 knowledge base toolkit"
                        >
                            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <ActionButton href="/toolkit">Explore Knowledge Base</ActionButton>
                            </motion.div>
                        </Content>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== FAQs ===== */}
            <section className="pb-28  bg-bg">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold text-fg mb-4">
                            FAQs
                        </h2>
                        <motion.div
                            aria-hidden
                            initial={{ width: 0 }}
                            whileInView={{ width: "5rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mx-auto h-[2px] bg-[hsl(var(--border))]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaqList items={faqs} />
                    </motion.div>
                </div>
            </section>

            {/* ===== Global helpers ===== */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) }
                    50% { transform: translateY(-10px) }
                }
                .animate-float { animation: float 10s ease-in-out infinite; }
            `}</style>
        </main>
    );
}
