'use client';

import Image from 'next/image';
import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';

/* ----------------------------- motion ----------------------------- */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        opacity: 1,
        transition: { when: 'beforeChildren', staggerChildren: 0.08 },
    },
};

/* ----------------------------- component ----------------------------- */

export function ArticleLayout({
                                  title,
                                  heroSrc,
                                  heroAlt,
                                  heroAspect = 'aspect-[4/3]',
                                  lead,
                                  date,
                                  className,
                                  children,
                                  breadcrumbs,
                              }: {
    title: React.ReactNode;
    heroSrc?: string;
    heroAlt?: string;
    heroAspect?: string;
    lead?: React.ReactNode;
    date?: string;
    className?: string;
    children: React.ReactNode;
    breadcrumbs?: Crumb[];
}) {
    return (
        <article className={cn('mx-auto mt-10 max-w-3xl px-4 py-10', className)}>
            {/* Breadcrumbs */}
            {breadcrumbs?.length ? (
                <Breadcrumb
                    items={breadcrumbs}
                    containerClassName="max-w-4xl"
                    className="text-xs md:text-sm"
                />
            ) : null}

            {/* Header */}
            <motion.header initial="hidden" animate="visible" variants={stagger}>
                <motion.h1
                    className="mb-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl"
                    variants={fadeInUp}
                >
                    {title}
                </motion.h1>

                {/* Date */}
                {date ? (
                    <div className="mt-3 text-xs text-[hsl(var(--muted-fg))]">
                        <time dateTime={date}>{date}</time>
                    </div>
                ) : null}

                {/* Hero Image */}
                {heroSrc ? (
                    <motion.div
                        className="mt-5 overflow-hidden rounded-[24px] bg-[hsl(var(--surface)/0.8)]"
                        variants={fadeInUp}
                    >
                        <div className={cn('relative w-full', heroAspect)}>
                            <Image
                                src={heroSrc}
                                alt={heroAlt ?? ''}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                ) : null}

                {/* Lead paragraph */}
                {lead ? (
                    <motion.p
                        className="mt-6 text-[15px] font-semibold leading-7 text-fg/90"
                        variants={fadeInUp}
                    >
                        {lead}
                    </motion.p>
                ) : null}
            </motion.header>

            {/* Body */}
            <motion.div
                className="mt-4 space-y-5 text-[15px] leading-7"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                {children}
            </motion.div>
        </article>
    );
}
