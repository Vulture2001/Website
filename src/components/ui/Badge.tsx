import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import React from "react";

const badge = cva('inline-flex items-center gap-1 font-medium', {
    variants: {
        variant: {
            solid: 'text-white',
            outline: 'bg-transparent border border-[var(--text)] text-[var(--text)]',
            soft: 'bg-blue-50 text-blue-700',
        },
        tone: {
            gray: 'bg-neutral-800',
            primary: 'bg-blue-600',
            success: 'bg-green-600',
            warning: 'bg-amber-500',
            danger: 'bg-red-600',
        },
        size: {
            sm: 'h-6 px-2 text-[0.75rem] rounded-full',
            md: 'h-7 px-2.5 text-[0.875rem] rounded-full',
            lg: 'h-8 px-3 text-[1rem] rounded-full',
        },
        shape: { pill: 'rounded-full', rounded: 'rounded-md', sharp: 'rounded-none' },
    },
    defaultVariants: { variant: 'solid', tone: 'gray', size: 'md', shape: 'pill' },
})

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof badge> & { leftIcon?: React.ReactNode; rightIcon?: React.ReactNode }

export function Badge({ className, leftIcon, rightIcon, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badge(props), className)}>
      {leftIcon}
            {children}
            {rightIcon}
    </span>
    )
}
