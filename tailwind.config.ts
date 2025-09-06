// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/styles/**/*.{css}"
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    DEFAULT: "hsl(var(--surface) / <alpha-value>)",
                    fg: "hsl(var(--fg) / <alpha-value>)",
                    border: "hsl(var(--border) / <alpha-value>)",
                    muted: "hsl(var(--muted-fg) / <alpha-value>)",
                },
                text: "hsl(var(--text) / <alpha-value>)",
                brand: {
                    primary: "hsl(var(--brand-primary) / <alpha-value>)",
                    accent: "hsl(var(--brand-accent) / <alpha-value>)",
                    blue: "hsl(var(--brand-blue) / <alpha-value>)",
                    black: "hsl(var(--brand-black) / <alpha-value>)",
                    cyan: "hsl(var(--brand-cyan) / <alpha-value>)",
                    green: "hsl(var(--brand-green) / <alpha-value>)",
                    indigo: "hsl(var(--brand-indigo) / <alpha-value>)",
                    orange: "hsl(var(--brand-orange) / <alpha-value>)",
                    pink: "hsl(var(--brand-pink) / <alpha-value>)",
                    purple: "hsl(var(--brand-purple) / <alpha-value>)",
                    red: "hsl(var(--brand-red) / <alpha-value>)",
                    teal: "hsl(var(--brand-teal) / <alpha-value>)",
                    yellow: "hsl(var(--brand-yellow) / <alpha-value>)",
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
}

export default config
