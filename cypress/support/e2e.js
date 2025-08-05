
// Import commands.js using ES2015 syntax:
import './commands'

// This will catch uncaught exceptions globally and prevent Cypress from failing the test
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'classList')")) {
    // returning false here prevents Cypress from failing the test
    return false
  }
  // let other exceptions fail the test
})
