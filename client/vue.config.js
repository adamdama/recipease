const path = require("path");

module.exports = {
    devServer: {
        open: true,
        hot: true
    },
    configureWebpack: {
        resolve: {
            extensions: [".ts", ".js", ".vue", ".json", ".gql", ".graphql"],
            alias: {
                "@": path.resolve(__dirname, "src/")
            }
        }
    },
    chainWebpack: (config) => {
        // Support for GQL files
        const cacheDirectory = path.resolve("node_modules/.cache/cache-loader");
        const gqlRule = config.module.rule("gql").test(/\.(gql|graphql)$/);
        gqlRule
            .use("cache-loader")
            .loader("cache-loader")
            .options({ cacheDirectory })
            .end();

        gqlRule.use("gql-loader").loader("graphql-tag/loader").end();

        config.module
            .rule("eslint")
            .use("eslint-loader")
            .loader("eslint-loader")
            .tap((options) => {
                options.extensions = [
                    ...options.extensions,
                    ".gql",
                    ".graphql"
                ];
                return options;
            });
    }
};
