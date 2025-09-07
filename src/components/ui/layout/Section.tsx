"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type MotionSectionProps = {
    id?: string;
    children: React.ReactNode;
    variants?: Variants;
    className?: string;
    stagger?: boolean;
};

export function MotionSection({
                                  id,
                                  children,
                                  variants,
                                  className,
                                  stagger = false,
                              }: MotionSectionProps) {
    return (
        <motion.section
            id={id}
            className={cn("relative mx-auto max-w-7xl px-4 lg:px-6 py-12", className)}
            /** Prevents "invisible content" bug on fast navigation */
            initial={false}
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={stagger ? undefined : variants}
        >
            <motion.div variants={variants}>{children}</motion.div>
        </motion.section>
    );
}
