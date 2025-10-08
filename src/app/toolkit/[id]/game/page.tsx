'use client';

import React, { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { PageHero } from '@components/hero/PageHero';
import Button from '@components/buttons/Button';
import CardDisplay from './CardDisplay';
import { drawRandomCardsByType, cardsData, Card } from '@/lib/cardData';

export default function ToolGamePage() {
    const [showSvgs, setShowSvgs] = useState(false);
    const [drawnCards, setDrawnCards] = useState<Card[]>([]);
    const [redrawKey, setRedrawKey] = useState(Date.now().toString());

    const handleDrawCards = () => {
        const newDraw = drawRandomCardsByType(cardsData);
        setDrawnCards(newDraw);
        setShowSvgs(true);
        setRedrawKey(Date.now().toString());
    };

    return (
        <PageLayout className="min-h-screen flex flex-col">
            <div className="flex-grow">
                <PageHero
                    id="game-hero"
                    eyebrow="Game"
                    title="Critical Reflection Cards"
                    subtitle="Tool to use the Critical Reflection Cards. It will draw two cards per type, displayed column-wise."
                    size="xl"
                />

                <CardDisplay showSvgs={showSvgs} cards={drawnCards} redrawKey={redrawKey} />
            </div>

            <div className="flex justify-center mt-4 mb-12">
                <Button
                    onClick={handleDrawCards}
                    variant="solid"
                    size="lg"
                    shape="pill"
                    color="default"
                >
                    Draw Cards
                </Button>
            </div>
        </PageLayout>
    );
}
