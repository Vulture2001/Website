import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * InteractiveToolbarDomains.tsx
 * Kozmo‑style top toolbar with a domain switcher dropdown.
 * Domains: Financial, Environmental, Social, Technical, Individual.
 * The articles area scales to fit using FitToBox so switching feels snappy.
 */

const DOMAINS = [
    { key: "financial", label: "Financial", emoji: "💰" },
    { key: "environmental", label: "Environmental", emoji: "🌿" },
    { key: "social", label: "Social", emoji: "🤝" },
    { key: "technical", label: "Technical", emoji: "🛠️" },
    { key: "individual", label: "Individual", emoji: "🙂" },
] as const;

type DomainKey = typeof DOMAINS[number]["key"];

export default function InteractiveToolbarDomains({ className = "" }: { className?: string }) {
    const [active, setActive] = React.useState<DomainKey>("financial");
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close on outside click
    React.useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        };
        if (menuOpen) document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [menuOpen]);

    return (
        <div className={`w-full rounded-3xl shadow-lg overflow-hidden bg-white ${className}`}>
            {/* Header strip */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/60 bg-white">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-xl tracking-tight">Kozmo</span>
                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
                </div>
                <div className="text-zinc-500 text-sm">Interactive Domains</div>
            </div>

            {/* Top Toolbar */}
            <div className="px-6 pt-5">
                <div className="mx-auto max-w-xl rounded-full bg-zinc-50 ring-1 ring-zinc-200/80 px-4 py-2 flex items-center justify-between shadow-sm">
                    <ToolbarIcon label="Light">🌞</ToolbarIcon>
                    <ToolbarIcon label="Brush">🖌️</ToolbarIcon>
                    <ToolbarIcon label="Shapes">🔷</ToolbarIcon>

                    {/* Domain switcher */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className={`h-9 w-9 grid place-items-center rounded-lg ${menuOpen ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-zinc-100"}`}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                        >
                            🗂️
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.16 }}
                                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200 overflow-hidden"
                                    role="menu"
                                >
                                    {DOMAINS.map((d) => {
                                        const selected = d.key === active;
                                        return (
                                            <button
                                                key={d.key}
                                                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 ${
                                                    selected ? "bg-blue-600 text-white" : "hover:bg-zinc-50 text-zinc-800"
                                                }`}
                                                role="menuitem"
                                                onClick={() => {
                                                    setActive(d.key);
                                                    setMenuOpen(false);
                                                }}
                                            >
                                                <span className="text-base">{selected ? "✨" : d.emoji}</span>
                                                <span className="font-medium">{d.label}</span>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <ToolbarIcon label="Link">🔗</ToolbarIcon>
                    <ToolbarIcon label="Graph">📈</ToolbarIcon>
                </div>
            </div>

            {/* Content area, scaled to fit */}
            <main className="p-6 md:p-8 h-[460px] md:h-[520px] overflow-hidden">
                <FitToBox observeKey={active}>
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {renderContent(active)}
                    </motion.div>
                </FitToBox>
            </main>
        </div>
    );
}

function ToolbarIcon({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <button className="h-9 w-9 grid place-items-center rounded-lg hover:bg-zinc-100" aria-label={label} title={label}>
            <span className="text-[18px] leading-none">{children}</span>
        </button>
    );
}

function renderContent(active: DomainKey) {
    switch (active) {
        case "financial":
            return (
                <section className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-3 rounded-3xl bg-gradient-to-b from-indigo-500 to-blue-600 p-6 relative overflow-hidden text-white">
                        <div className="absolute inset-x-8 top-8 h-60 rounded-3xl bg-white/10 ring-1 ring-white/20" />
                        <div className="relative z-10 mx-auto max-w-lg">
                            <div className="rounded-3xl h-48 bg-gradient-to-br from-violet-500 via-indigo-400 to-amber-300 grid place-items-center text-3xl text-white/90 shadow-lg">
                                ⬛︎
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl p-6 bg-yellow-300 grid place-items-center">
                        <div className="relative">
                            <div className="rounded-full px-8 py-4 bg-amber-300 shadow-inner">🔔</div>
                            <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white text-orange-500 font-semibold shadow">6</span>
                        </div>
                    </div>

                    <div className="rounded-3xl p-6 bg-indigo-100 grid place-items-center">
                        <div className="relative h-24 w-24 grid place-items-center rounded-full bg-white shadow-inner">
                            <div className="h-16 w-16 rounded-full bg-sky-200 grid place-items-center">🧔🏻‍♂️</div>
                            <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-white text-xs font-semibold">2</span>
                        </div>
                    </div>
                </section>
            );

        case "environmental":
            return (
                <section className="grid gap-6 md:grid-cols-3">
                    <Card title="Carbon Footprint" subtitle="12.4 tCO₂e / yr">
                        <div className="h-32 rounded-2xl bg-emerald-100 grid place-items-center">🌍 Placeholder chart</div>
                    </Card>
                    <Card title="Energy Mix" subtitle="Solar • Wind • Hydro">
                        <div className="h-32 rounded-2xl bg-emerald-50 grid place-items-center">☀️ Placeholder chart</div>
                    </Card>
                    <Card title="Offsets" subtitle="3 projects">
                        <div className="h-32 rounded-2xl bg-emerald-50 grid place-items-center">🎋 Placeholder map</div>
                    </Card>
                </section>
            );

        case "social":
            return (
                <section className="grid gap-6 md:grid-cols-2">
                    <Card title="Community Impact" subtitle="Engagement score 82">
                        <div className="h-40 rounded-2xl bg-pink-50 grid place-items-center">🤗 Placeholder heatmap</div>
                    </Card>
                    <Card title="Wellbeing" subtitle="Pulse up 12%">
                        <div className="h-40 rounded-2xl bg-pink-50 grid place-items-center">💖 Placeholder gauge</div>
                    </Card>
                </section>
            );

        case "technical":
            return (
                <section className="grid gap-6 md:grid-cols-3">
                    <Card title="System Health" subtitle="All systems nominal">
                        <div className="h-32 rounded-2xl bg-sky-50 grid place-items-center">🧩 Placeholder grid</div>
                    </Card>
                    <Card title="Latency" subtitle="p95 142ms">
                        <div className="h-32 rounded-2xl bg-sky-50 grid place-items-center">⏱️ Placeholder chart</div>
                    </Card>
                    <Card title="Deployments" subtitle="4 this week">
                        <div className="h-32 rounded-2xl bg-sky-50 grid place-items-center">🚀 Placeholder timeline</div>
                    </Card>
                </section>
            );

        case "individual":
            return (
                <section className="grid gap-6 md:grid-cols-2">
                    <Card title="Your Snapshot" subtitle="Private to you">
                        <div className="h-40 rounded-2xl bg-violet-50 grid place-items-center">🧠 Placeholder insights</div>
                    </Card>
                    <Card title="Goals" subtitle="3 active">
                        <div className="h-40 rounded-2xl bg-violet-50 grid place-items-center">🎯 Placeholder kanban</div>
                    </Card>
                </section>
            );
    }
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/70 p-5">
            <div className="mb-4">
                <div className="font-medium">{title}</div>
                {subtitle && <div className="text-xs text-zinc-500 mt-0.5">{subtitle}</div>}
            </div>
            {children}
        </div>
    );
}

/** FitToBox: scales children down to fit container (no upscaling). */
function FitToBox({ children, observeKey }: { children: React.ReactNode; observeKey?: string }) {
    const shellRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useLayoutEffect(() => {
        const shell = shellRef.current;
        const inner = innerRef.current;
        if (!shell || !inner) return;

        const compute = () => {
            const iw = inner.scrollWidth;
            const ih = inner.scrollHeight;
            const sw = shell.clientWidth;
            const sh = shell.clientHeight;
            const s = Math.min(sw / iw, sh / ih, 1);
            setScale(s);
        };

        const ro = new ResizeObserver(compute);
        ro.observe(shell);
        ro.observe(inner);
        compute();
        return () => ro.disconnect();
    }, [observeKey]);

    return (
        <div ref={shellRef} className="relative h-full w-full grid place-items-center">
            <div ref={innerRef} style={{ transform: `scale(${scale})`, transformOrigin: "top left" }} className="inline-block">
                {children}
            </div>
        </div>
    );
}
