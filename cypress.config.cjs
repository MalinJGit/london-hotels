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
      addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.{ts,tsx,js}',
  },

  component: {
    specPattern: [
      "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.ts",
    ],
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});