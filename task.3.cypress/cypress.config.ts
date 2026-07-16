import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1440,

  viewportHeight: 900,
  allowCypressEnv: false,

  e2e: {

    baseUrl: "https://telnyx.com",
    setupNodeEvents(on, config) {
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true

    }
  },
  });