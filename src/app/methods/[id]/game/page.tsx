'use client';

import React, { useState, use } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumb } from '@components/navigation/Breadcrumb';
import Button from '@components/buttons/Button';
import CardDisplay from '@/components/toolkit/CardDisplay';
import { drawRandomCardsByType, cardsData, Card } from '@/lib/cardData';
import { getToolById } from '@/lib/tools';

export default function ToolGamePage({ params }: { params: Promise<{ id: string }> }) {
    const [showSvgs, setShowSvgs] = useState(false);
    const [drawnCards, setDrawnCards] = useState<Card[]>([]);
    const [redrawKey, setRedrawKey] = useState(Date.now().toString());

    const { id } = use(params);
    const tool = getToolById(id);
    const toolTitle = tool?.title || 'Method';

    const handleDrawCards = () => {
        const newDraw = drawRandomCardsByType(cardsData);
        setDrawnCards(newDraw);
        setShowSvgs(true);
        setRedrawKey(Date.now().toString());
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-surface">
            {/* Breadcrumb - Same as ToolDetail */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Methods', href: '/methods' },
                    { label: toolTitle, href: `/toolkit/${id}` },
                    { label: 'Critical Reflection Cards' },
                ]}
                containerClassName="max-w-7xl mx-auto px-4 pt-6"
            />

            {/* Hero - Same style as ToolDetail */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center text-center px-4 py-16 gap-6 max-w-3xl mx-auto"
            >
                {/* Badge */}
                <div className="flex gap-3 flex-wrap justify-center">
                    <span className="inline-flex px-4 py-1 rounded-full border border-border text-sm font-semibold uppercase">
                        Game
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-fg leading-snug tracking-tight">
                    Critical Reflection Cards
                </h1>

                {/* Overview */}
                <p className="text-base sm:text-xl text-muted-fg leading-relaxed">
                    Method to use the Critical Reflection Cards. It will draw two cards per type, displayed column-wise.
                </p>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
                <CardDisplay showSvgs={showSvgs} cards={drawnCards} redrawKey={redrawKey} />

                <div className="flex justify-center mt-8">
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
            </div>
        </div>
    );
}