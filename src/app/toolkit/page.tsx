// app/toolkit/page.tsx
'use client';

import { PageLayout } from '@components/layout/PageLayout';
import { PageHero } from '@components/hero/PageHero';
import { ToolLibrary } from '@components/pages/ToolLibrary';

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
        </PageLayout>
    );
}
