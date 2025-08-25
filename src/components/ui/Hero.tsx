'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import Link from 'next/link'

type HeroProps = {
    titleLines?: string[]
    eyebrow?: string
    description?: string
    cta?: { label: string; href: string }
    className?: string
}

export function Hero({
    titleLines = ['Design.', 'Develop.', 'Sustainably.'],
    description = 'Hands-on tools to embed social and ecological sustainability into software product development — use it in real projects, workshops, and team sprints',
    cta = { label: 'Start here', href: '/knowledge-base' },
    className,
}: HeroProps) {
    return (
        <section
            className={cn(
                'relative overflow-hidden',
                'bg-[radial-gradient(1000px_600px_at_70%_20%,rgba(59,130,246,0.3),rgba(249,115,22,0.25)_30%,rgba(168,85,247,0.20)_50%,rgba(255,255,255,0)_70%)]',
                'py-32 sm:py-40 lg:py-48',
                className
            )}
        >

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                    {/* Content */}
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        <div className="flex mb-[5%] px-[120spx] py-1 justify-center items-center gap-[10px] rounded-full border border-[#282828] bg-transparent w-[25%]">
                            <span className="text-[#282828] text-center font-inter text-sm font-semibold leading-[22px]">Software 5.0</span>
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                            {titleLines.map((line, index) => (
                                <span key={index} className="block">
                                    {line}
                                </span>
                            ))}
                        </h1>
                        
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                            {description}
                        </p>
                        
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link href={cta.href}>
                                <Button size="lg" variant="solid" color="blue" shape="pill">
                                    {cta.label}
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors">
                                Learn more <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Image placeholder */}
                    <div className="relative mx-auto max-w-lg lg:max-w-none">
                        <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm">Image placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    )
}
