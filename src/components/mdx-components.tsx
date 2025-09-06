// src/components/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import {
    H2,
    P,
    Quote,
    Figure,
    References, FeatureList, IconList, Table, Callout
} from "@/components/knowledge-base/ArticleComponents";

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
