// app/about/page.tsx
"use client";

import { PageLayout } from "@/components/ui/layout/PageLayout";
import { PageHero } from "@/components/ui/layout/PageHero";
import { fadeInUp } from "@/lib/animations";
import { ProfileCard } from "@/components/about/ProfileCard";
import { ThesisDetailsCard } from "@/components/about/ThesisDetailsCard";
import {MotionSection} from "@components/ui/layout/Section";

export default function AboutPage() {
    return (
        <PageLayout>
            <PageHero
                id="about-hero"
                eyebrow="About"
                title="About the Framework"
                subtitle="Learn who created Software 5.0 and the research behind its development."
                size="xl"
            />

            <MotionSection id="about-content" variants={fadeInUp}>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr] items-start">
                    <ProfileCard />
                    <ThesisDetailsCard />
                </div>
            </MotionSection>
        </PageLayout>
    );
}
