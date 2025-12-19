import ToolDetail from "@/components/toolkit/ToolDetail";
import {
    getToolById,
    getStaticToolParams,
    getToolSeoMeta,
} from "@/lib/tools";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ✅ Prebuild static paths (This stays the same)
export async function generateStaticParams() {
    return getStaticToolParams();
}

// ✅ Metadata per tool
// UPDATED: params is now a Promise
export async function generateMetadata(
    props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const params = await props.params; // 1. Await params here
    const { id } = params;

    const tool = getToolById(id);

    if (!tool) {
        return { title: "Method not found" };
    }

    return getToolSeoMeta(tool);
}

// ✅ Page component
// UPDATED: Component is async and params is a Promise
export default async function ToolkitToolPage(
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params; // 2. Await params here
    const { id } = params;

    const tool = getToolById(id);

    if (!tool) return notFound();

    return <ToolDetail tool={tool} />;
}