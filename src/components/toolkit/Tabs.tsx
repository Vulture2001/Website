// components/ui/Tabs.tsx
'use client'

import { cn } from '@/lib/cn'
import React from 'react'

export type TabItem = {
    value: string
    label: string
    color?: string // optional: used for PhaseTab where you want a colored dot
}

export interface TabsProps {
    items: TabItem[]
    active: string
    onChange: (val: string) => void
    /** Whether to prepend an "All" tab */
    showAll?: boolean
    /** Custom label for the "All" tab (default = "All") */
    allLabel?: string
    className?: string
}

export function Tabs({
                         items,
                         active,
                         onChange,
                         showAll = true,
                         allLabel = 'All',
                         className,
                     }: TabsProps) {
    return (
        <div
            className={cn('flex gap-6 mb-10 overflow-x-auto no-scrollbar', className)}
            role="tablist"
        >
            {showAll && (
                <button
                    role="tab"
                    aria-selected={active === 'all'}
                    onClick={() => onChange('all')}
                    className={cn(
                        'px-6 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors',
                        active === 'all'
                            ? 'border-[#0D6EFD] text-[#0D6EFD]'
                            : 'border-transparent text-[#5F6980] hover:text-[#282828]'
                    )}
                >
                    {allLabel}
                </button>
            )}

            {items.map((item) => (
                <button
                    key={item.value}
                    role="tab"
                    aria-selected={active === item.value}
                    onClick={() => onChange(item.value)}
                    className={cn(
                        'px-6 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors',
                        active === item.value
                            ? 'border-[#0D6EFD] text-[#0D6EFD]'
                            : 'border-transparent text-[#5F6980] hover:text-[#282828]'
                    )}
                >
                    {item.color && (
                        <span
                            className="inline-block w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                        />
                    )}
                    {item.label}
                </button>
            ))}
        </div>
    )
}
