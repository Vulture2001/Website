// app/knowledge-base/page.tsx
import KnowledgeHero from "@/components/knowledge-base/KnowledgeHero";
import SweetSpot from "@/components/knowledge-base/SweetSpot";
import ArticleGrid from "@/components/knowledge-base/ArticleGrid";
import { motion, type Variants } from "framer-motion";
import getAllSummaries from "@/data/articleService";
import Header from "@/components/ui/Header";

const container = "relative z-10 mx-auto max-w-7xl px-4 lg:px-6";

/* Motion variants */
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        opacity: 1,
        transition: { when: "beforeChildren", staggerChildren: 0.12 },
    },
};

export default async function KnowledgeBase() {
    const items = await getAllSummaries(); // ✅ now safe

    return (
        <main className="relative isolate">
            {/* Intro */}
            {/**/}

            {/* Hero + SweetSpot */}
            <motion.section
                aria-labelledby="kb-hero"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <KnowledgeHero />
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <SweetSpot />
                </motion.div>
            </motion.section>

            {/* Articles header */}
            <motion.section
                className={container}
                aria-labelledby="kb-articles"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <Header
                        id="kb-articles"
                        align="center"
                        size="xl"
                        maxWidth="5xl"
                        title="Knowledge Base"
                        subtitle="Knowledge Base is a library of principles, perspectives, and case studies that highlight the foundations of sustainable software."
                    />
                </motion.div>
            </motion.section>

            {/* Articles grid */}
            <motion.section
                aria-labelledby="kb-articles"
                className="mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUp}>
                    <ArticleGrid articles={items} />
                </motion.div>
            </motion.section>
        </main>
    );
}
