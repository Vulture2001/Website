'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

/* ---------- helpers ---------- */

function Section({
                     title,
                     subtitle,
                     children,
                     className,
                 }: {
    title: string
    subtitle?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <section className={cn('mt-12', className)}>
            <header className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
            </header>
            {children}
        </section>
    )
}

type Swatch = { name: string; shades: string[] }

/* explicit, v4-safe classes */
const colorSwatches: Swatch[] = [
    { name: 'blue', shades: ['bg-blue-900','bg-blue-700','bg-blue-600','bg-blue-500','bg-blue-300','bg-blue-100'] },
    { name: 'indigo', shades: ['bg-indigo-900','bg-indigo-700','bg-indigo-600','bg-indigo-500','bg-indigo-300','bg-indigo-100'] },
    { name: 'pink', shades: ['bg-pink-900','bg-pink-700','bg-pink-600','bg-pink-500','bg-pink-300','bg-pink-100'] },
    { name: 'red', shades: ['bg-red-900','bg-red-700','bg-red-600','bg-red-500','bg-red-300','bg-red-100'] },
    { name: 'orange', shades: ['bg-orange-900','bg-orange-700','bg-orange-600','bg-orange-500','bg-orange-300','bg-orange-100'] },
    { name: 'yellow', shades: ['bg-amber-900','bg-amber-700','bg-amber-600','bg-amber-500','bg-amber-300','bg-amber-100'] },
    { name: 'green', shades: ['bg-green-900','bg-green-700','bg-green-600','bg-green-500','bg-green-300','bg-green-100'] },
    { name: 'teal', shades: ['bg-teal-900','bg-teal-700','bg-teal-600','bg-teal-500','bg-teal-300','bg-teal-100'] },
    { name: 'cyan', shades: ['bg-cyan-900','bg-cyan-700','bg-cyan-600','bg-cyan-500','bg-cyan-300','bg-cyan-100'] },
    { name: 'purple', shades: ['bg-purple-900','bg-purple-700','bg-purple-600','bg-purple-500','bg-purple-300','bg-purple-100'] },
    { name: 'gray', shades: ['bg-neutral-900','bg-neutral-700','bg-neutral-600','bg-neutral-500','bg-neutral-300','bg-neutral-100'] },
]

export default function Demo() {
    const [dark, setDark] = useState(false)

    return (
        <main className={dark ? 'dark' : ''}>
            <Container className="py-10">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight">Design System</h1>
                        <p className="mt-1 text-sm text-neutral-600">Tokens, components, and states</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => setDark(d => !d)}>
                            Toggle {dark ? 'Light' : 'Dark'}
                        </Button>
                    </div>
                </div>

                {/* Colors */}
                <Section
                    title="Colors"
                    subtitle="Brand palettes with a few useful shades. (Explicit class names so Tailwind v4 picks them up.)"
                >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {colorSwatches.map(({ name, shades }) => (
                            <Card key={name}>
                                <CardHeader className="flex items-center justify-between">
                                    <div className="text-base font-medium capitalize">{name}</div>
                                    <Badge variant="outline">{name}-scale</Badge>
                                </CardHeader>
                                <CardBody>
                                    <div className="grid grid-cols-6 gap-2">
                                        {shades.map((cls, i) => (
                                            <div key={cls} className="space-y-2">
                                                <div className={cn('h-10 w-full rounded-md', cls)} />
                                                <div className="text-[11px] text-neutral-500">[{i === 0 ? '900' : i === 1 ? '700' : i === 2 ? '600' : i === 3 ? '500' : i === 4 ? '300' : '100'}]</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Typography */}
                <Section title="Typography" subtitle="Inter font with a practical scale for display, headings, and body text.">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardBody className="space-y-2">
                                <div className="text-5xl font-semibold">Display</div>
                                <div className="text-4xl">Heading 1</div>
                                <div className="text-2xl">Heading 3</div>
                                <p className="pt-2 text-base text-neutral-600">
                                    Body text — Inter, semantic sizes, and balanced line-heights.
                                </p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="space-y-1">
                                <p className="text-xs">Body 12</p>
                                <p className="text-sm">Body 14</p>
                                <p className="text-base">Body 16</p>
                                <p className="text-lg">Body 18</p>
                            </CardBody>
                        </Card>
                    </div>
                </Section>

                {/* Buttons */}
                <Section title="Buttons" subtitle="Variants, sizes, shapes, states, and colors.">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader><h3 className="text-xl font-semibold">Emphasis</h3></CardHeader>
                            <CardBody className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    <Button>Solid (neutral)</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="subtle">Subtle</Button>
                                    <Button variant="text">Text</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button loading>Loading</Button>
                                    <Button disabled>Disabled</Button>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader><h3 className="text-xl font-semibold">Blue colorway</h3></CardHeader>
                            <CardBody className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    <Button color="blue" >Solid Blue</Button>
                                    <Button variant="outline" color="blue">Outline Blue</Button>
                                    <Button variant="ghost" color="blue">Ghost Blue</Button>
                                    <Button variant="subtle" color="blue">Subtle Blue</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                    <Button size="xl">XL</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button shape="rounded">Rounded</Button>
                                    <Button shape="sharp">Sharp</Button>
                                    <Button shape="pill">Pill</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Section>

                {/* Badges / Inputs / Cards */}
                <Section title="UI Elements">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader><h3 className="text-xl font-semibold">Badges</h3></CardHeader>
                            <CardBody className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <Badge>Default</Badge>
                                    <Badge variant="outline">Outline</Badge>
                                    <Badge tone="primary">Success</Badge>
                                    <Badge tone="warning">Warning</Badge>
                                    <Badge tone="danger">Danger</Badge>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader><h3 className="text-xl font-semibold">Form controls</h3></CardHeader>
                            <CardBody className="space-y-4">
                                <Input label="Email" placeholder="you@example.com" helper="We’ll never share your email." />
                                <div className="flex items-center gap-3">
                                    <Input placeholder="Quick input" className="max-w-sm" />
                                    <Button>Submit</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Section>

                {/* Surfaces */}
                <Section title="Surfaces" subtitle="Elevation and borders using your tokens.">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="shadow-sm"><CardBody>shadow-sm</CardBody></Card>
                        <Card className="shadow-md"><CardBody>shadow-md</CardBody></Card>
                        <Card className="shadow-lg"><CardBody>shadow-lg</CardBody></Card>
                    </div>
                </Section>

                {/* Specialized Cards */}
                <Section title="Specialized Cards" subtitle="Custom card components with unique designs and interactions.">
                    <div className="flex justify-center">
                    </div>
                </Section>

                <footer className="mt-16 border-t border-[var(--border)] pt-6 text-xs text-neutral-500">
                    Built with Next.js + Tailwind v4 · tokens via CSS variables
                </footer>
            </Container>
        </main>
    )
}
