'use client'

import * as React from 'react'
import { InfiniteCarousel } from '@components/carousel/InfiniteCarousel'
import { SessionCard, type SessionCardData } from '@components/cards/SessionCard'
import sessionsJson from '@/data/sessions.json' assert { type: 'json' }

/* ----------------------------- Normalization ----------------------------- */
const SESSIONS: SessionCardData[] = (sessionsJson as any[]).map((session) => ({
    // Map label → title
    title: session.label,
    // Copy over other matching fields
    value: session.value,
    color: session.color,
    homeDescription: session.homeDescription,
    description: session.description,
    track: session.track,
}))

/* ----------------------------- Component ----------------------------- */
export function SessionCarousel() {
    return (
        <InfiniteCarousel
            items={SESSIONS}
            ariaLabel="Framework sessions carousel"
            slideWidth="max(350px, min(92vw, 500px))"
            gap={24}
        >
            {(card) => <SessionCard {...card} />}
        </InfiniteCarousel>
    )
}
