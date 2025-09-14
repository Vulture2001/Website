// app/articles/page.tsx
import KnowledgeBase from "@components/pages/KnowledgeBase";
import { getAllArticles } from "@/lib/mdx";

export default function KnowledgeBasePage() {
    const articles = getAllArticles().sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
    });

    return <KnowledgeBase articles={articles} />;
}
