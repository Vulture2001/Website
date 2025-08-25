'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import tools from '@/data/tools.json'           // <-- use .ts data modules
import phases from '@/data/phases.json'
import { getPhaseMeta, normalizeArray } from '@/lib/tools'
import { Input } from '@/components/ui/Input'
import {Tabs} from "@/components/ui/Tabs"; // if you have one; else use <input>

type Phase = { label: string; value: string; color: string }
type Step = { title?: string; description?: string } | string
type Tool = {
    id: string | number
    title: string
    overview?: string
    purpose?: string
    phase?: string
    steps?: Step[]
    prompts?: string[]
    category?: string // legacy phase
}

type PromptRow = {
    id: string
    prompt: string
    toolId: string | number
    toolTitle: string
    phase: string | undefined
}

function CopyButton({
                        text,
                        label = 'Copy',
                        className = '',
                    }: { text: string; label?: string; className?: string }) {
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
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-sm font-semibold text-[#282828] hover:bg-[#F3F4F6] transition ${className}`}
            aria-label={label}
            title={label}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                <path d="M9 9.5A1.5 1.5 0 0 1 10.5 8h7A1.5 1.5 0 0 1 19 9.5v7A1.5 1.5 0 0 1 17.5 18h-7A1.5 1.5 0 0 1 9 16.5v-7Z" stroke="currentColor" fill="none"/>
                <path d="M7 14V7.5A1.5 1.5 0 0 1 8.5 6H15" stroke="currentColor" fill="none"/>
            </svg>
            {copied ? 'Copied!' : label}
        </button>
    )
}

function PhaseBadge({ value }: { value?: string }) {
    const meta = getPhaseMeta((value ?? '') as string, phases as Phase[])
    if (!meta) return null
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold"
            style={{ borderColor: meta.color, color: meta.color }}
            title={meta.label}
        >
      <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: meta.color }}
      />
            {meta.label}
    </span>
    )
}

function ToolBadge({ id, title }: { id: string | number; title: string }) {
    return (
        <Link
            href={`/toolkit/${id}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-2.5 py-1 text-xs font-semibold text-[#282828] hover:bg-[#F3F4F6] transition"
            title={`Open ${title}`}
        >
            {title}
            <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70">
                <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Link>
    )
}

export default function PromptLibrary() {
    const [search, setSearch] = useState('')
    const [activePhase, setActivePhase] = useState<string>('all')

    // Flatten all prompts from tools
    const rows: PromptRow[] = useMemo(() => {
        const out: PromptRow[] = []
        for (const t of tools as Tool[]) {
            const phase = t.phase || t.category
            const prompts = normalizeArray(t.prompts)
            prompts.forEach((p, idx) => {
                out.push({
                    id: `${t.id}-${idx}`,
                    prompt: p,
                    toolId: t.id,
                    toolTitle: t.title,
                    phase,
                })
            })
        }
        return out
    }, [])

    // Filtering
    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        return rows.filter((r) => {
            const matchesPhase = activePhase === 'all' || r.phase === activePhase
            if (!matchesPhase) return false
            if (!term) return true
            return (
                r.prompt.toLowerCase().includes(term) ||
                r.toolTitle.toLowerCase().includes(term)
            )
        })
    }, [rows, search, activePhase])

    return (
        <div className="relative flex flex-col min-h-screen bg-white">
            <div className="relative z-10 flex flex-col items-center pb-16 pt-14 gap-10">
                {/* Hero */}
                <div className="flex flex-col items-center gap-4 max-w-[842px] px-4 mx-auto text-center">
                    <h1 className="text-[54px] font-semibold leading-[63px] tracking-[-1.5px] text-[#282828] font-inter">
                        AI Prompt Library
                    </h1>
                    <p className="text-lg leading-8 text-[#282828] opacity-90">
                        Ready-to-help prompts that unlock ideas at every step.
                    </p>
                </div>

                {/* Controls */}
                <div className="w-full max-w-7xl px-4">

                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        <Tabs
                            items={(phases as Phase[]).map((p) => ({
                                value: p.value,
                                label: p.label,
                                color: p.color,
                            }))}
                            active={activePhase}
                            onChange={setActivePhase}
                        />
                        <div className="flex gap-3">
                            <Input
                                placeholder="Search prompts or tools"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-11 max-w-6xl px-20 rounded-full border-[#D0D5DD] bg-white text-[#282828] placeholder:text-[#9D9FA1] flex-1"
                            />
                        </div>
                        {/* Search + Copy all */}

                    </div>
                </div>

                {/* Prompt grid */}
                <div className="w-full max-w-7xl px-4">
                    {filtered.length === 0 ? (
                        <div className="mt-14 text-center text-[#5F6980]">
                            No prompts match your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {filtered.map((row) => (
                                <article
                                    key={row.id}
                                    className="group rounded-2xl border border-[#EAECF0] bg-white p-5 hover:border-[#D0D5DD] transition"
                                >
                                    <div className="flex items-center justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <PhaseBadge value={row.phase} />
                                            <ToolBadge id={row.toolId} title={row.toolTitle} />
                                        </div>
                                        <CopyButton text={row.prompt} label="Copy" className="opacity-0 group-hover:opacity-100 md:opacity-100" />
                                    </div>
                                    <p className="text-[#282828] leading-7">{row.prompt}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}