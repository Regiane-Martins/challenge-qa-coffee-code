const { allureCypress } = require("allure-cypress/reporter");

module.exports = {
  e2e: {
    setupNodeEvents: (on, config) => {
      allureCypress(on, {
        resultsDir: "./allure-results",
      });

      return config;
    },
  },
};
