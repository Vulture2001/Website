'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/cn'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { MinusIcon } from '@/components/icons/MinusIcon'

export type Faq = {
    question: string
    answer: string
}

export interface FaqListProps {
    items: Faq[]
    className?: string
}

function FaqItem({
                     faq,
                     isOpen,
                     onToggle,
                 }: {
    faq: Faq
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <div className="border-b border-[#D0D5DD] pb-3">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-base font-semibold text-[#282828] flex-1">
                    {faq.question}
                </h3>
                <div className="w-6 h-6 flex items-center justify-center">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </div>
            </button>
            {isOpen && faq.answer && (
                <p className="mt-3 text-base text-[#282828] leading-relaxed">
                    {faq.answer}
                </p>
            )}
        </div>
    )
}

export function FaqList({ items, className }: FaqListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (i: number) =>
        setOpenIndex((prev) => (prev === i ? null : i))

    return (
        <div className={cn('space-y-8', className)}>
            {items.map((faq, i) => (
                <FaqItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                />
            ))}
        </div>
    )
}
