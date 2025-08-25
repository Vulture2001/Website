import { KnowledgeHero } from '@/components/knowledge-base/KnowledgeHero'
import { SweetSpot } from '@/components/knowledge-base/SweetSpot'
import { ArticleGrid } from '@/components/knowledge-base/ArticleGrid'
import { getAllSummaries } from '@/data/articleService'
import {Header} from "@/components/ui/Header";

export default function KnowledgeBase() {
    const items = getAllSummaries()
    return (
        <main>
            <div className="mt-20 relative z-10 max-w-7xl mx-auto px-4">
                <Header
                    align="center"
                    size="xl"
                    maxWidth="5xl"
                    eyebrow="Knowledge Base"
                    title="Getting Started"
                    subtitle="Practical methods and templates to embed sustainability into every phase of your design process. Copy, customize, and integrate these tools into your workflow."
                />
            </div>
            <KnowledgeHero />
            <SweetSpot />
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <Header
                    align="center"
                    size="xl"
                    maxWidth="5xl"
                    title="Knowledge Base"
                    subtitle="Practical methods and templates to embed sustainability into every phase of your design process. Copy, customize, and integrate these tools into your workflow."
                />
            </div>
            <ArticleGrid articles={items} />
        </main>
    )
}
