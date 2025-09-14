"use client";

import { useCallback, useEffect, useState } from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { FaqList } from "@/components/ui/FAQ";
import faqs from "@/data/faq_home_page.json";
import Button from "@/components/ui/buttons/Button";
import {ArrowDown} from "lucide-react"; // <-- reuse & rotate

export default function Home() {
    const [showScrollButton, setShowScrollButton] = useState(true);

    const scrollToFaq = useCallback(() => {
        document.getElementById("faq-heading")?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const faqEl = document.getElementById("faq-heading");
        if (!faqEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setShowScrollButton(!entry.isIntersecting);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(faqEl);
        return () => observer.disconnect();
    }, []);

    return (
        <main className="relative isolate overflow-hidden bg-bg text-text">
            <section aria-labelledby="hero-heading">
                <h1 id="hero-heading" className="sr-only">Welcome to Software 5.0</h1>
                <HomeHero />
            </section>

            {showScrollButton && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 ">
                    <Button
                        onClick={scrollToFaq}
                        aria-label="Scroll to FAQs"
                        variant="outline"
                        size="lg"
                        shape="pill"
                        className="h-15 w-15 p-0 flex items-center justify-center rounded-full animate-bounce group"
                    >
                        <ArrowDown
                            className="h-6 w-6 text-black group-hover:text-white transition-colors"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            )}

            <section className="pb-28 mt-12 md:mt-20 bg-bg" aria-labelledby="faq-heading">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 id="faq-heading" className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold text-surface-fg mb-4">
                            FAQs
                        </h2>
                        <div className="mx-auto h-[2px] w-20 bg-surface-border" />
                    </div>
                    <FaqList items={faqs} />
                </div>
            </section>
        </main>
    );
}
