// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

module.exports = {
    client: {
        service: {
            name: pkg.name,
            // URL to the GraphQL API
            url: "http://localhost:3000/graphql"
        },
        // Files processed by the extension
        includes: ["src/**/*.{js,jsx,ts,tsx,vue,gql}"]
    }
};
