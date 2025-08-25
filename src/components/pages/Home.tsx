import { Hero } from '@/components/ui/Hero'
import Content from "@/components/ui/ContentLeft";
import ContentRight from "@/components/ui/ContentRight";

export default function Home() {
    return (
        <main>
            <Hero />
            <ContentRight />
            <Content />
        </main>
    )
}
