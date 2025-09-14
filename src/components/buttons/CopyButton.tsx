// components/ui/CopyButton.tsx
'use client'

import { useState } from 'react'

type CopyButtonProps = {
    text: string
    label?: string
    className?: string
    copiedLabel?: string
    timeout?: number
}

export function CopyButton({
                               text,
                               label = 'Copy',
                               className = '',
                               copiedLabel = 'Copied!',
                               timeout = 1200,
                           }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const onClick = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), timeout)
        } catch (e) {
            console.error('Failed to copy text:', e)
        }
    }

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-3 py-1.5 
                  text-sm font-semibold text-[#282828] hover:bg-[#F3F4F6] transition ${className}`}
            aria-label={label}
            title={label}
            type="button"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="opacity-70"
                aria-hidden="true"
            >
                <path
                    d="M9 9.5A1.5 1.5 0 0 1 10.5 8h7A1.5 1.5 0 0 1 19 9.5v7A1.5 1.5 0 0 1 17.5 18h-7A1.5 1.5 0 0 1 9 16.5v-7Z"
                    stroke="currentColor"
                    fill="none"
                />
                <path
                    d="M7 14V7.5A1.5 1.5 0 0 1 8.5 6H15"
                    stroke="currentColor"
                    fill="none"
                />
            </svg>
            {copied ? copiedLabel : label}
        </button>
    )
}
