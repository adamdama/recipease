/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
    devServer: {
        open: true,
        hot: true
    },
    configureWebpack: {
        resolve: {
            extensions: [".gql", ".ts", ".js", ".vue", ".json"],
            alias: {
                "@": path.resolve(__dirname, "src/")
            }
        }
    }
};
