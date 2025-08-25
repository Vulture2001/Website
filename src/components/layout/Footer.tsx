'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'

const FOOTER_SECTIONS = [
    {
        heading: 'Explore',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
        ],
    },
    {
        heading: 'Resources',
        links: [
            { label: 'Knowledge Base', href: '/knowledge-base' },
            { label: 'Toolkit', href: '/toolkit' },
            { label: 'AI Prompt Library', href: '/prompts' },
        ],
    },
]

// Pull these from your thesis (see note below)
const THESIS = {
    title: 'Integrating Social and Ecological Sustainability in Software Product Development',
    university: 'Technical University of Munich',
    school: 'School of Computation, Information and Technology — Informatics',
    degree: "Master’s Thesis in Management and Innovation",
    author: 'BSc Monika Zielińska',
    supervisor: 'Prof. Dr. Stephan Krusche',
    advisor: 'MA Elisabeth Friesinger',
}

export function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn('border-t border-[var(--border)] bg-[var(--bg)]', className)}>
            <div className="mx-auto max-w-[1336px] px-4 lg:px-6 py-12">
                {/* Top: Brand + Sections */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    {/* Brand / Mission */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <Link href="/" className="text-lg font-semibold tracking-tight">
                            Software 5.0
                        </Link>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                            Tools, processes, and guidance to design and build software that balances
                            usability, inclusivity, and sustainability.
                        </p>
                    </div>

                    {/* Link sections */}
                    <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {FOOTER_SECTIONS.map((section) => (
                            <nav key={section.heading} className="space-y-3">
                                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    {section.heading}
                                </div>
                                <ul className="space-y-2">
                                    {section.links.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    {/* Thesis card */}
                    <div className="md:col-span-3">
                        <div className="rounded-xl border border-[var(--border)] bg-white/60 dark:bg-white/5 p-4 shadow-sm">
                            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                Master Thesis
                            </div>
                            <h3 className="mt-2 text-sm font-semibold leading-5 text-neutral-900 dark:text-white">
                                {THESIS.title}
                            </h3>
                            <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-300">
                                {THESIS.university}
                            </p>
                            <div className="mt-3 grid grid-cols-1 gap-1 text-xs text-neutral-600 dark:text-neutral-300">
                                <div><span className="text-neutral-500 dark:text-neutral-400">Author:</span> {THESIS.author}</div>
                                <div><span className="text-neutral-500 dark:text-neutral-400">Advisor:</span> {THESIS.advisor}</div>
                                <div><span className="text-neutral-500 dark:text-neutral-400">Supervisor:</span> {THESIS.supervisor}</div>

                            </div>

                            {/* If you publish the PDF at a route, link it here */}
                            {/* <Link href="/thesis.pdf" className="mt-3 inline-flex text-sm underline underline-offset-4">Read thesis</Link> */}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px w-full bg-[var(--border)]" />

                {/* Bottom bar */}
                <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        © {new Date().getFullYear()} Software 5.0. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
