"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@lib/cn";

type MotionSectionProps = {
    id?: string;
    children: React.ReactNode;
    variants?: Variants;
    className?: string;
    stagger?: boolean;
};

/** Default subtle fade-up animation */
const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function MotionSection({
                                  id,
                                  children,
                                  variants = defaultVariants,
                                  className,
                                  stagger = false,
                              }: MotionSectionProps) {
    return (
        <motion.section
            id={id}
            className={cn(
                "relative mx-auto max-w-7xl px-4 lg:px-6 py-12",
                className
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger ? { visible: { transition: { staggerChildren: 0.1 } } } : undefined}
        >
            <motion.div variants={variants}>{children}</motion.div>
        </motion.section>
    );
}
