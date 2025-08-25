'use client';

import "@/styles/hero.css";

import Link from "next/link";
import { cn } from "@/lib/cn";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ActionButton } from "@/components/ui/ActionButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";

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
                             description = "A framework for creating digital products that are sustainable, inclusive, and future-ready.",
                             cta = { label: "Getting Started", href: "/knowledge-base" },
                             secondaryHref = "/about",
                             className,
                         }: HeroProps) {
    return (
        <section
            className={cn("hero-section hero-padding", "relative", className)}
            aria-labelledby="home-hero-title"
            role="region"
        >
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                    {/* Left: content */}
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        {/* Eyebrow (optional) */}
                        {eyebrow && (
                            <Badge variant="outline" tone="gray" size="sm" shape="pill">
                                {eyebrow}
                            </Badge>
                        )}

                        {/* Title */}
                        <h1
                            id="home-hero-title"
                            className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
                        >
                            {titleLines.map((line, i) => (
                                <span key={i} className="block">
                  {line}
                </span>
                            ))}
                        </h1>

                        {/* Description (optional) */}
                        {description && (
                            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                                {description}
                            </p>
                        )}

                        {/* CTAs */}
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            {cta && (
                                <Link href={cta.href} aria-label={cta.label}>
                                    <Button size="lg" variant="solid" color="blue" shape="pill">
                                        {cta.label}
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                            {secondaryHref && <ActionButton href={secondaryHref}>About</ActionButton>}
                        </div>
                    </div>

                    {/* Right: media */}
                    <div className="relative mx-auto max-w-lg lg:max-w-none">
                        <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100/80 ring-1 ring-inset ring-gray-200 flex items-center justify-center">
                            <ImagePlaceholder />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
