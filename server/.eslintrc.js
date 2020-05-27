module.exports = {
    extends: [
        // TODO add TS
        "prettier",
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    plugins: [
        "prettier"
    ],
    rules: {
        "prettier/prettier": "error",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};

