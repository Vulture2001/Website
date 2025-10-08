'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardItem from './CardItem';
import { Card } from '@/lib/cardData';

type CardDisplayProps = {
    showSvgs: boolean;
    cards: Card[];
    redrawKey: string;
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export default function CardDisplay({ showSvgs, cards, redrawKey }: CardDisplayProps) {
    const gridClass = `
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-10 justify-items-center my-16
    `;

    return (
        <AnimatePresence mode="wait">
            {!showSvgs ? (
                <AnimatePresence>
                    <motion.div
                        className="flex justify-center items-center my-16 relative gap-0"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {[
                            { src: '/png/Individual Impact.png', rotate: -30, z: 10, margin: '-mr-12' },
                            { src: '/png/Social Impact.png', rotate: 0, z: 20, margin: '' },
                            { src: '/png/Environmental Impact.png', rotate: 30, z: 10, margin: '-ml-12' },
                        ].map((img, idx) => (
                            <motion.div
                                key={idx}
                                className={`relative ${img.margin}`}
                                style={{ zIndex: img.z }}
                                variants={fadeInUp}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <img
                                    src={img.src}
                                    alt={`Critical Reflection Card ${idx + 1}`}
                                    className="block rounded-lg border border-gray-300 shadow-lg w-64"
                                    style={{ transform: `rotate(${img.rotate}deg)` }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            ) : (
                <motion.div
                    key={redrawKey}
                    className={gridClass}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                        >
                            <CardItem
                                scenario={card.scenario}
                                description={card.description}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
