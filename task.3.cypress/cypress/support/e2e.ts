// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import "allure-cypress";

// The site now loads a cross-origin third-party script (likely a chat/AI
// widget calling the new Chrome Prompt API, document.modelContext) that
// throws an uncaught error on most pages. Cross-origin scripts without a
// CORS header surface as an opaque "Script error." with no stack trace -
// Cypress can't tell us more, and neither can we, so it can't be a real
// assertion target. Ignore only that specific noise; a real bug in our
// own page code still fails the test with an actual message/stack trace.
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('document.modelContext cannot be used when document.domain is enabled') ||
    err.message === 'Script error.'
  ) {
    return false;
  }
});