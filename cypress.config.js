
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.perfumenz.co.nz", 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
