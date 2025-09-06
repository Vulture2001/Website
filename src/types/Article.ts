// For listing/index pages (from getAllSummaries)
export type ArticleSummary = {
    slug: string;
    title: string;
    heroSrc?: string;
    heroAlt?: string;
    lead?: string;
    date?: string; // ISO string
};

// For references in MDX frontmatter
export type Citation = {
    authors?: string[];
    year?: string;
    title?: string;
    journal?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    url?: string;
    raw?: string; // if present, render as-is
};

// Full article (from getArticleBySlug)
export type Article = ArticleSummary & {
    body: string; // ✅ raw MDX content
    references?: Array<string | Citation>;
};
