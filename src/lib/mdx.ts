import fs from "fs"
import path from "path"
import matter from "gray-matter"

const articlesDir = path.join(process.cwd(), "src/articles")

export type ArticleSummary = {
    slug: string;
    title: string;
    heroSrc?: string;
    heroAlt?: string;
    lead?: string;
    date?: string; // ISO string
};


export type ArticleMeta = {
    slug: string
    title: string
    description?: string
    date?: string
    heroSrc?: string
    heroAlt?: string
    lead?: string
}

export function getAllArticles(): ArticleMeta[] {
    const files = fs.readdirSync(articlesDir)

    return files.map((file) => {
        const slug = file.replace(/\.mdx?$/, "")
        const fullPath = path.join(articlesDir, file)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(fileContents)

        return {
            slug,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            heroSrc: normalizeHeroSrc(data.heroSrc),
            heroAlt: data.heroAlt as string,
            lead: data.lead as string,
        }
    })
}

export function getArticleBySlug(slug: string) {
    let fullPath = path.join(articlesDir, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(articlesDir, `${slug}.mdx`)
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
        slug,
        meta: {
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            heroSrc: normalizeHeroSrc(data.heroSrc),
            heroAlt: data.heroAlt as string,
            lead: data.lead as string,
        },
        content,
    }
}

// helper to strip "public/"
function normalizeHeroSrc(src?: string): string | undefined {
    if (!src) return undefined
    return src.startsWith("public/") ? src.replace(/^public/, "") : src
}


