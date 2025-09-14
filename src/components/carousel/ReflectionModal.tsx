"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@components/buttons/Button";
import reflectionCards from "@/data/reflections.json";

type ReflectionCard = { id: number; scenario: string; description?: string };
type ReflectionModalProps = { open: boolean; onClose: () => void };

// 🎨 Brand token backgrounds with text color combos
const brandBgClasses: string[] = [
    "bg-brand-primary text-white",
    "bg-brand-accent text-white",
    "bg-brand-blue text-white",
    "bg-brand-cyan text-black",
    "bg-brand-green text-white",
    "bg-brand-orange text-black",
    "bg-brand-pink text-white",
    "bg-brand-purple text-white",
    "bg-brand-red text-white",
    "bg-brand-teal text-white",
    "bg-brand-yellow text-black",
];

export default function ReflectionModal({ open, onClose }: ReflectionModalProps) {
    const [card, setCard] = useState<ReflectionCard | null>(null);
// ✅ Safe initialization with fallback
    const [bgClass, setBgClass] = useState<string>(brandBgClasses[0] ?? "bg-brand-primary text-white");

    // pick random card + random background
    const drawCard = () => {
        const randomCard =
            reflectionCards[Math.floor(Math.random() * reflectionCards.length)]!;
        let randomBg = bgClass;
        while (randomBg === bgClass) {
            randomBg =
                brandBgClasses[Math.floor(Math.random() * brandBgClasses.length)]!;
        }
        setCard(randomCard);
        setBgClass(randomBg);
    };

    // auto-draw card when modal opens
    useEffect(() => {
        if (open) drawCard();
    }, [open]);

    // prevent body scroll when open
    useEffect(() => {
        if (!open) return;
        const { style } = document.documentElement;
        const prev = style.overflow;
        style.overflow = "hidden";
        return () => {
            style.overflow = prev;
        };
    }, [open]);

    // helpers
    const isWhiteText = bgClass.includes("text-white");

    const getScenarioClass = (text: string) => {
        if (text.length > 120) return "text-4xl md:text-6xl"; // very long
        if (text.length > 80) return "text-5xl md:text-7xl"; // medium
        return "text-7xl md:text-8xl"; // normal
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] w-screen h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Content */}
                    <motion.div
                        className={`relative w-full h-full flex flex-col ${bgClass} px-8 md:px-20 py-40`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 hover:opacity-80 transition"
                        >
                            <X size={36} />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col justify-between h-full max-w-7xl mx-auto py-14 px-6 md:px-20">
                            {/* Scenario */}
                            <div className="flex-1 flex items-center">
                                {card && (
                                    <div>
                                        <p
                                            className={`${getScenarioClass(
                                                card.scenario
                                            )} font-semibold leading-tight mb-6`}
                                        >
                                            {card.scenario}
                                        </p>
                                        {card.description && (
                                            <p className="text-lg md:text-2xl opacity-90 max-w-3xl">
                                                {card.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Button pinned bottom */}
                            <div className="mt-10">
                                <Button
                                    onClick={drawCard}
                                    variant="outline"
                                    color={isWhiteText ? "white" : "default"}
                                    size="lg"
                                    shape="pill"
                                >
                                    {card ? "Next" : "Draw Scenario"}
                                </Button>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
