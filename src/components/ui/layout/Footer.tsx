'use client';

import "@styles/footer.css";

import Link from "next/link";
import { cn } from "@/lib/cn";
import thesis from "@/data/thesis.json";

type LinkItem = { label: string; href: string };
type Section = { heading: string; links: LinkItem[] };

const FOOTER_SECTIONS: Section[] = [
    {
        heading: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Knowledge Base", href: "/knowledge-base" },
            { label: "Process", href: "/process" },
            { label: "Toolkit", href: "/toolkit" },
        ],
    },
];

export function Footer({ className }: { className?: string }) {
    const year = new Date().getFullYear();

    return (
        <footer className={cn("footer text-text", className)} role="contentinfo" aria-labelledby="footer-heading">
            <div className="mx-auto max-w-[1336px] px-4 lg:px-6 py-12">
                {/* Top: Brand + Sections */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    {/* Brand / Mission */}
                    <div className="md:col-span-3 flex flex-col gap-3">
                        <Link href="/public" className="text-lg font-semibold tracking-tight text-fg" aria-label="Software 5.0 home">
                            Software 5.0
                        </Link>
                        <p className="text-sm text-[hsl(var(--muted-fg))]">
                            A student-friendly framework to design and build digital products that are usable, inclusive, and sustainable.
                        </p>
                    </div>

                    {/* Link sections */}
                    <div className="md:col-span-5 grid grid-cols-2 gap-y-2 gap-x-1 sm:gap-x-2" aria-labelledby="footer-heading">
                        <h2 id="footer-heading" className="sr-only">Footer</h2>
                        {FOOTER_SECTIONS.map((section) => (
                            <nav key={section.heading} className="space-y-2" aria-label={section.heading}>
                                <div className="footer-heading">{section.heading}</div>
                                <ul className="space-y-2">
                                    {section.links.map((item) => (
                                        <li key={item.href}>
                                            <Link href={item.href} className="footer-link text-sm">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    {/* Thesis card */}
                    <div className="md:col-span-4">
                        <div className="footer-card rounded-xl ">
                            <div className="footer-heading">Based on Research</div>
                            <h3 className="mt-2 text-sm font-semibold leading-5 text-fg">
                                {thesis.title}
                            </h3>
                            <p className="mt-4 text-xs text-[hsl(var(--muted-fg))]">
                                {thesis.university}
                            </p>
                            <div className="mt-3 grid grid-cols-1 gap-1 text-xs text-[hsl(var(--muted-fg))]">
                                <div><span className="text-[hsl(var(--muted-fg))]">Author:</span> {thesis.author}</div>
                                <div><span className="text-[hsl(var(--muted-fg))]">Advisor:</span> {thesis.advisor}</div>
                                <div><span className="text-[hsl(var(--muted-fg))]">Supervisor:</span> {thesis.supervisor}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <div className="text-xs text-[hsl(var(--muted-fg))]">
                        © {year} Software 5.0 — Built for students, educators, and future practitioners.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
