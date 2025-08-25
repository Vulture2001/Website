"use client";
import { HomeHero } from "@/components/home/HomeHero";
import { Content } from "../ui/Content";
import { Badge } from "../ui/Badge";
import { ActionButton } from "../ui/ActionButton";
import { Gradient } from "../ui/Gradient";
import faqs from "@/data/faq_home_page.json";
import { FaqList } from "../ui/FAQ";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger = {
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

function ParallaxGradient({
                              from,
                              to,
                              className,
                              width,
                              height,
                              opacity = 0.35,
                              blur = 220,
                              centered,
                          }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 6]);
    return (
        <motion.div ref={ref} style={{ y, rotate }} className="pointer-events-none">
            <Gradient
                from={from}
                to={to}
                centered={centered}
                className={className}
                width={width}
                height={height}
                opacity={opacity}
                blur={blur}
            />
        </motion.div>
    );
}

export default function Home() {
    return (
        <main className="relative isolate overflow-hidden">
            {/* ===== Global background accent near the top-left (parallax + subtle breathing) ===== */}
            <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-40 -left-52 -z-10" aria-hidden
            >

            </motion.div>

            {/* ===== HERO ===== */}
            <motion.div
                className="relative z-10"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                <motion.div variants={fadeIn}>
                    <HomeHero />
                </motion.div>
            </motion.div>

            {/* ===== Section 1: Process (gradient behind only this block) ===== */}
            <section className="relative">
                <ParallaxGradient
                    from="hsl(var(--color-indigo))"
                    to="hsl(var(--color-purple))"
                    centered
                    className="absolute inset-0 -z-10"
                    width="100%"
                    height="100%"
                    opacity={0.28}
                    blur={220}
                />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={stagger}
                >
                    <motion.div variants={fadeIn}>
                        <Content
                            badge={<Badge>Process</Badge>}
                            title="Process That Drives Change"
                            description={
                                <>
                                    The Software 5.0 Process helps teams explore, prototype, build, and deliver
                                    software that balances usability, inclusivity, and sustainability.
                                </>
                            }
                            imagePosition="left"
                            imageSrc="/images/toolkit-placeholder.jpg"
                            imageAlt="Toolkit preview"
                        >
                            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                                <ActionButton href="/process">Dive in Process</ActionButton>
                            </motion.div>
                        </Content>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Section 2: Toolkit (gradient behind only this block) ===== */}
            <section className="relative">
                <ParallaxGradient
                    from="hsl(var(--color-pink))"
                    to="hsl(var(--color-orange))"
                    centered
                    className="absolute inset-0 -z-10"
                    width="100%"
                    height="100%"
                    opacity={0.28}
                    blur={220}
                />

                <section className="relative">
                    <ParallaxGradient
                        from="hsl(var(--color-indigo))"
                        to="hsl(var(--color-purple))"
                        centered
                        className="absolute inset-0 -z-10"
                        width="100%"
                        height="100%"
                        opacity={0.28}
                        blur={220}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeIn}>
                            <Content
                                badge={<Badge>Toolkit</Badge>}
                                title="Turn Ideas Into Impact"
                                description="From journey maps to inclusive design cards..."
                                imagePosition="right"
                                imageSrc="/images/toolkit-placeholder.jpg"
                                imageAlt="Toolkit preview"
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.995 }}>
                                    <ActionButton href="/toolkit">Explore Toolkit</ActionButton>
                                </motion.div>
                            </Content>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ===== FAQs (accordion reveal + slight lift) ===== */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-4xl font-semibold text-[#282828] mb-4">FAQs</h2>
                            <motion.div
                                aria-hidden
                                initial={{ width: 0 }}
                                whileInView={{ width: "5rem" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="mx-auto h-[2px] bg-black/10"
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
            </section>

            {/* ===== Optional bottom-right global accent ===== */}
            <motion.div
                className="absolute -bottom-48 -right-40 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.35 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                aria-hidden
            >
                <Gradient
                    from="hsl(var(--brand-green))"
                    to="hsl(var(--brand-accent))"
                    width="100rem"
                    height="60rem"
                    opacity={0.5}
                    centered
                    // keep it positioned by this wrapper; no inset here
                    className="absolute"
                />
            </motion.div>

            {/* ===== Keyframe helpers (Tailwind arbitrary values) ===== */}
            <style jsx global>{`
                @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
                .animate-float { animation: float 10s ease-in-out infinite; }
            `}</style>
        </main>
    );
}
