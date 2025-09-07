import ToolDetail from '@/components/toolkit/ToolDetail'
import { getToolById, getStaticToolParams, getToolSeoMeta } from '@/lib/tools'
import { notFound } from 'next/navigation'

// Prebuild static paths (optional but nice)
export async function generateStaticParams() {
    return getStaticToolParams()
}

import type { Metadata } from "next"

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params
    const tool = getToolById(id)
    if (!tool) {
        return { title: "Tool not found" }
    }
    return getToolSeoMeta(tool) // make sure this returns Metadata
}

// ⬇️ params is a Promise — await it
export default async function ToolkitToolPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const tool = getToolById(id)
    if (!tool) return notFound()
    return <ToolDetail tool={tool} />
}
