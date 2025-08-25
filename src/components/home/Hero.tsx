'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import Link from 'next/link'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { ImagePlaceholder } from "../ui/ImagePlaceholder"
import {ActionButton} from "../ui/ActionButton";
import { Badge } from "../ui/Badge"

type HeroProps = {
    titleLines?: string[]
    eyebrow?: string
    description?: string
    cta?: { label: string; href: string }
    className?: string
}

export function Hero({
                         titleLines = ['Design.', 'Develop.', 'Sustainably.'],
                         eyebrow = 'Software 5.0',
                         description =
                         'A framework for creating digital products that are sustainable, inclusive, and future-ready.',
                         cta = { label: 'Getting Started', href: '/knowledge-base' },
                         className,
                     }: HeroProps) {
    return (
        <section
            className={cn(
                'relative overflow-hidden isolate',
                'bg-[radial-gradient(1000px_600px_at_70%_20%,rgba(59,130,246,0.30),rgba(249,115,22,0.25)_30%,rgba(168,85,247,0.20)_50%,rgba(255,255,255,0)_70%)]',
                'py-32 sm:py-40 lg:py-48',
                className
            )}
        >
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                    {/* Content */}
                    <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                        {/* Eyebrow */}
                        {eyebrow && (
                            <Badge
                                variant="outline"
                                tone="gray"   // renders black/neutral outline
                                size="sm"
                                shape="pill"
                            >
                                {eyebrow}
                            </Badge>
                        )}

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mt-10">
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
                            <ActionButton href="/about">About</ActionButton>
                        </div>
                    </div>

                    {/* Image placeholder */}
                    <div className="relative mx-auto max-w-lg lg:max-w-none">
                        <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100/80 ring-1 ring-inset ring-gray-200 flex items-center justify-center">
                        <ImagePlaceholder></ImagePlaceholder>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
