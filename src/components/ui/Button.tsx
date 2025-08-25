'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const button = cva(
    [
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
        'disabled:opacity-50 disabled:pointer-events-none',
        'transition-[background,box-shadow,color,border] duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    ],
    {
        variants: {
            variant: {
                solid: 'text-white',
                outline: 'bg-transparent border',
                ghost: 'bg-transparent',
                subtle: '',
                text: 'bg-transparent underline underline-offset-4',
            },
            color: {
                neutral: 'text-[var(--btn-fg,inherit)]',
                blue: '',
                indigo: '',
                pink: '',
                red: '',
                orange: '',
                yellow: '',
                green: '',
                teal: '',
                cyan: '',
                purple: '',
            },
            size: {
                xs: 'h-8 px-3 text-[0.75rem]',
                sm: 'h-9 px-3.5 text-[0.875rem]',
                md: 'h-10 px-4 text-[0.9375rem]',
                lg: 'h-11 px-5 text-[1rem]',
                xl: 'h-12 px-6 text-[1.0625rem]',
            },
            shape: { pill: 'rounded-full', rounded: 'rounded-md', sharp: 'rounded-none' },
            inverted: { false: '', true: '' },
            loading: { false: '', true: 'relative aria-busy:cursor-wait' },
        },
        compoundVariants: [
            // solid
            { variant: 'solid', color: 'neutral', class: 'bg-neutral-900 hover:bg-neutral-800 focus-visible:ring-neutral-900 text-white dark:bg-neutral-100 dark:text-black dark:hover:bg-white' },
            { variant: 'solid', color: 'blue',    class: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-600 text-white' },
            { variant: 'solid', color: 'red',     class: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-600 text-white' },
            // outline
            { variant: 'outline', color: 'neutral', class: 'text-neutral-900 border-neutral-300 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/10' },
            { variant: 'outline', color: 'blue',    class: 'text-blue-700 border-blue-300 hover:bg-blue-50/60 dark:text-blue-300 dark:border-blue-300/40' },
            { variant: 'outline', color: 'red',     class: 'text-red-600 border-red-300 hover:bg-red-50/60 dark:text-red-300 dark:border-red-300/40' },
            // ghost
            { variant: 'ghost', color: 'neutral', class: 'text-neutral-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10' },
            { variant: 'ghost', color: 'blue',    class: 'text-blue-700 hover:bg-blue-50/60 dark:text-blue-300' },
            // subtle
            { variant: 'subtle', color: 'neutral', class: 'text-neutral-900 bg-neutral-100 hover:bg-neutral-200 dark:text-white dark:bg-white/10 dark:hover:bg-white/15' },
            { variant: 'subtle', color: 'blue',    class: 'text-blue-800 bg-blue-50 hover:bg-blue-100 dark:text-blue-200 dark:bg-blue-900/30' },
            // text
            { variant: 'text', color: 'blue',      class: 'text-blue-700 hover:opacity-90 dark:text-blue-300' },
            { variant: 'text', color: 'neutral',   class: 'text-neutral-900 hover:opacity-90 dark:text-white' },
        ],
        defaultVariants: {
            variant: 'solid',
            color: 'blue',
            size: 'md',
            shape: 'pill',
            inverted: false,
            loading: false,
        },
    }
)

type Variant = 'solid' | 'outline' | 'ghost' | 'subtle' | 'text'
type Color =
    | 'neutral' | 'blue' | 'indigo' | 'pink' | 'red' | 'orange' | 'yellow'
    | 'green' | 'teal' | 'cyan' | 'purple'
type SizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Shape = 'pill' | 'rounded' | 'sharp'

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
    VariantProps<typeof button> & {
    variant?: Variant
    color?: Color
    size?: SizeKey
    shape?: Shape
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    // asChild removed to lock to native <button>
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            shape,
            color,
            inverted,
            loading,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref
    ) => {
        const content = (
            <>
                {loading ? (
                    <span className="mr-2 -ml-1">Loading…</span>
                ) : leftIcon ? (
                    <span className="mr-2 -ml-1">{leftIcon}</span>
                ) : null}
                {children}
                {rightIcon && !loading && <span className="ml-2 -mr-1">{rightIcon}</span>}
            </>
        )

        return (
            <button
                ref={ref}
                aria-busy={!!loading}
                className={cn(button({ variant, size, shape, color, inverted, loading }), className)}
                {...props}
            >
                {content}
            </button>
        )
    }
)
Button.displayName = 'Button'

/** ---- IconButton ---- */
const sizeMap: Record<SizeKey, string> = {
    xs: 'h-8 w-8',
    sm: 'h-9 w-9',
    md: 'h-10 w-10',
    lg: 'h-11 w-11',
    xl: 'h-12 w-12',
}

type IconButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> & {
    children: React.ReactNode
}

export function IconButton({
                               children,
                               size = 'md',
                               shape = 'rounded',
                               variant = 'ghost',
                               color = 'neutral',
                               className,
                               ...props
                           }: IconButtonProps) {
    return (
        <Button
            aria-label="Icon button"
            variant={variant}
            color={color}
            size={size}
            shape={shape}
            className={cn('p-0', sizeMap[size], className)}
            {...props}
        >
            {children}
        </Button>
    )
}

export { Button as default }
