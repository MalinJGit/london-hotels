import { When, Then, Given, Before } from '@badeball/cypress-cucumber-preprocessor'

Before(() => {
    cy.visit('http://localhost:5173/')
  })

Given('Jag är på hemsidan och ska se en text med "About us" i navbaren', () => {})


When('Jag rör datormusen över navbaren och klickar på texten "About us"', () => {
    cy.get('nav').contains('About us').should('be.visible');
})

Then('Blir då omdirigerad till en ny sida med information om skaparna', () => {
    cy.url().should('include', '/about-us');
    cy.get('h1').contains('About us').should('be.visible');
});

Then('Jag vill också kunna skapa ett konto eller logga in från About us-sidans. Därbör bör login-form vara tillgänglig', () => {
    cy.get('button').contains('Create Account').should('be.visible');
    cy.get('button').contains('Log In').should('be.visible');
  });

  Then('Det hade också varit smidigt med en "tillbaka" knapp för att snabbt komma tillbaka till startsidan', () => {
    cy.get('button').contains('Back to startpage').should('be.visible');
    cy.get('button').contains('Back to startpage').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });