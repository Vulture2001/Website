'use client'

import * as React from 'react'
import { InfiniteCarousel } from '@/components/ui/InfiniteCarousel'
import { PhaseCard, type PhaseCardData } from '@/components/carousel/PhaseCard'
import phasesJson from '@/data/phases.json' assert { type: 'json' }

type Phase = {
    value: string
    label: string
    color?: string
    description?: string
    disabled?: boolean
    track?: 'Design' | 'Development'
}

const PHASES = phasesJson as Phase[]

const CARDS: PhaseCardData[] = PHASES.map((p, i) => ({
    title: p.label || p.value,
    description: p.description,
    color: p.color,
    index1: i + 1,
    track:
        p.track ??
        (p.value?.toLowerCase() === 'development' ? 'Development' : 'Design'),
    disabled: p.disabled ?? p.value?.toLowerCase() === 'development',
}))

export function PhaseCarousel() {
    return (
        <InfiniteCarousel
            items={CARDS}
            ariaLabel="Framework phases carousel"
            slideWidth="max(350px, min(92vw, 500px))"
            gap={24}
        >
            {(card) => <PhaseCard {...card} />}
        </InfiniteCarousel>
    )
}