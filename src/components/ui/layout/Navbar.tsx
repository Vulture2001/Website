"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import ReflectionModal from "@components/carousel/ReflectionModal";

type NavItem = { label: string; href?: string; modal?: boolean };

const NAV: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Process", href: "/process" },
    { label: "Toolkit", href: "/toolkit" },
    { label: "Reflect", modal: true }, // modal trigger
    { label: "About", href: "/about" },
];

const underlineClasses =
    "after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-brand-accent after:transition-transform after:origin-left";

export function Navbar() {
    const pathname = usePathname();
    const [elevated, setElevated] = useState(false);
    const [reflectionOpen, setReflectionOpen] = useState(false);

    // subtle border on scroll
    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 bg-transparent backdrop-blur pb-5",
                elevated && "border-b border-surface-border"
            )}
        >
            <nav
                className="mx-auto w-full max-w-[1336px] px-4 lg:px-6"
                aria-label="Global"
            >
                <div className="h-16 flex items-end justify-between pb-1">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 shrink-0 text-lg font-semibold tracking-tight text-surface-fg leading-none"
                        aria-label="Software 5.0 home"
                    >
                        Software 5.0
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV.map((item) =>
                            item.modal ? (
                                <NavButton
                                    key={item.label}
                                    onClick={() => setReflectionOpen(true)}
                                >
                                    {item.label}
                                </NavButton>
                            ) : (
                                <NavLink
                                    key={item.href}
                                    href={item.href!}
                                    active={pathname === item.href}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        )}
                    </div>
                </div>
            </nav>

            {/* Fullscreen Reflection Modal */}
            <ReflectionModal
                open={reflectionOpen}
                onClose={() => setReflectionOpen(false)}
            />
        </header>
    );
}

/* ----------------------------- Subcomponents ----------------------------- */

function NavLink({
                     href,
                     children,
                     active,
                 }: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
                "relative text-base font-medium transition-colors",
                active
                    ? "text-surface-fg after:scale-x-100"
                    : "text-text-muted hover:text-surface-fg after:scale-x-0 hover:after:scale-x-100",
                underlineClasses
            )}
        >
            {children}
        </Link>
    );
}

function NavButton({
                       onClick,
                       children,
                   }: {
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            aria-haspopup="dialog"
            onClick={onClick}
            className={cn(
                "relative text-base font-medium text-text-muted hover:text-surface-fg transition-colors",
                "after:scale-x-0 hover:after:scale-x-100",
                underlineClasses
            )}
        >
            {children}
        </button>
    );
}
