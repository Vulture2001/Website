'use client'

import * as React from 'react'
import { InfiniteCarousel } from '@components/carousel/InfiniteCarousel'
import { SessionCard, type SessionCardData } from '@components/cards/SessionCard'
import sessionsJson from '@/data/sessions.json'

// 1. Define the shape of the raw JSON data
interface RawSessionData {
    label: string;
    value: string;
    color: string;
    homeDescription?: string;
    description?: string;
    track: string;
}

/* ----------------------------- Normalization ----------------------------- */
const SESSIONS: SessionCardData[] = (sessionsJson as unknown as RawSessionData[]).map((session) => ({
    title: session.label,
    value: session.value,
    color: session.color,
    homeDescription: session.homeDescription,
    description: session.description,
    // FIX: Type assertion here tells TS "I promise this string is either 'Design' or 'Development'"
    track: session.track as SessionCardData['track'],
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