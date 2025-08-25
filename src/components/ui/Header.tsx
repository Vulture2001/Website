import React, { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";

type HeaderSize = "sm" | "md" | "lg" | "xl";
type Align = "left" | "center";

/** Omit the native HTML `title` attr to avoid conflict */
export interface HeaderProps
    extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
    /** Visual heading content */
    title: ReactNode;
    /** Small pill above the title */
    eyebrow?: ReactNode;
    /** Optional subheading */
    subtitle?: ReactNode;
    /** Optional actions (buttons/links) */
    actions?: ReactNode;
    /** If you still want the native HTML title attr, use this */
    htmlTitle?: string;
    align?: Align;
    size?: HeaderSize;
    maxWidth?:
        | "sm" | "md" | "lg" | "xl"
        | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

const sizeMap: Record<HeaderSize, { title: string; subtitle: string; space: string }> = {
    sm: { title: "text-2xl md:text-3xl leading-tight", subtitle: "text-base leading-7", space: "gap-3" },
    md: { title: "text-3xl md:text-4xl leading-tight", subtitle: "text-base md:text-lg leading-7 md:leading-8", space: "gap-4" },
    lg: { title: "text-4xl md:text-5xl leading-[1.15]", subtitle: "text-lg md:text-xl leading-8 md:leading-9", space: "gap-5" },
    xl: { title: "text-[42px] md:text-[54px] leading-[1.2] md:leading-[63px] tracking-[-0.02em]", subtitle: "text-lg md:text-xl leading-8 md:leading-9", space: "gap-6" },
};

const maxWidthMap = {
    sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl",
    "2xl": "max-w-2xl", "3xl": "max-w-3xl", "4xl": "max-w-4xl",
    "5xl": "max-w-5xl", "6xl": "max-w-6xl", "7xl": "max-w-7xl",
};

export function Header({
                           id,
                           className,
                           eyebrow,
                           title,
                           subtitle,
                           actions,
                           htmlTitle,
                           align = "left",
                           size = "xl",
                           maxWidth = "3xl",
                           ...rest
                       }: HeaderProps) {
    const sizes = sizeMap[size];
    const alignClasses =
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

    return (
        <section
            id={id}
            title={htmlTitle}
            className={cn("flex flex-col px-4", sizes.space, alignClasses, maxWidthMap[maxWidth], className)}
            aria-label={typeof title === "string" ? title : undefined}
            {...rest}
        >
            {eyebrow && (
                <Badge
                    variant="outline"
                    tone="gray"   // renders black/neutral outline
                    size="sm"
                    shape="pill"
                >
                    {eyebrow}
                </Badge>
            )}

            <h1 className={cn("font-inter font-semibold text-[#282828]", sizes.title)}>
                {title}
            </h1>

            {subtitle && (
                <p className={cn("text-[#282828]/80 font-inter", sizes.subtitle)}>
                    {subtitle}
                </p>
            )}

            {actions && (
                <div
                    className={cn(
                        "flex flex-wrap gap-3",
                        align === "center" ? "justify-center" : "justify-start"
                    )}
                >
                    {actions}
                </div>
            )}
        </section>
    );
}
