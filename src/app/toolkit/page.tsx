// app/toolkit/page.tsx
'use client';

import { PageLayout } from '@components/layout/PageLayout';
import { PageHero } from '@components/hero/PageHero';
import { ToolLibrary } from '@components/pages/ToolLibrary';
import faqs from '@/data/faqs_toolkit.json';
import { MotionSection } from '@components/layout/MotionSection';
import { fadeInUp } from '@/lib/animations';
import { FaqList } from '@components/hero/FAQ';

export default function ToolkitPage() {
    return (
        <PageLayout>
            <PageHero
                id="toolkit-hero"
                eyebrow="Toolkit"
                title="Sustainable Toolkit"
                subtitle="Practical methods and templates to embed sustainability into every phase of your design process. Copy, customize, and integrate these tools into your workflow."
                size="xl"
            />

            <ToolLibrary />

            <MotionSection id="toolkit-faqs" variants={fadeInUp}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-fg">FAQs</h2>
                </div>
                <FaqList items={faqs} />
            </MotionSection>
        </PageLayout>
    );
}
