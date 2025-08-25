'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { truncate } from '@/lib/truncate'
import { Header } from '@/components/ui/Header'
import { Gradient } from '@/components/ui/Gradient'
import { Input } from '@/components/ui/Input'
import { Card, CardBody } from '@/components/ui/Card'
import categoriesJson from '@/data/phases.json'
import toolsJson from '@/data/tools.json'
import faqs from '@/data/faqs.json'
import {FaqList} from "@/components/toolkit/FAQ";
import {Tabs} from "@/components/ui/Tabs";

/* ----------------------------- types ----------------------------- */
type Category = { label: string; value: string; color: string }
type Step = { title?: string; description?: string } | string
type Tool = {
    id: string | number
    title: string
    description?: string
    category?: string
    overview?: string
    purpose?: string
    phase?: string
    steps?: Step[]
}


const buildCategoryMaps = (cats: Category[]) => {
    const labelByValue = new Map<string, string>()
    const colorByValue = new Map<string, string>()
    for (const c of cats) {
        labelByValue.set(c.value, c.label)
        colorByValue.set(c.value, c.color)
    }
    return { labelByValue, colorByValue }
}

function ToolkitHero() {
    return (
        <section className="relative bg-[#F9FAFB] py-20 text-center overflow-hidden">
            {/* Gradients */}
            <Gradient
                from="#FF57BC"
                to="#FF358A"
                width="100rem"
                height="60rem"
                opacity={0.8}
                className="left-1/2 -translate-x-1/2 -top-40"
            />
            <Gradient
                from="#B7CFFF"
                to="#8BB3FF"
                width="100rem"
                height="60rem"
                className="left-1/2 -translate-x-1/2 top-0"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <Header
                    align="center"
                    size="xl"
                    maxWidth="5xl"
                    eyebrow="Toolkit"
                    title="Sustainability Toolkit"
                    subtitle="Practical methods and templates to embed sustainability into every phase of your design process. Copy, customize, and integrate these tools into your workflow."
                />
            </div>
        </section>
    )
}

function ToolCard({
                      tool,
                      catLabel,
                      catColor,
                  }: {
    tool: Tool & { _category: string; _blurb: string }
    catLabel?: string
    catColor?: string
}) {
    return (
        <Card className="bg-[#F9FAFB] border-[#EAECF0] rounded-3xl transform transition-all duration-300 hover:shadow-sm">
            <CardBody className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: catColor ?? '#64748B' }}
                    />
                    {tool._category && tool._category !== 'uncategorized' && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#5F6980]">
              {catLabel ?? tool._category}
            </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-[#282828] leading-snug">
                    {tool.title}
                </h3>

                <p className="text-sm text-[#5F6980] leading-relaxed">
                    {truncate(tool._blurb, 100)}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={`/toolkit/${encodeURIComponent(String(tool.id))}`}
                        className="text-[#0D6EFD] text-sm font-semibold"
                    >
                        Explore Tool
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}




export default function Toolkit() {
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const categories = categoriesJson as Category[]
    const tools = toolsJson as Tool[]
    const { labelByValue, colorByValue } = useMemo(
        () => buildCategoryMaps(categories),
        [categories]
    )

    const normalizedTools = useMemo(() => {
        return tools.map((t) => {
            const cat = (t.category || t.phase || '').toString().toLowerCase()
            const blurb = t.overview || t.purpose || t.description || ''
            return { ...t, _category: cat || 'uncategorized', _blurb: blurb }
        })
    }, [tools])

    const filteredTools = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        return normalizedTools.filter((t) => {
            const matchesCategory =
                activeCategory === 'all' || t._category === activeCategory
            if (!matchesCategory) return false
            if (!term) return true
            const haystack = [t.title, t._blurb, t.purpose ?? '', t.overview ?? '']
                .join(' ')
                .toLowerCase()
            return haystack.includes(term)
        })
    }, [normalizedTools, activeCategory, searchTerm])


    return (
        <div className="min-h-screen bg-white">
            <ToolkitHero />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="text-3xl font-semibold text-[#282828]">Tool library</h2>
                        <div className="w-full md:w-96">
                            <Input
                                placeholder="Search tools, purposes, overviews"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-12 px-4 rounded-full border-[#D0D5DD] bg-white text-[#282828] placeholder:text-[#9D9FA1]"
                            />
                        </div>
                    </div>

                    <Tabs
                        items={categories.map((c) => ({
                            value: c.value,
                            label: c.label,
                            color: c.color,
                        }))}
                        active={activeCategory}
                        onChange={setActiveCategory}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredTools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                catLabel={labelByValue.get(tool._category)}
                                catColor={colorByValue.get(tool._category)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-semibold text-[#282828] mb-4">FAQs</h2>
                            </div>
                            <FaqList items={faqs} />
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}
