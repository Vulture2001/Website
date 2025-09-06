'use client';

import Header from "@/components/ui/layout/Header";
import { PhaseCarousel } from "@/components/carousel/PhaseCarousel";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import React from "react";

export default function Process() {
    return (
        <div
            id="process"
            className="relative isolate min-h-screen overflow-x-hidden overscroll-none bg-bg"
        >
            {/* Background gradients */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                aria-hidden="true"
            ></div>

            <main className="relative z-10 flex flex-col items-center gap-10 px-6 pt-20 pb-20 sm:gap-20 sm:pt-20 sm:pb-24">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <Header
                        id="process-hero"
                        eyebrow="Process"
                        align="center"
                        title="From Big Challenges to Real Solutions"
                        subtitle="Software 5.0 builds on the Double Diamond model but adapts it for the realities of modern software engineering. You will learn to deeply explore problems, define them clearly, develop creative ideas, and deliver working solutions — all while keeping social and environmental impacts in view."
                        size="xl"
                        maxWidth="5xl"
                    />
                </motion.div>

                {/* Illustration */}
                <motion.figure
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mx-auto w-full max-w-5xl"
                >
                    <img
                        src="/svg/process.svg"
                        alt=""
                        className="w-full h-auto"
                        role="presentation"
                    />
                </motion.figure>

                {/* Two Tracks Section */}
                <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <Header
                            id="process-hero"
                            align="center"
                            title="From Design Thinking to Code"
                            subtitle="As software engineers, you don’t just write code. You also need to understand people, systems, and the wider impact of what you build. The Software 5.0 process combines two tracks: one focused on design, the other on development. Together, they help you create software that is usable, reliable, and responsible."
                            size="md"
                            maxWidth="5xl"
                        />
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Design Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col"
                        >
                            <div>
                                <Badge
                                    variant="outline"
                                    className="inline-flex mb-6 px-4 py-1"
                                    size="lg"
                                    shape="pill"
                                >
                                    Design Track
                                </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-fg mb-3">
                                Discover • Define • Develop • Deliver
                            </h3>
                            <p className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1">
                                The design track trains you to look beyond code and ask the right questions:
                                Who will use this system? What barriers might they face? What unintended
                                impacts could this create?
                            </p>
                        </motion.div>

                        {/* Development Track */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-gray-200 bg-[hsl(var(--surface)/0.8)] p-8 flex flex-col"
                        >
                            <div>
                                <Badge
                                    variant="outline"
                                    className="inline-flex px-3 py-1 mb-6"
                                    size="lg"
                                    shape="pill"
                                >
                                    Development Track
                                </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-fg mb-3">
                                Engineering & Delivery
                            </h3>
                            <p className="text-[15px] leading-relaxed text-[hsl(var(--muted-fg))] flex-1">
                                In the development track, you turn concepts into real software. You will
                                translate design insights into features, write code with accessibility and
                                sustainability in mind, and ensure that your solution is reliable at scale.
                            </p>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-10 text-center text-[15px] text-[hsl(var(--muted-fg))] max-w-2xl mx-auto"
                    >
                        As a student, you will practice thinking like both a designer and an engineer.
                        The design track sharpens your empathy and problem-framing skills.
                        The development track gives you the technical discipline to bring ideas to
                        life. Together, they prepare you for building software that is not only
                        functional but also fair, sustainable, and future-ready.
                    </motion.p>
                </section>

                {/* Phases Section */}
                <section
                    id="phases-row"
                    aria-labelledby="phases-title"
                    className="w-full max-w-7xl mt-12 sm:mt-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Header
                            align="center"
                            title="Software 5.0 Phases"
                            subtitle="Each phase gives you hands-on skills to connect design thinking with software engineering practice. Explore them below."
                            size="md"
                            maxWidth="5xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="py-10 sm:px-6 lg:px-8"
                    >
                        <PhaseCarousel />
                    </motion.div>
                </section>
            </main>
        </div>
    );
}
