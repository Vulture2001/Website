"use server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import articlesIndex from "@/data/articles.json";

export type ArticleMeta = typeof articlesIndex[number];

const baseDir = process.cwd();

export default async function getAllSummaries() {
    return articlesIndex.map(({ slug, title, heroSrc, heroAlt, lead, date }) => ({
        slug,
        title,
        heroSrc,
        heroAlt,
        lead,
        date,
    }));
}

/**
 * Returns all article metadata from articles.json
 */
export async function getAllArticles() {
    return articlesIndex;
}

/**
 * Loads a single article by slug.
 * Reads its MDX file, parses frontmatter, returns raw MDX body.
 */
export async function getArticleBySlug(slug: string) {
    const meta = articlesIndex.find((a) => a.slug === slug);
    if (!meta) return null;

    const filePath = path.join(baseDir, meta.mdxPath);
    try {
        const raw = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(raw);

        return {
            ...meta,
            body: content, // ✅ raw MDX string
            references: data.references ?? [],
        };
    } catch (err) {
        console.error(`❌ Failed to load article: ${slug}`, err);
        return null;
    }
}
