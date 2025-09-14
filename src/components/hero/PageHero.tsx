import Header from "@components/layout/Header";
import type { PropsWithChildren } from "react";

type PageHeroProps = PropsWithChildren<{
    id: string;
    eyebrow?: string;
    title: string;
    subtitle: string;
    size?: "md" | "xl";
    align?: "left" | "center";
    /** Tailwind background class (e.g., "bg-surface" or "bg-gradient-to-b ...") */
    background?: string;
}>;

export function PageHero({
                             id,
                             eyebrow,
                             title,
                             subtitle,
                             size = "xl",
                             align = "center",
                             background = "bg-bg",
                             children, // for optional CTAs or illustrations
                         }: PageHeroProps) {
    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className={`relative overflow-hidden ${background}`}
        >
            <Header
                id={`${id}-title`}
                eyebrow={eyebrow}
                align={align}
                title={title}
                subtitle={subtitle}
                size={size}
                maxWidth="5xl"
            />
            {children && <div className="mt-6">{children}</div>}
        </section>
    );
}
