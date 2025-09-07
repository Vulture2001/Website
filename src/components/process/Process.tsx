"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/Badge";
import { PhaseCarousel } from "@/components/carousel/PhaseCarousel";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/layout/Section";

export default function Process() {
    return (
        <PageLayout>
            {/* ===== HERO ===== */}
            <PageHero
                id="process-hero"
                eyebrow="Process"
                title="From Big Challenges to Real Solutions"
                subtitle="Software 5.0 builds on the Double Diamond model but adapts it for modern realities. Explore problems deeply, define them clearly, develop creative ideas, and deliver working solutions — all while keeping social and environmental impacts in view."
                size="xl"
            />

            {/* ===== Illustration ===== */}
            <MotionSection
                id="process-illustration"
                variants={staggerContainer}
                className="flex justify-center"
            >
                <motion.figure variants={fadeInUp} className="mx-auto w-full max-w-5xl">
                    <img
                        src="/svg/process.svg"
                        alt="Process diagram illustrating the Software 5.0 workflow"
                        className="w-full h-auto"
                    />
                </motion.figure>
            </MotionSection>

            {/* ===== Two Tracks Section ===== */}
            <MotionSection id="process-tracks" variants={fadeInUp}>
                <motion.div
                    variants={fadeInUp}
                    className="grid gap-6 md:grid-cols-2 items-stretch"
                >
                    {/* Design Track */}
                    <div className="rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col">
                        <Badge
                            variant="outline"
                            className="inline-flex mb-6 px-4 py-1"
                            size="lg"
                            shape="pill"
                        >
                            Design Track
                        </Badge>
                        <h3 className="text-lg font-semibold text-fg mb-3">
                            Discover • Define • Develop • Deliver
                        </h3>
                        <p className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1">
                            The design track trains you to look beyond code and ask the right
                            questions: Who will use this system? What barriers might they
                            face? What unintended impacts could this create?
                        </p>
                    </div>

                    {/* Development Track */}
                    <div className="rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col">
                        <Badge
                            variant="outline"
                            className="inline-flex px-3 py-1 mb-6"
                            size="lg"
                            shape="pill"
                        >
                            Development Track
                        </Badge>
                        <h3 className="text-lg font-semibold text-fg mb-3">
                            Engineering & Delivery
                        </h3>
                        <p className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1">
                            In the development track, you turn concepts into real software.
                            Translate design insights into features, write code with
                            accessibility and sustainability in mind, and ensure reliability
                            at scale.
                        </p>
                    </div>
                </motion.div>
            </MotionSection>

            {/* ===== Phases Section ===== */}
            <MotionSection id="process-phases" variants={staggerContainer}>
                <motion.div variants={fadeInUp} className="text-center mb-8">
                    <h2 className="text-3xl font-semibold">Software 5.0 Phases</h2>
                    <p className="mt-2 text-muted-fg max-w-2xl mx-auto text-[15px]">
                        Each phase gives you hands-on skills to connect design thinking with
                        software engineering practice.
                    </p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <PhaseCarousel />
                </motion.div>
            </MotionSection>
        </PageLayout>
    );
}
