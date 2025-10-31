"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@lib/cn";

type NavItem = { label: string; href?: string; modal?: boolean };

const NAV: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "Methods", href: "/methods" },
];

const underlineClasses =
    "after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-brand-accent after:transition-transform after:origin-left";

export function Navbar() {
    const pathname = usePathname();
    const [elevated, setElevated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [, setReflectionOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null); // <-- 1. Create button ref

    // Scroll effect for navbar elevation
    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // 3. Update logic: If click is inside menu OR on the button, ignore it.
            if (
                (menuRef.current && menuRef.current.contains(target)) ||
                (buttonRef.current && buttonRef.current.contains(target))
            ) {
                return;
            }

            // Otherwise, close the menu.
            setMenuOpen(false);
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]); // Dependencies are correct

    return (
        <header
            className={cn(
                "sticky top-0 z-50 bg-transparent backdrop-blur",
                elevated && "border-b border-surface-border"
            )}
        >
            <nav
                className="mx-auto w-full max-w-[1336px] px-4 lg:px-6"
                aria-label="Global"
            >
                <div className="h-16 flex items-center justify-between pb-1 relative">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 shrink-0 text-lg font-semibold tracking-tight text-surface-fg leading-none"
                        aria-label="Conscious Design"
                    >
                        <Image
                            src="/svg/logo.svg"
                            alt="Course logo"
                            width={28}
                            height={28}
                            priority
                        />
                        <span className="hidden lg:inline">
              Responsible, Sustainable, and Inclusive Digital Product Creation
            </span>
                        <span className="lg:hidden">
              Conscious Digital Product Creation
            </span>
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

                    {/* Mobile menu button */}
                    <button
                        ref={buttonRef} // <-- 2. Assign the ref here
                        className="md:hidden p-2 rounded-md text-surface-fg hover:bg-surface-border transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    menuOpen
                                        ? "M6 18L18 6M6 6l12 12" // X icon
                                        : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                                }
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile dropdown menu (pushes content down) */}
                {menuOpen && (
                    <div ref={menuRef} className="md:hidden">
                        <div className="flex flex-col gap-2 mt-2 px-0 sm:px-2">
                            {NAV.map((item) =>
                                item.modal ? (
                                    <NavButton
                                        key={item.label}
                                        onClick={() => {
                                            setReflectionOpen(true);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </NavButton>
                                ) : (
                                    <NavLink
                                        key={item.href}
                                        href={item.href!}
                                        active={pathname === item.href}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

/* ----------------------------- Subcomponents ----------------------------- */

function NavLink({
                     href,
                     children,
                     active,
                     onClick,
                 }: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={cn(
                "relative text-base font-medium transition-colors block px-2 py-1",
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
                "relative text-base font-medium text-text-muted hover:text-surface-fg transition-colors block px-2 py-1",
                "after:scale-x-0 hover:after:scale-x-100",
                underlineClasses
            )}
        >
            {children}
        </button>
    );
}