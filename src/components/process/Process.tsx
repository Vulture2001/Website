import { Gradient } from '@/components/ui/Gradient'
import { Header } from '@/components/ui/Header'
import { TeamCardsCarousel } from '@/components/process/ProcessCarousele'

export default function Process() {
    return (
        <div
            id="process"
            className="relative isolate flex flex-col min-h-screen bg-white overflow-x-hidden overscroll-none"
        >
            {/* clip the huge SVGs so they can't create a horizontal scrollbar */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <Gradient
                    from="hsl(var(--brand-yellow))"
                    to="hsl(var(--brand-orange))"
                    width="100rem"
                    height="60rem"
                    opacity={0.5}
                    className="absolute left-1/2 -translate-x-1/2 -top-40"
                />
                <Gradient
                    from="hsl(var(--brand-pink))"
                    to="hsl(var(--brand-green))"
                    width="200rem"
                    height="80rem"
                    className="absolute left-1/2 -translate-x-1/2 top-0"
                />
            </div>

            <main className="relative z-10 flex flex-col items-center pb-20 pt-14 gap-14">
                <Header
                    id="process-hero"
                    eyebrow="Process"
                    title="This framework emerged from research into how software design decisions can better account for social and environmental impacts."
                    subtitle="As digital products become central to our lives, sustainable approaches become urgent."
                    size="xl"
                    maxWidth="5xl"
                />

                <section id="teams-row" className="w-full">
                    <TeamCardsCarousel />
                </section>
            </main>
        </div>
    )
}
