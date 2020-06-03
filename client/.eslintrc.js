const baseConfig = require("../.eslintrc");

module.exports = {
    ...baseConfig,
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
        sourceType: "module"
    },
    parser: undefined
};
