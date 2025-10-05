// app/projects/[slug]/page.tsx
import { getProjectBySlug } from "@/lib/mdx"; // create this or alias from getCaseStudyBySlug
import { notFound } from "next/navigation";
import { ArticleLayout } from "@components/articles/ArticleLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@components/articles/MDXComponents";

type PageProps = {
    params: { slug: string };
};

export default async function ProjectSlugPage({ params }: PageProps) {
    const { slug } = params;
    const project = await getProjectBySlug(slug);
    if (!project) return notFound();

    const breadcrumbs = [
        { href: "/projects", label: "Projects" },
        { href: `/projects/${slug}`, label: project.meta.title },
    ];

    return (
        <ArticleLayout
            title={project.meta.title}
            heroSrc={project.meta.heroSrc}
            heroAlt={project.meta.heroAlt}
            lead={project.meta.lead}
            date={project.meta.date}
            breadcrumbs={breadcrumbs}
        >
            <MDXRemote source={project.content} components={mdxComponents} />
        </ArticleLayout>
    );
}
