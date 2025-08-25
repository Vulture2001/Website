// ActionButton.tsx
'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowIcon } from '../icons/ArrowIcon'
import { cn } from '@/lib/cn'

type Props = {
    href?: string // if provided -> renders a Link
    children: React.ReactNode
    className?: string
}

export function ActionButton({ href, children, className }: Props) {
    const content = (
        <>
            <span className="font-semibold">{children}</span>
            <ArrowIcon />
        </>
    )

    const linkClasses = cn(
        // mimic Button variant="text" color="neutral"
        'inline-flex items-center gap-2 underline underline-offset-8 decoration-1 hover:decoration-2',
        'text-neutral-900 hover:opacity-90 dark:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
    )

    if (href) {
        return (
            <Link href={href} className={linkClasses}>
                {content}
            </Link>
        )
    }

    return (
        <Button
            type="button"
            variant="text"
            color="neutral"
            className={cn(
                'inline-flex items-center gap-2 p-0 underline underline-offset-8 decoration-1 hover:decoration-2',
                className
            )}
        >
            {content}
        </Button>
    )
}
