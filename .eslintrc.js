module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true,
    },
    extends: [
        "plugin:react/recommended",
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: ["react", "@typescript-eslint", "jest", "prettier", "import", "unused-imports"],
    rules: {
        "import/order": [
            "error",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    ["parent", "sibling"],
                    "object",
                    "type",
                    "index",
                ],
                "newlines-between": "always",
                pathGroupsExcludedImportTypes: ["builtin"],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
                pathGroups: [
                    {
                        pattern: "@/components/common",
                        group: "internal",
                        position: "before",
                    },
                    {
                        pattern: "@/components/hooks",
                        group: "internal",
                        position: "before",
                    },
                ],
            },
        ],
        "unused-imports/no-unused-imports": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "import/prefer-default-export": "off",
        "import/extensions": [
            "error",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [".jsx", ".tsx"],
            },
        ],
        "react/react-in-jsx-scope": "off",
        "no-void": [
            "error",
            {
                allowAsStatement: true,
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
