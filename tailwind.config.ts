import type { Config } from "tailwindcss"

const config: Config = {
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
}

export default config
