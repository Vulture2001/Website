// components/ui/Breadcrumb.tsx
'use client'

import Link from 'next/link'
import { cn } from '@lib/cn'
import * as React from 'react'

export type Crumb = {
    label: React.ReactNode
    href?: string // omit for the current page
}

type BreadcrumbProps = {
    items: Crumb[]
    /** Outer wrapper classes (spacing/layout) */
    containerClassName?: string
    /** <nav> text styling, etc. */
    className?: string
    /** Custom separator; defaults to "/" */
    separator?: React.ReactNode
}

export function Breadcrumb({
                               items,
                               containerClassName,
                               className,
                               separator = '/',
                           }: BreadcrumbProps) {
    if (!items?.length) return null
    const lastIndex = items.length - 1

    return (
        <div className={cn('max-w-8xl pt-10 mb-7', containerClassName)}>
            <nav
                aria-label="Breadcrumb"
                className={cn('text-sm text-[#5F6980]', className)}
            >
                <ol className="flex flex-wrap items-center">
                    {items.map((item, i) => {
                        const isLast = i === lastIndex
                        return (
                            <li key={i} className="flex items-center">
                                {isLast || !item.href ? (
                                    <span
                                        aria-current="page"
                                        className="text-[#282828] font-medium line-clamp-1"
                                        title={typeof item.label === 'string' ? item.label : undefined}
                                    >
                    {item.label}
                  </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="hover:underline focus:underline outline-none"
                                    >
                                        {item.label}
                                    </Link>
                                )}

                                {!isLast && (
                                    <span className="mx-2 select-none" aria-hidden="true">
                    {separator}
                  </span>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}
