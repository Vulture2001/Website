'use client'

import Image from 'next/image'
import { Content } from "@/components/ui/Content";

export default function SweetSpot() {
    return (
        <Content
            title="New Sweet Spot of Innovation"
            titleClassName="text-[2.25rem] leading-tight sm:text-[2.5rem]" // slightly smaller & responsive
            description={null} // using list as children
            imagePosition="left"
            imageAlt="Sweet spot diagram"
            textMaxWidthClassName="max-w-[560px] w-full"
            renderImage={
                <div className="relative rounded-2xl overflow-hidden w-[520px] max-md:w-full aspect-square bg-[hsl(var(--surface)/0.8)]">
                    <Image
                        src="/sweetspot.png"
                        alt="Sweet spot diagram"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            }
            className="bg-transparent"
        >
            {/* Right column content */}
            <ul className="space-y-6">
                <li>
                    <strong className="block text-lg">Feasibility</strong>
                    <span className="text-sm text-[hsl(var(--muted-fg))]">
            How easily can we build it? Ideas only work when they can be executed. This is about technical possibility,
            resources, and the ability to deliver at scale.
          </span>
                </li>
                <li>
                    <strong className="block text-lg">Desirability</strong>
                    <span className="text-sm text-[hsl(var(--muted-fg))]">
            Do people truly want it? Innovation has impact when it solves real problems, delights users, and earns adoption.
          </span>
                </li>
                <li>
                    <strong className="block text-lg">Viability</strong>
                    <span className="text-sm text-[hsl(var(--muted-fg))]">
            Will it sustain the business? Beyond being loved and possible, ideas must generate value, align with strategy,
            and remain financially sound.
          </span>
                </li>
                <li>
                    <strong className="block text-lg text-brand.accent">Sustainability</strong>
                    <span className="text-sm text-[hsl(var(--muted-fg))]">
            What’s the long-term footprint? Innovation today must minimize environmental impact, support ethical practices,
            and strengthen resilience for future generations. This lens ensures progress doesn’t come at the planet’s or society’s expense.
          </span>
                </li>
            </ul>
        </Content>
    )
}