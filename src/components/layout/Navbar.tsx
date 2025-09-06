'use client';

import "@/styles/navbar.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Process", href: "/process" },
    { label: "Toolkit", href: "/toolkit" },
    { label: "About", href: "/about" },
];

export function Navbar() {
    const pathname = usePathname();
    const [elevated, setElevated] = useState(false);
    const [open, setOpen] = useState<boolean>(false); // reserved for mobile menu

    // subtle shadow on scroll
    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close menu on route change
    useEffect(() => { setOpen(false); }, [pathname]);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/70",
                elevated && "shadow-[0_1px_0_0_hsl(var(--border))]"
            )}
        >
            <nav className="mx-auto w-full max-w-[1336px] px-4 lg:px-6" aria-label="Global">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Software 5.0 home">
                        <span className="text-[1.125rem] font-semibold tracking-tight text-fg">Software 5.0</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV.map((item) => {
                            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "nav-link text-[0.9375rem] font-medium",
                                        active
                                            ? "is-active"
                                            : "text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))]"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}
