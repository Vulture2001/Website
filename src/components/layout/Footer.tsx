'use client'

import Link from 'next/link'

const FOOTER_NAV = [
    { label: 'Home', href: '/' },
    { label: 'Knowledge Base', href: '/knowledge-base' },
    { label: 'Process', href: '/process' },
    { label: 'Toolkit', href: '/toolkit' },
    { label: 'AI Prompt Library', href: '/prompts' },
    { label: 'About', href: '/about' },
    { label: 'Design', href: '/design' },
]

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
            <div className="mx-auto max-w-[1336px] px-4 lg:px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo / Brand */}
                    <Link href="/" className="text-lg font-semibold tracking-tight">
                        Software 5.0
                    </Link>

                    {/* Nav links */}
                    <nav className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                        {FOOTER_NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom small print */}
                <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    © {new Date().getFullYear()} Software 5.0. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
