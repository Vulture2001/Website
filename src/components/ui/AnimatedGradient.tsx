'use client'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/cn'

export type AnimatedGradientProps = {
    children: React.ReactNode
    className?: string
    duration?: number
    rotate?: number
    x?: number
    y?: number
}

export default function AnimatedGradient({
                                             children,
                                             className,
                                             duration = 22,
                                             rotate = 12,
                                             x = 30,
                                             y = 30,
                                         }: AnimatedGradientProps) {
    const prefersReduced = useReducedMotion()

    if (prefersReduced) {
        return <div className={cn('absolute will-change-transform', className)}>{children}</div>
    }

    return (
        <motion.div
            className={cn('absolute will-change-transform', className)}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{ x: [0, x, 0, -x, 0], y: [0, -y, 0, y, 0], rotate: [0, rotate, 0, -rotate, 0] }}
            transition={{ duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        >
            {children}
        </motion.div>
    )
}