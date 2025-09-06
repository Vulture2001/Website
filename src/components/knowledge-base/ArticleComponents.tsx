'use client';

import Image from 'next/image';
import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

/* ----------------------------- motion ----------------------------- */
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ----------------------------- components ----------------------------- */

export function H2({ children }: { children: React.ReactNode }) {
    return (
        <motion.h2
            className="group mt-12 text-2xl font-semibold tracking-tight text-fg scroll-mt-24"
            variants={fadeInUp}
        >
            {children}
        </motion.h2>
    );
}

export function P({ children }: { children: React.ReactNode }) {
    return (
        <motion.p
            className="text-[15px] leading-7 text-[hsl(var(--muted-fg))]"
            variants={fadeInUp}
        >
            {children}
        </motion.p>
    );
}

export function Quote({
                          children,
                          cite,
                      }: {
    children: React.ReactNode;
    cite?: React.ReactNode;
}) {
    return (
        <motion.figure
            className="mt-8 rounded-2xl bg-brand.accent/10 p-6 text-center ring-1 ring-[hsl(var(--border))]"
            variants={fadeInUp}
        >
            <div className="mb-3 text-4xl leading-none text-brand.accent">”</div>
            <blockquote className="mx-auto max-w-2xl text-[15px] leading-7 text-[hsl(var(--muted-fg))]">
                {children}
            </blockquote>
            {cite ? (
                <figcaption className="mt-4 text-sm text-[hsl(var(--muted-fg))]">— {cite}</figcaption>
            ) : null}
        </motion.figure>
    );
}

export function Figure({
                           src,
                           alt = '',
                           caption,
                           aspect = 'aspect-[16/9]',
                       }: {
    src: string;
    alt?: string;
    caption?: React.ReactNode;
    aspect?: string;
}) {
    return (
        <motion.figure className="mt-6" variants={fadeInUp}>
            <div className="overflow-hidden rounded-xl bg-[hsl(var(--surface)/0.8)] ring-1 ring-[hsl(var(--border))]">
                <div className={cn('relative w-full', aspect)}>
                    <Image src={src} alt={alt} fill className="object-cover" />
                </div>
            </div>
            {caption ? (
                <figcaption className="mt-2 text-xs text-[hsl(var(--muted-fg))]">{caption}</figcaption>
            ) : null}
        </motion.figure>
    );
}
