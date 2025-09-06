import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "next/typescript"
    ),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "coverage/**",
            "dist/**",
            "next-env.d.ts",
            ".env*",
        ],
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "react/jsx-no-target-blank": "off",
        },
    },
];

export default eslintConfig;
