const baseConfig = require("../.eslintrc");

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: "./tsconfig.json"
  }
};
