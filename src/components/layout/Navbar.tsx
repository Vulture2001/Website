'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

type NavItem = { label: string; href: string }

const NAV: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Knowledge Base', href: '/knowledge-base' },
    { label: 'Process', href: '/process' },
    { label: 'Toolkit', href: '/toolkit' },
    { label: 'AI Prompt Library', href: '/prompts' },
    { label: 'About', href: '/about' },
    { label: 'Design', href: '/design' }
]

export function Navbar() {
    const pathname = usePathname()
    const [elevated, setElevated] = useState(false)

    // subtle shadow on scroll
    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 4)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // close menu on route change
    useEffect(() => { setOpen(false) }, [pathname])

    return (
        <header
            className={cn(
                'sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/70',
                elevated && 'shadow-[0_1px_0_0_var(--border)]'
            )}
        >
            <nav className="mx-auto w-full max-w-[1336px] px-4 lg:px-6" aria-label="Global">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Clonify home">
                        <span className="text-[1.125rem] font-semibold tracking-tight">Software 5.0</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV.map((item) => {
                            const active = item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'text-[0.9375rem] font-medium transition-colors',
                                        active
                                            ? 'text-neutral-900 dark:text-white'
                                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <Link href="/knowledge-base">
                            <Button size="md" shape="rounded" color="blue">
                                Start here
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}