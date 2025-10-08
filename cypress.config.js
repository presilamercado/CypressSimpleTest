
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.perfumenz.co.nz", 
    projectId: "h4572x",
    //npx cypress run --record --key fa549b86-554a-4cab-beb7-3dd1ba21dcb0
    //fa549b86-554a-4cab-beb7-3dd1ba21dcb0
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
