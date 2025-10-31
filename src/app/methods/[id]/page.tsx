import ToolDetail from "@/components/toolkit/ToolDetail";
import {
    getToolById,
    getStaticToolParams,
    getToolSeoMeta,
} from "@/lib/tools";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ✅ Prebuild static paths
export async function generateStaticParams() {
    return getStaticToolParams();
}

// ✅ Metadata per tool
export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const { id } = params;
    const tool = getToolById(id);

    if (!tool) {
        return { title: "Method not found" };
    }

    return getToolSeoMeta(tool);
}

// ✅ Page component
export default function ToolkitToolPage(
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const tool = getToolById(id);

    if (!tool) return notFound();

    return <ToolDetail tool={tool} />;
}
