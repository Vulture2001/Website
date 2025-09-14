"use client";

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
        <footer
            className={cn("border-t-2 border-surface-border bg-bg text-text", className)}
            role="contentinfo"
            aria-labelledby="footer-heading"
        >
            <div className="mx-auto max-w-[1336px] px-4 lg:px-6 py-12">
                {/* Top: Brand + Sections */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    {/* Brand / Mission */}
                    <div className="md:col-span-3 flex flex-col gap-3">
                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-tight text-surface-fg"
                            aria-label="Software 5.0 home"
                        >
                            Software 5.0
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            A student-friendly framework to design and build digital products
                            that are usable, inclusive, and sustainable.
                        </p>
                    </div>

                    {/* Link sections */}
                    <div
                        className="md:col-span-5 grid grid-cols-2 gap-y-6 gap-x-8"
                        aria-labelledby="footer-heading"
                    >
                        <h2 id="footer-heading" className="sr-only">
                            Footer navigation
                        </h2>
                        {FOOTER_SECTIONS.map((section) => (
                            <nav
                                key={section.heading}
                                className="space-y-3"
                                aria-label={section.heading}
                            >
                                <div className="text-xs font-semibold tracking-wider uppercase text-text">
                                    {section.heading}
                                </div>
                                <ul className="space-y-2">
                                    {section.links.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "relative inline-flex items-center text-sm text-text-muted transition-colors",
                                                    "hover:text-surface-fg",
                                                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand-primary after:transition-transform after:origin-left hover:after:scale-x-100",
                                                    "motion-reduce:transition-none motion-reduce:after:transition-none"
                                                )}
                                            >
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
                        <div className="rounded-xl border border-surface-border sm:p-6">
                            <div className="text-xs font-semibold tracking-wider uppercase text-text-muted">
                                Based on Research
                            </div>
                            <h3 className="mt-2 text-sm font-semibold leading-5 text-surface-fg">
                                {thesis.title}
                            </h3>
                            <p className="mt-3 text-xs text-text-muted">{thesis.university}</p>
                            <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-text-muted">
                                <div>
                                    <dt className="sr-only">Author</dt>
                                    <span className="font-medium text-surface-fg">Author: </span>
                                    {thesis.author}
                                </div>
                                <div>
                                    <dt className="sr-only">Advisor</dt>
                                    <span className="font-medium text-surface-fg">Advisor: </span>
                                    {thesis.advisor}
                                </div>
                                <div>
                                    <dt className="sr-only">Supervisor</dt>
                                    <span className="font-medium text-surface-fg">Supervisor: </span>
                                    {thesis.supervisor}
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <div className="text-xs text-text-muted">
                        © {year} Software 5.0 — Built for students, educators, and future practitioners.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
