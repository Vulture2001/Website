"use client";

import { HomeHero } from "@components/hero/HomeHero";

export default function Home() {
    return (
        <main className="relative isolate overflow-hidden bg-bg text-text">
            <section aria-labelledby="hero-heading">
                <h1 id="hero-heading" className="sr-only">Concious Digital Design</h1>
                <HomeHero />
            </section>
        </main>
    );
}
