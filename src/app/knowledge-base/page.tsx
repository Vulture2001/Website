// app/knowledge-base/page.tsx
import { getAllArticles } from "@/lib/mdx";
import KnowledgeBaseClient from "@/components/knowledge-base/KnowledgeBase";

export default function KnowledgeBasePage() {
    const articles = getAllArticles().sort(
        (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );

    return <KnowledgeBaseClient articles={articles} />;
}
