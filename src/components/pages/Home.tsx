"use client";

import { HomeHero } from "@components/hero/HomeHero";

export default function Home() {
    return (
        <main className="relative isolate overflow-hidden bg-bg text-text">
            <section aria-labelledby="hero-heading">
                <h1 id="hero-heading" className="sr-only">Welcome to Software 5.0</h1>
                <HomeHero />
            </section>
        </main>
    );
}
