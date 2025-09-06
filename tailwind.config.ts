// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx,js,jsx,mdx}",
        "./app/**/*.{ts,tsx,js,jsx,mdx}", // if you use /app
    ],
    theme: {
        extend: {
            colors: {
                // surfaces / text
                bg: "hsl(var(--bg) / <alpha-value>)",
                fg: "hsl(var(--fg) / <alpha-value>)",
                text: "hsl(var(--text) / <alpha-value>)",
                "muted-fg": "hsl(var(--muted-fg) / <alpha-value>)",
                surface: "hsl(var(--surface) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",

                // brand aliases
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
    plugins: [],
};

export default config;
