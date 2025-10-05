"use client";

import Link from "next/link";
import { cn } from "@lib/cn";

type LinkItem = { label: string; href: string };
type Section = { heading: string; links: LinkItem[] };

const FOOTER_SECTIONS: Section[] = [
    {
        heading: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Process", href: "/process" },
            { label: "Toolkit", href: "/toolkit" }
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
                            href="/public"
                            className="text-lg font-semibold tracking-tight text-surface-fg"
                            aria-label="Course home"
                        >
                            Responsible, Sustainable, and Inclusive Digital Product Creation
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            A project week offered by the chair of Applied Educational Technologies at CIT TUM.
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

                    {/* Course */}
                    <div className="md:col-span-4">
                        <div className="rounded-xl border border-surface-border sm:p-6">
                            <div className="text-xs font-semibold tracking-wider uppercase text-text-muted">
                                Project Week
                            </div>
                            <h3 className="mt-2 text-sm font-semibold leading-5 text-surface-fg">
                                {"Responsible, Sustainable, and Inclusive Digital Product Creation"}
                            </h3>
                            <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-text-muted">
                                <div>
                                    <dt className="sr-only">Instructors</dt>
                                    <span className="font-medium text-surface-fg">Instructors: </span>
                                    {"Prof. Dr. Stephan Krusche, Elisabeth Friesinger"}
                                </div>
                                <div>
                                    <dt className="sr-only">Chair</dt>
                                    <span className="font-medium text-surface-fg">Chair: </span>
                                    {"Applied Educational Technologies"}
                                </div>
                                <div>
                                    <dt className="sr-only">School</dt>
                                    <span className="font-medium text-surface-fg">School: </span>
                                    {"Computation, Information and Technology, TUM"}
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <div className="text-xs text-text-muted">
                        © {year} Project week: Responsible, Sustainable, and Inclusive Digital Product Creation.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
