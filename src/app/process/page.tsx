"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { PageHero } from "@components/hero/PageHero";
import { MotionSection } from "@components/layout/MotionSection";
import { SessionCarousel } from "@components/carousel/SessionsCarousel";

export default function Process() {
    return (
        <PageLayout>
            {/* ===== HERO ===== */}
            <PageHero
                id="process-hero"
                eyebrow="Process"
                title="From Big Challenges to Real Solutions"
                subtitle="Conscious design builds on the Double Diamond model but adapts it for modern realities. Explore problems deeply, define them clearly, develop creative ideas, and deliver working solutions — all while keeping social and environmental impacts in view."
                size="xl"
            />

            {/* ===== Illustration ===== */}
            {/* FIX: Removed 'flex justify-center'. The <figure> below handles centering via 'mx-auto'. */}
            <MotionSection
                id="process-illustration"
                className="opacity-0 animate-fade-up [animation-delay:200ms] [animation-fill-mode:forwards]"
            >
                <figure className="mx-auto w-full max-w-5xl">
                    <img
                        src="/svg/process.svg"
                        alt="Diagram showing the conscious design workflow"
                        className="w-full h-auto"
                    />
                </figure>
            </MotionSection>

            {/* ===== Sessions ===== */}
            <MotionSection
                id="process-sessions"
                className="mt-24 opacity-0 animate-fade-up [animation-delay:800ms] [animation-fill-mode:forwards]"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold text-fg">Sessions</h2>
                    <p className="mt-3 text-muted-fg max-w-2xl mx-auto text-[15px] leading-relaxed">
                        Each session gives you hands-on skills to connect design thinking with
                        software engineering practice.
                    </p>
                </div>
                <SessionCarousel />
            </MotionSection>
        </PageLayout>
    );
}