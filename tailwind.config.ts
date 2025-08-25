import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // direct palette (from :root tokens)
                blue:   'hsl(var(--color-blue) / <alpha-value>)',
                black:  'hsl(var(--color-black) / <alpha-value>)',
                cyan:   'hsl(var(--color-cyan) / <alpha-value>)',
                green:  'hsl(var(--color-green) / <alpha-value>)',
                indigo: 'hsl(var(--color-indigo) / <alpha-value>)',
                orange: 'hsl(var(--color-orange) / <alpha-value>)',
                pink:   'hsl(var(--color-pink) / <alpha-value>)',
                purple: 'hsl(var(--color-purple) / <alpha-value>)',
                red:    'hsl(var(--color-red) / <alpha-value>)',
                teal:   'hsl(var(--color-teal) / <alpha-value>)',
                yellow: 'hsl(var(--color-yellow) / <alpha-value>)',

                // semantic aliases
                brand: {
                    primary: 'hsl(var(--brand-primary) / <alpha-value>)',
                    accent:  'hsl(var(--brand-accent) / <alpha-value>)',
                },

                // surfaces / text
                bg:        'hsl(var(--bg) / <alpha-value>)',
                surface:   'hsl(var(--surface) / <alpha-value>)',
                border:    'hsl(var(--border) / <alpha-value>)',
                fg:        'hsl(var(--fg) / <alpha-value>)',
                'muted-fg':'hsl(var(--muted-fg) / <alpha-value>)',
                text:      'hsl(var(--text) / <alpha-value>)',
            },
        },
    },
    plugins: [],
}

export default config
