// app/knowledge-base/page.tsx
import KnowledgeBaseClient from "@components/knowledge-base/KnowledgeBaseClient";
import { getAllArticles } from "@/lib/mdx";

export default function KnowledgeBasePage() {
    const articles = getAllArticles().sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
    });

    return <KnowledgeBaseClient articles={articles} />;
}
