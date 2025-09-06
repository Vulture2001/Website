import { Github, Linkedin } from "lucide-react";

type SocialLink = {
    type: "github" | "linkedin";
    url: string;
};

const ICONS = {
    github: Github,
    linkedin: Linkedin,
};

export function SocialLinks({ links }: { links: SocialLink[] }) {
    return (
        <div className="flex gap-4 mt-4">
            {links.map(({ type, url }) => {
                const Icon = ICONS[type];
                return (
                    <a
                        key={type}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={type}
                        className="text-muted-fg hover:text-fg transition-colors"
                    >
                        <Icon className="h-5 w-5" />
                    </a>
                );
            })}
        </div>
    );
}
