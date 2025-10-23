'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { normalizeArray, normalizeSteps } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import TipsSection from '@/components/toolkit/TipsSection'
import { NumBadge } from '@components/buttons/Badge'
import { Breadcrumb } from '@components/navigation/Breadcrumb'
import phasesJson from '@/data/phases.json'
import { FigmaIcon } from '@components/icons/FigmaIcon'
import { MiroIcon } from '@components/icons/MiroIcon'
import { CopyButton } from '@components/buttons/CopyButton'
import Link from 'next/link'

type Phase = {
    value: string
    label: string
    color?: string
    track?: 'Design' | 'Development'
}
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
        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 pb-24 space-y-20 text-base sm:text-lg break-words">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Methods', href: '/toolkit' },
                    { label: tool.title },
                ]}
                containerClassName="max-w-7xl mx-auto px-4 pt-6"
            />

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center text-center px-4 py-16 gap-6 max-w-3xl mx-auto"
            >
                {/* Badges */}
                <div className="flex gap-3 flex-wrap justify-center">
          <span className="inline-flex px-4 py-1 rounded-full border border-border text-sm font-semibold uppercase">
            {tool.phase}
          </span>
                    <span className="inline-flex px-4 py-1 rounded-full border border-border/70 text-sm font-semibold uppercase">
            {track} Track
          </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-fg leading-snug tracking-tight">
                    {tool.title}
                </h1>

                {/* Overview */}
                {tool.overview && (
                    <p className="text-base sm:text-xl text-muted-fg leading-relaxed">
                        {tool.overview}
                    </p>
                )}
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24 space-y-20 text-base sm:text-lg">
                {/* Purpose & Preparation */}
                <section>
                    {tool.purpose && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-semibold text-fg mb-4">
                                Purpose
                            </h2>
                            <p className="text-muted-fg leading-7 sm:leading-8 text-lg">
                                {tool.purpose}
                            </p>
                        </motion.div>
                    )}

                    {inputs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-semibold text-fg mb-6">
                                Preparation
                            </h2>
                            <ol className="space-y-5">
                                {inputs.map((x, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <NumBadge n={i + 1} />
                                        <p className="text-muted-fg text-lg">{x}</p>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>
                    )}
                </section>

                {/* Templates Section */}
                {templates.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-fg mb-4">
                            Templates
                        </h2>
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
                            <ul className="list-disc pl-6 space-y-2 text-muted-fg">
                                {otherTemplates.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}

                {/* Game Section */}
                {tool.game && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-fg mb-4">
                            Game
                        </h2>
                        <Link
                            href={tool.game.href}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-fg hover:bg-surface-hover transition"
                        >
                            {tool.game.name}
                        </Link>
                    </section>
                )}

                {/* Steps */}
                {steps.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-fg mb-8">
                            How to Use This Method
                        </h2>
                        <div className="relative border-l border-border pl-8 space-y-12">
                            {steps.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="relative"
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                  <span className="absolute -left-[18px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
                    {i + 1}
                  </span>
                                    <div>
                                        {s.title && (
                                            <h3 className="font-semibold text-fg">{s.title}</h3>
                                        )}
                                        {s.description && (
                                            <p className="mt-1 text-muted-fg leading-7">
                                                {s.description}
                                            </p>
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
                            <h2 className="text-2xl sm:text-3xl font-semibold text-fg">
                                AI Prompts
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {prompts.map((p, i) => (
                                <motion.div
                                    key={i}
                                    className="group rounded-xl border border-border bg-surface p-5 hover:border-border-strong transition"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-sm font-semibold text-fg">
                                            Prompt {i + 1}
                                        </h3>
                                        <CopyButton
                                            text={p}
                                            label="Copy"
                                            className="opacity-0 group-hover:opacity-100 md:opacity-100"
                                        />
                                    </div>
                                    <p className="mt-2 text-muted-fg">{p}</p>
                                </motion.div>
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
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-fg hover:bg-surface-hover transition"
        >
            {children}
        </a>
    )
}
