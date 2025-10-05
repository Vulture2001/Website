import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ArticleMeta = {
    title: string;
    description?: string;
    date?: string;
    heroSrc?: string;
    heroAlt?: string;
    lead?: string;
};

export type ArticleSummary = ArticleMeta & {
    slug: string;
};

export type Article = {
    slug: string;
    meta: ArticleMeta;
    content: string; // raw markdown/MDX content
};

const articlesDir = path.join(process.cwd(), "src/articles");
const projectsDir = path.join(process.cwd(), "src/projects");

function normalizeHeroSrc(src?: string): string | undefined {
    if (!src) return undefined;
    return src.startsWith("public/") ? src.replace(/^public\//, "") : src;
}

function parseFile(filePath: string, slug: string): Article {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

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
    };
}

function getAllFromDir(dir: string): ArticleSummary[] {
    const files = fs.readdirSync(dir);

    return files.map((file) => {
        const slug = file.replace(/\.mdx?$/, "");
        const { meta } = parseFile(path.join(dir, file), slug);
        return { slug, ...meta };
    });
}

function getBySlug(dir: string, slug: string): Article | null {
    let fullPath = path.join(dir, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(dir, `${slug}.md`);
    }
    if (!fs.existsSync(fullPath)) return null;

    return parseFile(fullPath, slug);
}

/* ---- Knowledge Base ---- */
export function getAllArticles(): ArticleSummary[] {
    return getAllFromDir(articlesDir);
}

export function getArticleBySlug(slug: string): Article | null {
    return getBySlug(articlesDir, slug);
}

/* ---- Projects ---- */
export function getAllProjects(): ArticleSummary[] {
    return getAllFromDir(projectsDir);
}

export function getProjectBySlug(slug: string): Article | null {
    return getBySlug(projectsDir, slug);
}

