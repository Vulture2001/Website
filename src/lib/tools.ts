import phases from '@/data/phases.json'
import tools from '@/data/tools.json'

type Phase = { label: string; value: string; color: string }
type Step = { title?: string; description?: string } | string

export type Tool = {
    id: string | number
    title: string
    overview?: string
    purpose?: string
    phase?: string
    steps?: Step[]
    input?: string[]
    inputs?: string[]
    outputs?: string[]
    templates?: string[]
    prompts?: string[]
    tips?: string[]
    description?: string
    category?: string
}

export const getToolById = (id: string | number) => {
    const list = tools as Tool[]
    return list.find((t) => String(t.id) === String(id))
}

export const getStaticToolParams = () =>
    (tools as Tool[]).map((t) => ({ id: String(t.id) }))

export const getToolSeoMeta = (tool: Tool) => ({
    title: `${tool.title} – Sustainability Toolkit`,
    description: tool.overview || tool.purpose || tool.description || 'Tool detail',
})

export const normalizeArray = (arr?: string[]) =>
    Array.isArray(arr) ? arr.filter(Boolean) : []

export const normalizeSteps = (steps?: Step[]) =>
    Array.isArray(steps)
        ? steps.map((s) =>
            typeof s === 'string'
                ? { title: s, description: '' }
                : { title: s.title ?? '', description: s.description ?? '' }
        )
        : []

export const getPhaseMeta = (value?: string, all?: Phase[]) => {
    if (!value) return null
    const list = (all || (phases as Phase[]))
    return list.find((p) => p.value === value) || null
}
