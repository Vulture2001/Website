'use client'

import * as React from 'react'
import { InfiniteCarousel } from '@components/carousel/InfiniteCarousel'
import { PhaseCard, type PhaseCardData } from '@components/cards/PhaseCard'
import phasesJson from '@/data/phases.json' assert { type: 'json' }

/* ----------------------------- Types ----------------------------- */
type Phase = {
    value: string
    label?: string
    color?: string
    description?: string
    disabled?: boolean
    track?: 'Design' | 'Development'
}

/* ----------------------------- Normalization ----------------------------- */
function mapPhaseToCard(phase: Phase, index: number): PhaseCardData {
    const normalizedTrack: 'Design' | 'Development' =
        phase.track ??
        (phase.value.toLowerCase().includes('development')
            ? 'Development'
            : 'Design')

    return {
        title: phase.label || phase.value,
        description: phase.description,
        color: phase.color,
        index1: index + 1,
        track: normalizedTrack,
        disabled: phase.disabled ?? normalizedTrack === 'Development',
    }
}

const CARDS: PhaseCardData[] = (phasesJson as Phase[]).map(mapPhaseToCard)

/* ----------------------------- Component ----------------------------- */
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
