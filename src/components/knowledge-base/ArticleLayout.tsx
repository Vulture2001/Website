'use client';

import Image from 'next/image';
import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import {formatDate} from "@/lib/formatDate";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
    hidden: {},
    visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.08 } },
};

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
                    containerClassName="max-w-4xl mb-6"
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
                        {date ? (
                            <div className="mt-3 text-xs text-[hsl(var(--muted-fg))]">
                                <time dateTime={date}>{formatDate(date)}</time>
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {/* Hero Image */}
                {heroSrc ? (
                    <motion.div
                        className="mt-5 overflow-hidden rounded-[24px] bg-[hsl(var(--surface)/0.8)]"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 120 }}
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
                        className="mt-6 text-[15px] font-medium leading-7 text-muted-foreground"
                        variants={fadeInUp}
                    >
                        {lead}
                    </motion.p>
                ) : null}
            </motion.header>

            {/* Body */}
            <motion.div
                className="prose prose-neutral dark:prose-invert max-w-none mt-8"
                initial="hidden"
                animate="visible"
                variants={stagger}
            >
                {children}
            </motion.div>
        </article>
    );
}
