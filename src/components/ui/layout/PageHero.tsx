import Header from "@/components/ui/layout/Header";

type PageHeroProps = {
    id: string;
    eyebrow?: string;
    title: string;
    subtitle: string;
    size?: "md" | "xl";
    align?: "left" | "center"; // allow flexibility
    background?: string; // e.g. "bg-surface" or gradient
};

export function PageHero({
                             id,
                             eyebrow,
                             title,
                             subtitle,
                             size,
                             align = "center",
                             background = "bg-bg", // default to page background
                         }: PageHeroProps) {
    return (
        <section
            className={`relative overflow-hidden ${background}`}
            aria-labelledby={id}
        >
            <Header
                id={id}
                eyebrow={eyebrow}
                align={align}
                title={title}
                subtitle={subtitle}
                size={size}
                maxWidth="5xl"
            />
        </section>
    );
}
