// src/components/MDXComponents.tsx
import {
    H2,
    P,
    Quote,
    Figure,
    References, FeatureList, IconList, Table, Callout
} from "@components/articles/ArticleComponents";
import {MDXComponents} from "mdx/types";

export const mdxComponents: MDXComponents = {
    // Markdown overrides
    h2: H2,
    p: P,
    blockquote: Quote,
    Figure,
    Quote,
    References,
    FeatureList,
    IconList,
    Table, Callout
};
