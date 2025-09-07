// components/ui/layout/PageHero.tsx
import Header from "@/components/ui/layout/Header";

type PageHeroProps = {
    id: string;
    eyebrow?: string;
    title: string;
    subtitle: string;
    size?: "md" | "xl";
};

export function PageHero({ id, eyebrow, title, subtitle, size }: PageHeroProps) {
    return (
        <section className="relative py-20 text-center overflow-hidden">
            <Header
                id={id}
                eyebrow={eyebrow}
                align="center"
                title={title}
                subtitle={subtitle}
                size={size}
                maxWidth="5xl"
            />
        </section>
    );
}
