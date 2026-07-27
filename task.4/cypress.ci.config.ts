import { defineConfig } from "cypress";
import baseConfig from "./cypress.config";

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    video: true,
    videosFolder: "cypress/reports/videos",
    screenshotsFolder: "cypress/reports/screenshots",
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
