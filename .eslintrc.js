module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: ["prettier", "@typescript-eslint/eslint-plugin"],
    extends: [
        "airbnb-typescript/base",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    root: true,
    env: {
        node: true,
    },
    rules: {
        // "@typescript-eslint/interface-name-prefix": "off",
        // "@typescript-eslint/explicit-function-return-type": "off",
        // "@typescript-eslint/no-explicit-any": "off",
        // "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_[^_]+_$" }],
        "@typescript-eslint/camelcase": "off",
        "prettier/prettier": "error",
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    },
    overrides: [
        {
            files: ["tests/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true
            }
        }
    ]
};