import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('http://localhost:5173/');
});

Given('Jag är på hemsidan och ska se en text med About us i navbaren', () => {
  cy.get('nav').contains('About us').should('be.visible');
});

When('Jag rör datormusen över navbaren och klickar på texten About us', () => {
  cy.get('nav').contains('About us').click();
});

Then('Blir då omdirigerad till en ny sida med information om skaparna', () => {
  cy.url().should('include', '/about');
  cy.get('h1').contains('About us').should('be.visible');
});

Then('Jag vill också kunna skapa ett konto eller logga in.', () => {
  cy.get('button').contains('Create Account').should('be.visible');
  cy.get('button').contains('Log in').should('be.visible');
});

Then('Jag vill också kunna gå tillbaka till startsidan via en länk i navbaren', () => {
  cy.get('nav').contains('Home').should('be.visible').click();
  cy.url().should('eq', 'http://localhost:5173/');
});