// app/methods/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { truncate } from '@lib/truncate';
import { PageLayout } from '@components/layout/PageLayout';
import { PageHero } from '@components/hero/PageHero';
import { MotionSection } from '@components/layout/MotionSection';
import { fadeInUp } from '@lib/animations';
import { Input } from '@components/inputs/Input';
import { Card, CardBody } from '@components/cards/Card';
import categoriesJson from '@/data/sessions.json';
import toolsJson from '@/data/tools.json';
import { Tabs } from '@components/toolkit/Tabs';

type Category = { label: string; value: string; color: string };
type Step = { title?: string; description?: string } | string;
type Tool = {
    id: string | number;
    title: string;
    description?: string;
    category?: string;
    overview?: string;
    purpose?: string;
    phase?: string;
    steps?: Step[];
};

const buildCategoryMaps = (cats: Category[]) => {
    const labelByValue = new Map<string, string>();
    const colorByValue = new Map<string, string>();
    for (const c of cats) {
        labelByValue.set(c.value, c.label);
        colorByValue.set(c.value, c.color);
    }
    return { labelByValue, colorByValue };
};

function ToolCard({
                      tool,
                      catLabel,
                      catColor,
                  }: {
    tool: Tool & { _category: string; _blurb: string };
    catLabel?: string;
    catColor?: string;
}) {
    return (
        <Card className="rounded-2xl border border-[hsl(var(--border))] bg-surface/80 h-full flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardBody className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: catColor ?? 'hsl(var(--muted-fg))' }}
                    />
                    {tool._category !== 'uncategorized' && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-fg">
              {catLabel ?? tool._category}
            </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-fg leading-snug line-clamp-2">
                    {tool.title}
                </h3>

                <p className="mt-3 text-sm text-muted-fg leading-relaxed line-clamp-3 flex-1">
                    {truncate(tool._blurb, 100)}
                </p>

                <div className="flex justify-end pt-4">
                    <Link
                        href={`/toolkit/${encodeURIComponent(String(tool.id))}`}
                        className="text-sm font-medium text-brand-primary hover:underline"
                        aria-label={`Explore method: ${tool.title}`}
                    >
                        Explore method →
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}

export default function Toolkit() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const categories = categoriesJson as Category[];
    const tools = toolsJson as Tool[];
    const { labelByValue, colorByValue } = useMemo(
        () => buildCategoryMaps(categories),
        [categories]
    );

    const normalizedTools = useMemo(() => {
        return tools.map((t) => {
            const cat = (t.category || t.phase || '').toString().toLowerCase();
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
        <PageLayout>
            <PageHero
                id="methods-hero"
                eyebrow="Methods"
                title="Sustainable Methods"
                subtitle="Practical methods and templates to embed sustainability into every phase of your design process. Copy, customize, and integrate these methods into your workflow."
                size="xl"
            />

            <MotionSection id="method-library" variants={fadeInUp}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-fg">
                        Method Library
                    </h2>
                    <div className="w-full md:w-96">
                        <Input
                            aria-label="Search methods"
                            placeholder="Search methods, purposes, or overviews"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 px-4 rounded-full border border-[hsl(var(--border))] bg-surface text-fg placeholder:text-muted-fg"
                        />
                    </div>
                </div>

                <Tabs
                    items={[
                        { value: 'all', label: 'All', color: 'hsl(var(--brand-primary))' },
                        ...categories.map((c) => ({
                            value: c.value,
                            label: c.label,
                            color: c.color,
                            disabled: (categoryCounts[c.value.toLowerCase()] ?? 0) === 0,
                        })),
                    ]}
                    active={activeCategory}
                    onChange={setActiveCategory}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
                    {filteredTools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            tool={tool}
                            catLabel={labelByValue.get(tool._category)}
                            catColor={colorByValue.get(tool._category)}
                        />
                    ))}
                </div>
            </MotionSection>
        </PageLayout>
    );
}
