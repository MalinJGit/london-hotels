const { defineConfig } = require("cypress");

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },

  component: {
    specPattern: [
      "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/**/*.feature",
    ],
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});