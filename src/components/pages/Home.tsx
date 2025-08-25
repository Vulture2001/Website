import {Hero} from "@/components/home/Hero";
import {Content} from "../ui/Content";
import { Badge } from "../ui/Badge";
import { ActionButton } from "../ui/ActionButton";
import { Gradient } from "../ui/Gradient";
import faqs from '@/data/faq_home_page.json';
import { FaqList } from "../toolkit/FAQ";

export default function Home() {
    return (
        <main className="relative overflow-hidden">
            {/* ===== Global background accent near the top-left ===== */}
            <Gradient
                from="hsl(var(--color-blue))"
                to="hsl(var(--color-cyan))"
                centered
                className="absolute -top-40 -left-52 -z-10"
                width="85rem"
                height="85rem"
                opacity={0.35}
                blur={220}
            />

            {/* ===== HERO ===== */}
            <div className="relative z-10">
                <Hero />
            </div>

            {/* ===== Section 1: Process (gradient behind only this block) ===== */}
            <section className="relative">
                <Gradient
                    from="hsl(var(--color-indigo))"
                    to="hsl(var(--color-purple))"
                    centered
                    className="absolute inset-0 -z-10"
                    width="100%"
                    height="100%"
                    opacity={0.28}
                    blur={220}
                />
                <Content
                    badge={<Badge>Process</Badge>}
                    title="Process That Drives Change"
                    description={
                        <>
                            The Software 5.0 Process helps teams explore, prototype, build, and deliver
                            software that balances usability, inclusivity, and sustainability.
                        </>
                    }
                    imagePosition="left"
                    imageSrc="/images/toolkit-placeholder.jpg"
                    imageAlt="Toolkit preview"
                >
                    <ActionButton href="/process">Dive in Process</ActionButton>
                </Content>
            </section>

            {/* ===== Section 2: Toolkit (gradient behind only this block) ===== */}
            <section className="relative">
                <Gradient
                    from="hsl(var(--color-pink))"
                    to="hsl(var(--color-orange))"
                    centered
                    className="absolute inset-0 -z-10"
                    width="100%"
                    height="100%"
                    opacity={0.28}
                    blur={220}
                />
                <section className="relative">
                    <Gradient
                        from="hsl(var(--color-indigo))"
                        to="hsl(var(--color-purple))"
                        centered
                        className="absolute inset-0 -z-10"
                        width="100%"
                        height="100%"
                        opacity={0.28}
                        blur={220}
                    />
                    <Content
                        badge={<Badge>Toolkit</Badge>}
                        title="Turn Ideas Into Impact"
                        description="From journey maps to inclusive design cards..."
                        imagePosition="right"
                        imageSrc="/images/toolkit-placeholder.jpg"
                        imageAlt="Toolkit preview"
                    >
                        <ActionButton href="/toolkit">Explore Toolkit</ActionButton>
                    </Content>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-semibold text-[#282828] mb-4">FAQs</h2>
                        </div>
                        <FaqList items={faqs} />
                    </div>
                </section>
            </section>

            {/* ===== Optional bottom-right global accent ===== */}

        </main>
    )
}
