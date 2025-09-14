'use client';

import React, { useMemo, useState } from 'react';
import { Input } from '@components/inputs/Input';
import { Tabs } from '@components/toolkit/Tabs';
import { MotionSection } from '@components/layout/MotionSection';
import { fadeInUp } from '@lib/animations';
import { motion, AnimatePresence } from 'framer-motion';
import categoriesJson from '@/data/phases.json';
import toolsJson from '@/data/tools.json';
import { ToolCard } from '../cards/ToolCard';
import { buildCategoryMaps } from '@lib/categories';

type Category = { label: string; value: string; color: string };
type Tool = {
    id: string | number;
    title: string;
    description?: string;
    category?: string;
    overview?: string;
    purpose?: string;
    phase?: string;
};

export function ToolLibrary() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = categoriesJson as Category[];
    const tools = toolsJson as Tool[];
    const { labelByValue, colorByValue } = useMemo(
        () => buildCategoryMaps(categories),
        [categories]
    );

    const normalizedTools = useMemo(() => {
        return tools.map((t) => {
            const cat = (t.category || t.phase || '').trim().toLowerCase();
            const blurb = t.overview || t.purpose || t.description || '';
            return { ...t, _category: cat || 'uncategorized', _blurb: blurb };
        });
    }, [tools]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const t of normalizedTools) {
            counts[t._category] = (counts[t._category] || 0) + 1;
        }
        return counts;
    }, [normalizedTools]);

    const filteredTools = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return normalizedTools.filter((t) => {
            const matchesCategory =
                activeCategory === 'all' || t._category === activeCategory;
            if (!matchesCategory) return false;
            if (!term) return true;
            const haystack = [t.title, t._blurb, t.purpose ?? '', t.overview ?? '']
                .join(' ')
                .toLowerCase();
            return haystack.includes(term);
        });
    }, [normalizedTools, activeCategory, searchTerm]);

    return (
        <MotionSection
            id="tool-library"
            variants={fadeInUp}
            className="opacity-0 animate-fade-up [animation-delay:150ms] [animation-fill-mode:forwards]"
        >
            {/* Header */}
            <motion.div
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <h2 className="text-2xl sm:text-3xl font-semibold text-fg">
                    Tool Library
                </h2>
                <div className="w-full md:w-96">
                    <Input
                        aria-label="Search tools"
                        placeholder="Search tools, purposes, or overviews"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 px-4 rounded-full border border-[hsl(var(--border))] bg-surface text-fg placeholder:text-muted-fg"
                    />
                </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            >
                <Tabs
                    items={categories.map((c) => {
                        const value = c.value.toLowerCase();
                        return {
                            value,
                            label: c.label,
                            color: c.color,
                            disabled: (categoryCounts[value] ?? 0) === 0,
                        };
                    })}
                    active={activeCategory}
                    onChange={setActiveCategory}
                    showAll
                />
            </motion.div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                {filteredTools.length > 0 ? (
                    <motion.div
                        key={activeCategory + searchTerm} // re-trigger animation on change
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-8"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                    >
                        {filteredTools.map((tool) => (
                            <motion.div
                                key={tool.id}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <ToolCard
                                    tool={tool}
                                    catLabel={labelByValue.get(tool._category)}
                                    catColor={colorByValue.get(tool._category)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-tools"
                        className="mt-10 text-center text-muted-fg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        No tools found in this category.
                    </motion.p>
                )}
            </AnimatePresence>
        </MotionSection>
    );
}
