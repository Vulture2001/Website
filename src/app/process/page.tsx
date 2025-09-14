"use client";

import { PageLayout } from "@components/layout/PageLayout";
import { PageHero } from "@components/hero/PageHero";
import { MotionSection } from "@components/layout/MotionSection";
import { PhaseCarousel } from "@/components/carousel/PhaseCarousel";
import {TrackCard} from "@components/cards/TrackCard";

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
                className="flex justify-center opacity-0 animate-fade-up [animation-delay:200ms] [animation-fill-mode:forwards]"
            >
                <figure className="mx-auto w-full max-w-5xl">
                    <img
                        src="/svg/process.svg"
                        alt="Diagram showing the Software 5.0 workflow"
                        className="w-full h-auto"
                    />
                </figure>
            </MotionSection>

            {/* ===== Two Tracks ===== */}<MotionSection
            id="process-tracks"
            className="opacity-0 animate-fade-up [animation-delay:400ms] [animation-fill-mode:forwards]"
        >
            <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 gap-8">
                <TrackCard
                    badge="Design Track"
                    title="Discover • Define • Develop • Deliver"
                    description="The design track trains you to look beyond code and ask the right questions: Who will use this system? What barriers might they face? What unintended impacts could this create?"
                />
                <TrackCard
                    badge="Development Track"
                    title="Engineering & Delivery"
                    description="In the development track, you turn concepts into real software. Translate design insights into features, write code with accessibility and sustainability in mind, and ensure reliability at scale."
                />
            </div>
        </MotionSection>

            {/* ===== Phases ===== */}
            <MotionSection
                id="process-phases"
                className="mt-24 opacity-0 animate-fade-up [animation-delay:800ms] [animation-fill-mode:forwards]"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold text-fg">Software 5.0 Phases</h2>
                    <p className="mt-3 text-muted-fg max-w-2xl mx-auto text-[15px] leading-relaxed">
                        Each phase gives you hands-on skills to connect design thinking with
                        software engineering practice.
                    </p>
                </div>
                <PhaseCarousel />
            </MotionSection>
        </PageLayout>
    );
}
