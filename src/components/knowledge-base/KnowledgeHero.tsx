'use client'

import Link from 'next/link'
import Image from 'next/image'

type Card = {
    title: string
    href: string
    image: { src: string; alt: string }
}

const CARDS: Card[] = [
    {
        title: '5 Dimensions of Sustainability in Software',
        href: '/knowledge-base/5-dimensions-of-sustainability',
        image: { src: '/circles.svg', alt: '' },
    },
    {
        title: 'Orders of Impact',
        href: '/knowledge-base/orders-of-impact',
        image: { src: '/impacts.svg', alt: '' },
    },
]

export default function KnowledgeHero() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-3xl font-bold tracking-tight text-fg mb-8">
                Fundamentals
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {CARDS.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="group block"
                        aria-label={card.title}
                    >
                        <div className="rounded-3xl overflow-hidden bg-[hsl(var(--surface)/0.8)]  transition-transform duration-300 group-hover:scale-[1.02]">
                            <Image
                                src={card.image.src}
                                alt={card.image.alt}
                                width={600}
                                height={400}
                                className="w-full h-72 object-cover"
                            />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-fg">
                            {card.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    )
}
