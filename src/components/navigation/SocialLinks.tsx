"use client";

import { Github, Linkedin } from "lucide-react";

type SocialType = "github" | "linkedin";

export type SocialLink = {
    type: SocialType;
    url: string;
};

const ICONS: Record<SocialType, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
};

export function SocialLinks({ links }: { links: SocialLink[] }) {
    if (!links?.length) return null;

    return (
        <div className="mt-4 flex gap-4">
            {links.map(({ type, url }) => {
                const Icon = ICONS[type];
                return (
                    <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={type}
                        className="transition-colors text-muted-fg hover:text-fg focus:outline-none rounded-sm"
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                );
            })}
        </div>
    );
}
