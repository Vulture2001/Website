'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Gradient } from '@/components/ui/Gradient'
import { normalizeArray, normalizeSteps } from '@/lib/tools'
import TipsSection from "@/components/ui/TipsSection";

type Step = { title?: string; description?: string } | string

export type Tool = {
    id: string | number
    title: string
    overview?: string
    purpose?: string
    phase?: string
    steps?: Step[]
    input?: string[]
    inputs?: string[]
    outputs?: string[]
    templates?: string[]
    prompts?: string[]
    tips?: string[]
    // legacy
    description?: string
    category?: string
}

/* ---------- small UI bits ---------- */
function NumBadge({ n }: { n: number }) {
    return (
        <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-[#D0D5DD] text-sm font-semibold text-[#5F6980]">
      {n}
    </span>
    )
}

function CopyButton({
                        text,
                        label = 'Copy',
                        className = '',
                    }: {
    text: string
    label?: string
    className?: string
}) {
    const [copied, setCopied] = useState(false)
    const onClick = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {}
    }
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-sm font-semibold text-[#282828] hover:bg-[#F3F4F6] transition ${className}`}
            aria-label={label}
            title={label}
            type="button"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                <path d="M9 9.5A1.5 1.5 0 0 1 10.5 8h7A1.5 1.5 0 0 1 19 9.5v7A1.5 1.5 0 0 1 17.5 18h-7A1.5 1.5 0 0 1 9 16.5v-7Z" stroke="currentColor" fill="none"/>
                <path d="M7 14V7.5A1.5 1.5 0 0 1 8.5 6H15" stroke="currentColor" fill="none"/>
            </svg>
            {copied ? 'Copied!' : label}
        </button>
    )
}

export default function ToolDetail({ tool }: { tool: Tool }) {
    const steps = normalizeSteps(tool.steps)
    const inputs = normalizeArray(tool.inputs ?? tool.input)
    const templates = normalizeArray(tool.templates)
    const { miroUrl, figmaUrl, otherTemplates } = useMemo(() => {
        let miroUrl: string | null = null
        let figmaUrl: string | null = null
        const otherTemplates: string[] = []

        for (const t of templates) {
            const s = String(t).trim()
            try {
                const u = new URL(s)
                const host = u.hostname.toLowerCase()
                if (host.includes('miro.com')) {
                    miroUrl = s
                    continue
                }
                if (host.includes('figma.com')) {
                    figmaUrl = s
                    continue
                }
                otherTemplates.push(s)
            } catch {
                // not a URL -> keep as plain text
                otherTemplates.push(s)
            }
        }
        return { miroUrl, figmaUrl, otherTemplates }
    }, [templates])
    const tips = normalizeArray(tool.tips)
    const prompts = useMemo(() => normalizeArray(tool.prompts), [tool.prompts])
    const allPromptsText = useMemo(
        () => prompts.map((p, i) => `${i + 1}. ${p}`).join('\n\n'),
        [prompts]
    )

    return (
        <div className="relative flex flex-col min-h-screen bg-white">
            {/* Breadcrumb (unchanged) */}
            <div className="max-w-8xl px-48 pt-10 text-sm text-[#5F6980]">
                <Link href="/public" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/toolkit" className="hover:underline">Toolkit</Link>
                <span className="mx-2">/</span>
                <span className="text-[#282828] font-medium">{tool.title}</span>
            </div>

            {/* HomeHero + gradients (unchanged) */}
            <div className="relative flex flex-col min-h-screen bg-white">
                <Gradient
                    from="#FF57BC"
                    to="#FF358A"
                    width="100rem"
                    height="60rem"
                    opacity={0.5}
                    className="left-1/2 -translate-x-1/2 -top-40"
                />
                <div className="relative z-10 flex flex-col items-center pb-20 pt-14 gap-14">
                    {/* HomeHero */}
                    <div className="flex flex-col items-start gap-4 max-w-[842px] px-4">
                        <div className="flex px-[14px] py-1 justify-center items-center gap-[10px] rounded-full border border-[#282828] bg-transparent">
            <span className="text-[#282828] text-center font-inter text-sm font-semibold leading-[22px]">
              {tool.title}
            </span>
                        </div>
                        <h1 className="text-[3rem] font-semibold leading-[60px] tracking-[-1.5px] text-[#282828] font-inter">
                            {tool.overview}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24 space-y-22">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-[40px] font-semibold tracking-tight text-zinc-800 mb-8">Overview</h2>

                        {tool.purpose && (
                            <div className="mb-8">
                                <h2 className="font-semibold text-2xl text-zinc-800 flex items-center gap-2">
                                    Purpose
                                </h2>
                                <p className="mt-2 text-[#5F6980] leading-7">{tool.purpose}</p>
                            </div>
                        )}

                        {inputs.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-zinc-800 flex items-center gap-2 text-2xl">
                                    Preparation
                                </h3>

                                <ol className="mt-3 space-y-3 list-none p-0">
                                    {inputs.map((x, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <NumBadge n={i + 1} />
                                            <p className="text-[#5F6980] leading-7">{x}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    <div className="rounded-[28px] bg-[#F6F7FB] p-8 aspect-[4/3] flex items-center justify-center">
                        <Image
                            src="/images/tool-overview.png"
                            alt=""
                            width={900}
                            height={700}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </section>

                {/* How to use method? — numbered */}
                {steps.length > 0 && (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-[28px] bg-[#F6F7FB] p-8 aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/images/tool-howto.png"
                                alt=""
                                width={900}
                                height={700}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        <div className="max-w-xl">
                            <h2 className="text-[40px] font-semibold tracking-tight text-zinc-800 mb-8">How to use method?</h2>
                            <ol className="space-y-6">
                                {steps.map((s, i) => (
                                    <li key={i} className="flex gap-3">
                                        <NumBadge n={i + 1} />
                                        <div>
                                            {s.title && <div className="font-semibold text-[#282828]">{s.title}</div>}
                                            {s.description && <p className="text-[#5F6980] leading-7 mt-1">{s.description}</p>}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                )}

                {/* Tips & Tricks */}
                {tips.length > 0 && <TipsSection tips={tips} />}

                {/* AI Prompts with Copy */}
                {prompts.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[40px] font-semibold tracking-tight text-zinc-800">AI Prompts</h2>
                            <CopyButton text={allPromptsText} label="Copy all" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {prompts.map((p, i) => (
                                <div
                                    key={i}
                                    className="group rounded-2xl border border-[#EAECF0] bg-white p-5 hover:border-[#D0D5DD] transition"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-sm font-semibold text-[#282828]">Prompt {i + 1}</h3>
                                        <CopyButton text={p} label="Copy" className="opacity-0 group-hover:opacity-100 md:opacity-100" />
                                    </div>
                                    <p className="mt-2 text-[#282828] leading-7">{p}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Outputs & Templates lists (no cards) */}
                {templates.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-semibold text-[#282828] mb-4">Templates / Visuals</h3>

                        {/* Badge row (only shows if links exist) */}
                        {(miroUrl || figmaUrl) && (
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {miroUrl && (
                                    <TemplateBadge href={miroUrl}>
                                        <MiroIcon /> Template
                                    </TemplateBadge>
                                )}
                                {figmaUrl && (
                                    <TemplateBadge href={figmaUrl}>
                                        <FigmaIcon /> Template
                                    </TemplateBadge>
                                )}
                            </div>
                        )}

                        {/* Any non-link template notes still listed below */}
                        {otherTemplates.length > 0 && (
                            <ul className="list-disc pl-6 space-y-2 text-[#5F6980]">
                                {otherTemplates.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function TemplateBadge({ href, children }: { href: string; children: React.ReactNode }) {
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


function FigmaIcon() {
    return (
        <Image
            src="/figma-logo.svg"
            alt="Figma Logo"
            width={20}
            height={20}
            aria-hidden="true"
        />
    );
}

function MiroIcon() {
    return (
        <Image
            src="/miro-logo.svg"
            alt="Miro Logo"
            width={20}
            height={20}
            aria-hidden="true"
        />
    );
}

