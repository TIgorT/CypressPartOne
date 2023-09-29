const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    retries: {
      openMode: 1,
      runMode: 2,
    },
    env: {
      viewportWidth: 320,
      viewportHeight: 480,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
