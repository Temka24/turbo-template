// packages/eslint-config/next.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const nextJsConfig = [
    ...baseConfig,
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    {
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/await-thenable": "off",
        },
    },

    {
        plugins: {
            "react-hooks": pluginReactHooks,
        },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
        },
    },
    eslintConfigPrettier,
    {
        ignores: [".next/", "dist/", "node_modules/"],
    },
];
