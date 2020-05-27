module.exports = {
    env: {
        node: true
    },
    extends: [
        "plugin:vue/strongly-recommended",
        "@vue/airbnb",
        "@vue/prettier",
        "@vue/typescript/recommended",
        "@vue/prettier/@typescript-eslint"
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser",
        sourceType: "module" // allow the use of imports statements
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/no-unused-vars": "error",
        "import/prefer-default-export": "off"
    },
    plugins: ["prettier"],
    overrides: [
        {
            files: ["tests/unit/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true
            }
        }
    ]
};
