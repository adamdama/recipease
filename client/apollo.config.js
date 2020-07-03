const pkg = require("./package.json");
require("./env.config");

module.exports = {
    client: {
        service: {
            name: pkg.name,
            // URL to the GraphQL API
            url: `${process.env.VUE_APP_GRAPHQL_URI}`
        },
        // Files processed by the extension
        includes: ["src/**/*.{js,jsx,ts,tsx,vue,gql}"]
    }
};
