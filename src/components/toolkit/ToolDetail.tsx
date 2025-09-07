'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { normalizeArray, normalizeSteps } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import TipsSection from '@/components/toolkit/TipsSection'
import { NumBadge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/layout/Breadcrumb'
import phasesJson from '@/data/phases.json'
import { FigmaIcon } from '@/components/ui/icons/FigmaIcon'
import { MiroIcon } from '@/components/ui/icons/MiroIcon'
import { CopyButton } from '@/components/ui/buttons/CopyButton'

type Phase = { value: string; label: string; color?: string; track?: 'Design' | 'Development' }
const phases = phasesJson as Phase[]

export default function ToolDetail({ tool }: { tool: Tool }) {
    const phaseDef = phases.find(
        (p) =>
            p.value.toLowerCase() === (tool.phase ?? '').toLowerCase() ||
            p.label.toLowerCase() === (tool.phase ?? '').toLowerCase()
    )

    const track = phaseDef?.track ?? 'Design'

    const steps = normalizeSteps(tool.steps)
    const inputs = normalizeArray(tool.inputs ?? tool.input)
    const templates = normalizeArray(tool.templates)
    const tips = normalizeArray(tool.tips)
    const prompts = normalizeArray(tool.prompts)

    const { miroUrl, figmaUrl, otherTemplates } = useMemo(() => {
        let miroUrl: string | null = null
        let figmaUrl: string | null = null
        const otherTemplates: string[] = []
        for (const t of templates) {
            try {
                const u = new URL(String(t).trim())
                if (u.hostname.includes('miro.com')) miroUrl = t
                else if (u.hostname.includes('figma.com')) figmaUrl = t
                else otherTemplates.push(t)
            } catch {
                otherTemplates.push(t)
            }
        }
        return { miroUrl, figmaUrl, otherTemplates }
    }, [templates])

    return (
        <div className="relative flex flex-col min-h-screen bg-white">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Toolkit', href: '/toolkit' },
                    { label: tool.title },
                ]}
                containerClassName="max-w-7xl mx-auto px-4 pt-8"
            />

            {/* Hero */}
            <div className="relative overflow-hidden">


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex flex-col items-center text-center px-4 py-20 gap-6 max-w-3xl mx-auto"
                >
                    {/* Badges */}
                    <div className="flex gap-3 flex-wrap justify-center">
            <span className="inline-flex px-4 py-1 rounded-full border border-[#282828] text-sm font-semibold uppercase">
              {tool.phase}
            </span>
                        <span className="inline-flex px-4 py-1 rounded-full border border-gray-400 text-sm font-semibold uppercase">
              {track} Track
            </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#282828] leading-snug tracking-tight">
                        {tool.title}
                    </h1>

                    {/* Overview */}
                    {tool.overview && (
                        <p className="text-base sm:text-xl text-[#5F6980] leading-relaxed">
                            {tool.overview}
                        </p>
                    )}
                </motion.div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24 space-y-20 text-lg">


                {/* Purpose & Preparation */}
                <section>
                    {tool.purpose && (
                        <div className="mb-10">
                            <h2 className="text-3xl font-semibold text-[#282828] mb-4">Purpose</h2>
                            <p className="text-[#5F6980] leading-8 text-xl">{tool.purpose}</p>
                        </div>
                    )}
                    {inputs.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-semibold text-[#282828] mb-6">Preparation</h2>
                            <ol className="space-y-5">
                                {inputs.map((x, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <NumBadge n={i + 1} />
                                        <p className="text-[#5F6980] text-xl ">{x}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </section>
                {/* Templates — moved right after hero */}
                {templates.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-semibold text-[#282828] mb-4">Templates</h2>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {miroUrl && (
                                <TemplateBadge href={miroUrl}>
                                    <MiroIcon /> Miro Template
                                </TemplateBadge>
                            )}
                            {figmaUrl && (
                                <TemplateBadge href={figmaUrl}>
                                    <FigmaIcon /> Figma Template
                                </TemplateBadge>
                            )}
                        </div>
                        {otherTemplates.length > 0 && (
                            <ul className="list-disc pl-6 space-y-2 text-[#5F6980]">
                                {otherTemplates.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}
                {/* Timeline with animation */}
                {steps.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-semibold text-[#282828] mb-8">How to Use This Method</h2>
                        <div className="relative border-l-2 border-gray-200 pl-8 space-y-12">
                            {steps.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                >
                  <span className="absolute -left-[18px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
                    {i + 1}
                  </span>
                                    <div>
                                        {s.title && (
                                            <h3 className="font-semibold text-[#282828]">{s.title}</h3>
                                        )}
                                        {s.description && (
                                            <p className="mt-1 text-[#5F6980] leading-7">{s.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Tips */}
                {tips.length > 0 && <TipsSection tips={tips} />}

                {/* AI Prompts */}
                {prompts.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                            <h2 className="text-3xl font-semibold text-[#282828]">AI Prompts</h2>
                        </div>
                        <div className="space-y-4">
                            {prompts.map((p, i) => (
                                <div
                                    key={i}
                                    className="group rounded-xl border border-[#EAECF0] bg-white p-5 hover:border-[#D0D5DD] transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-sm font-semibold text-[#282828]">
                                            Prompt {i + 1}
                                        </h3>
                                        <CopyButton
                                            text={p}
                                            label="Copy"
                                            className="opacity-0 group-hover:opacity-100 md:opacity-100"
                                        />
                                    </div>
                                    <p className="mt-2 text-[#5F6980]">{p}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

/* ----------------------------- Subcomponent ----------------------------- */
function TemplateBadge({
                           href,
                           children,
                       }: {
    href: string
    children: React.ReactNode
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-sm font-semibold text-[#282828] hover:bg-[#F3F4F6] transition"
        >
            {children}
        </a>
    )
}
