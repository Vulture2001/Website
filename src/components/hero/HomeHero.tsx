"use client";

import Link from "next/link";
import { cn } from "@lib/cn";
import { Button } from "@components/buttons/Button";
import { Badge } from "@components/buttons/Badge";
import { ArrowRightIcon } from "@components/icons/ArrowRightIcon";

type CTA = { label: string; href: string };

type HeroProps = {
    titleLines?: string[];
    eyebrow?: string;
    description?: string;
    cta?: CTA;
    secondaryHref?: string;
    className?: string;
};

export function HomeHero({
                             titleLines = ["Responsible.", "Sustainable.", "Inclusive."],
                             eyebrow = "Digital Product Creation",
                             description = "Shape the Digital Future – fairly, sustainably, and consciously.",
                             cta = { label: "Explore Toolkit", href: "/toolkit" },
                             className,
                         }: HeroProps) {
    return (
        <section
            className={cn(
                "relative isolate overflow-hidden",
                "py-40 sm:py-40 lg:py-48",
                "bg-[radial-gradient(1000px_600px_at_70%_50%,hsl(var(--color-brand-primary)/0.3),hsl(var(--color-brand-accent)/0.25)_30%,hsl(var(--color-brand-orange)/0.2)_50%,hsl(var(--color-bg)/0)_70%)]",
                className
            )}
            aria-labelledby="home-hero-title"
            role="region"
        >
            {/* Logo behind content */}

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mb-10">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                    {/* Left content */}
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        {eyebrow && (
                            <Badge
                                variant="outline"
                                size="xl"
                                shape="pill"
                                className="opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]"
                            >
                                {eyebrow}
                            </Badge>
                        )}

                        <h1
                            id="home-hero-title"
                            className="mt-10 text-4xl font-bold tracking-tight text-surface-fg sm:text-6xl lg:text-8xl"
                        >
                            {titleLines.map((line, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "block opacity-0 translate-y-4 animate-fade-up",
                                        `[animation-delay:${400 + i * 200}ms] [animation-fill-mode:forwards]`
                                    )}
                                >
                  {line}
                </span>
                            ))}
                        </h1>

                        {description && (
                            <p className="mt-6 text-xl leading-8 text-text-muted max-w-xl opacity-0 animate-fade-up [animation-delay:1000ms] [animation-fill-mode:forwards]">
                                {description}
                            </p>
                        )}

                        {/* Additional text under description */}
                        <p className="mt-4 text-lg leading-7 text-text-muted max-w-xl opacity-0 animate-fade-up [animation-delay:1200ms] [animation-fill-mode:forwards]">
                            We encounter digital products every day – but who actually decides how they are designed? In this interdisciplinary module, participants develop ideas for digital solutions that incorporate social responsibility, ecological sustainability, and inclusion. They will learn methods of Conscious Service Design and work hands-on in teams to develop their own concept. Whether your interests are technical, creative, or societal – students’ perspectives are essential. Participants will build skills that are in high demand in today’s job market: creative problem-solving, digital design, responsible thinking, and teamwork.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start opacity-0 animate-fade-up [animation-delay:1300ms] [animation-fill-mode:forwards]">
                            {cta && (
                                <Link href={cta.href} aria-label={cta.label}>
                                    <Button size="lg" variant="outline" shape="pill">
                                        {cta.label}
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right column empty (since logo is centered behind) */}
                    <div className="hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
