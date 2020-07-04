const { config } = require("dotenv");
const { sync: findUpSync } = require("find-up");

config({
    path: findUpSync(".env")
});

const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = process.env;
const port = SERVER_PORT ? `:${SERVER_PORT}` : "";

// Vars for VUE APP
process.env.VUE_APP_GRAPHQL_URI = `${SERVER_PROTOCOL}://${SERVER_HOST}${port}/graphql`;
