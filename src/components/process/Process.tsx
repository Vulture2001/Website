import { Gradient } from "@/components/ui/Gradient";
import Header from "@/components/ui/Header";
import { PhaseCarousel } from "@/components/carousel/PhaseCarousel";
import { cn } from "@/lib/cn";
import React from "react";

export default function Process() {
    return (
        <div
            id="process"
            className="relative isolate min-h-screen overflow-x-hidden overscroll-none bg-bg"
        >
            {/* Background gradients (decorative, hidden from screen readers) */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                aria-hidden="true"
            >
                <Gradient
                    from="hsl(var(--brand-primary))"
                    to="hsl(var(--brand-orange))"
                    width="100rem"
                    height="60rem"
                    opacity={0.5}
                    className="absolute left-1/2 -translate-x-1/2 -top-40"
                />
                <Gradient
                    from="hsl(var(--brand-pink))"
                    to="hsl(var(--brand-green))"
                    width="200rem"
                    height="80rem"
                    className="absolute left-1/2 -translate-x-1/2 top-0"
                />
            </div>

            <main className="relative z-10 flex flex-col items-center gap-16 px-4 pt-16 pb-24 sm:gap-20 sm:pt-20 sm:pb-32">
                {/* Hero Section */}
                <Header
                    id="process-hero"
                    eyebrow="Process"
                    align="center"
                    title="From Big Challenges to Real Solutions"
                    subtitle="The Software 5.0 process builds on the Double Diamond. It helps you explore problems deeply, define them clearly, develop ideas, and deliver solutions — while always considering social and ecological impacts."
                    size="xl"
                    maxWidth="5xl"
                />

                {/* Illustration */}
                <figure className="mx-auto w-full max-w-6xl">
                    <img
                        src="/process1.svg"
                        alt="" // decorative, since Header already explains context
                        className="w-full h-auto"
                        role="presentation"
                    />
                </figure>

                {/* Two Tracks Description */}
                <p
                    className={cn(
                        "text-[#282828]/80 font-inter leading-relaxed max-w-3xl text-lg text-center sm:text-left"
                    )}
                >
                    <strong>Two Tracks, One Process</strong>
                    <br />
                    <br />
                    Software 5.0 has two connected tracks:
                    <br />
                    <br />
                    <strong>Design Track</strong> — Discover, Define, Develop, and Deliver. This is
                    where you explore problems, shape ideas, and test solutions with people, society,
                    and the environment in mind.
                    <br />
                    <br />
                    <strong>Development Track</strong> — Software Development. This is where ideas
                    turn into working products. Here, accessibility, transparency, and
                    sustainability are built into the code and deployment.
                    <br />
                    <br />👉 The design track helps you understand and shape solutions. The
                    development track makes them real — responsibly.
                </p>

                {/* Phases Section */}
                <section
                    id="phases-row"
                    aria-labelledby="phases-title"
                    className="w-full max-w-7xl mt-12 sm:mt-16"
                >
                    <h2 id="phases-title" className="sr-only">
                        Process Phases
                    </h2>
                    <div className="py-10 sm:px-6 lg:px-8">
                        <PhaseCarousel />
                    </div>
                </section>
            </main>
        </div>
    );
}
