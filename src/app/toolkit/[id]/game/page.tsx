'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageLayout } from '@components/layout/PageLayout';
import { PageHero } from "@components/hero/PageHero";
import Button from '@components/buttons/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Define fadeInUp variant
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function ToolGamePage() {
    const params = useParams();
    const { toolId } = params;

    const handleButtonClick = () => {
        console.log('Draw cards clicked!', toolId);
        // Add your card-drawing logic here
    };

    return (
        <PageLayout>
            <PageHero
                id="game-hero"
                eyebrow="Game"
                title="Critical Reflection Cards"
                subtitle="Tool to use the Critical Reflection Cards. It will draw two cards of each section."
                size="xl"
            />

            {/* Animate the images */}
            <AnimatePresence>
                <motion.div
                    className="flex justify-center items-center my-16 relative gap-0"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.1 }
                        },
                    }}
                >
                    {[
                        { src: '/png/Individual Impact.png', rotate: -30 },
                        { src: '/png/Social Impact.png', rotate: 0 },
                        { src: '/png/Environmental Impact.png', rotate: 30 },
                    ].map((img, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative z-${img.rotate === 0 ? '20' : '10'} ${idx === 0 ? '-mr-12' : idx === 2 ? '-ml-12' : ''}`}
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

            {/* Animate the button */}
            <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            >
                <Button
                    onClick={handleButtonClick}
                    variant="solid"
                    size="lg"
                    shape="pill"
                    color="default"
                >
                    Draw Cards
                </Button>
            </motion.div>
        </PageLayout>
    );
}
