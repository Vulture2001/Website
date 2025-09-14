// components/ui/layout/PageLayout.tsx
import { cn } from "@lib/cn";
import type { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren<{
    className?: string;
}>;

export function PageLayout({ children, className }: PageLayoutProps) {
    return (
        <main
            className={cn(
                "relative isolate mt-16 min-h-screen bg-bg", // mt-16 instead of arbitrary 4rem
                className
            )}
        >
            {children}
        </main>
    );
}
