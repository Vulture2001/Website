// components/ui/layout/PageLayout.tsx
import { cn } from "@/lib/cn";
import React from "react";

type PageLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

export function PageLayout({ children, className }: PageLayoutProps) {
    return (
        <main
            className={cn(
                "relative isolate mt-[4rem] min-h-screen bg-bg",
                className
            )}
        >
            {children}
        </main>
    );
}
