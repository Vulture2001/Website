"use client";

import React, { useState } from "react";
import { cn } from "@lib/cn";
import { PlusIcon } from "@components/icons/PlusIcon";
import { MinusIcon } from "@components/icons/MinusIcon";

export type Faq = {
    question: string;
    answer: string;
};

export interface FaqListProps {
    items: Faq[];
    className?: string;
}

function FaqItem({
                     faq,
                     isOpen,
                     onToggle,
                     index,
                 }: {
    faq: Faq;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    const answerId = `faq-answer-${index}`;

    return (
        <div className="border-b border-surface-border pb-3">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full text-left py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md transition-colors"
                aria-expanded={isOpen}
                aria-controls={answerId}
            >
                <h3 className="text-lg font-semibold text-surface-fg flex-1">
                    {faq.question}
                </h3>
                <div className="w-6 h-6 flex items-center justify-center text-surface-fg">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </div>
            </button>

            {/* Animated answer */}
            <div
                id={answerId}
                role="region"
                aria-hidden={!isOpen}
                className={cn(
                    "grid transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <p className="text-lg text-text-muted leading-relaxed">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FaqList({ items, className }: FaqListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

    return (
        <div className={cn("space-y-6", className)}>
            {items.map((faq, i) => (
                <FaqItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                    index={i}
                />
            ))}
        </div>
    );
}
