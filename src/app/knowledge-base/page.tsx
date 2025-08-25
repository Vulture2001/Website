import { KnowledgeHero } from '@/components/knowledge-base/KnowledgeHero'
import { SweetSpot } from '@/components/knowledge-base/SweetSpot'
import { ArticleGrid } from '@/components/knowledge-base/ArticleGrid'
import { getAllSummaries } from '@/data/articleService'

export default function KnowledgeBasePage() {
    const items = getAllSummaries()
    return (
        <main>
            <KnowledgeHero />
            <SweetSpot />
            <ArticleGrid articles={items} />
        </main>
    )
}
