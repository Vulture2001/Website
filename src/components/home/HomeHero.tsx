'use client';

import "@/styles/hero.css";

import Link from "next/link";
import { cn } from "@/lib/cn";

import { Button } from "@/components/ui/buttons/Button";
import { Badge } from "@/components/ui/Badge";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import {ArrowRightIcon} from "@/components/ui/icons/ArrowRightIcon";

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
                             titleLines = ["Design.", "Develop.", "Sustainably."],
                             eyebrow = "Software 5.0",
                             description = "Software 5.0 helps you design digital products that don’t just work — but also care. Care for people, care for communities, and care for the planet.",
                             cta = { label: "Explore Toolkit", href: "/toolkit" },
                             secondaryHref = "/about",
                             className,
                         }: HeroProps) {
    return (
        <section
            className={cn("hero-section hero-padding", "relative", className)}
            aria-labelledby="home-hero-title"
            role="region"
        >
            <div className="relative max-w-8xl px-6 lg:px-74 mb-10">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                    {/* Left: articles */}
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        {eyebrow && (
                            <Badge variant="outline" tone="gray" size="lg" shape="pill">
                                {eyebrow}
                            </Badge>
                        )}

                        <h1
                            id="home-hero-title"
                            className="mt-10 text-4xl font-bold tracking-tight text-fg sm:text-6xl lg:text-8xl"
                        >
                            {titleLines.map((line, i) => (
                                <span key={i} className="block">
                  {line}
                </span>
                            ))}
                        </h1>

                        {description && (
                            <p className="mt-6 text-lg leading-8 text-muted-fg max-w-xl">
                                {description}
                            </p>
                        )}

                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            {cta && (
                                <Link href={cta.href} aria-label={cta.label}>
                                    <Button size="lg" variant="solid" color="blue" shape="pill">
                                        {cta.label}
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                            {secondaryHref && (
                                <ActionButton href={secondaryHref}>About</ActionButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
