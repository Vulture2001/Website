import React from "react";
import { Github, Linkedin } from "lucide-react";

export function ProfileCard() {
    return (
        <div className="rounded-2xl bg-[hsl(var(--surface)/0.8)] p-6 shadow-sm flex flex-col items-center text-center">
            {/* Avatar */}
            <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c9063031171b997d3eff2be109286f9cbcc44804?width=150"
                alt="Monika Zielińska"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />

            <h3 className="mt-4 text-lg font-semibold text-fg">Monika Zielińska</h3>
            <p className="text-sm text-[hsl(var(--muted-fg))]">
                Master’s Thesis Author & Framework Developer at Technical University of
                Munich
            </p>

            {/* Social links */}
            <div className="mt-3 flex gap-4">
                <a
                    href="https://github.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-fg"
                >
                    <Github className="h-5 w-5" />
                </a>
                <a
                    href="https://www.linkedin.com/in/your-linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-fg"
                >
                    <Linkedin className="h-5 w-5" />
                </a>
            </div>
        </div>
    );
}
