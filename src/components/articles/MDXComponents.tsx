// src/components/MDXComponents.tsx
import type { MDXComponents } from "mdx/types";
import {
    H2,
    P,
    Quote,
    Figure,
    References, FeatureList, IconList, Table, Callout
} from "@components/articles/ArticleComponents";

export const MDXComponents: MDXComponents = {
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
