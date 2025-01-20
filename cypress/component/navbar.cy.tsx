import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'cypress/react';
import Navbar from '../../frontend/src/components/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it('should have a link to Create account', () => {
    cy.contains('Create account').should('have.attr', 'href', '/signup');
  });

  it('should have "Log in" link in the navbar', () => {
    // Kontrollera att "Log in"-knappen finns i navbaren
    cy.contains('Log in').should('exist');
  });

  it('should show login modal when clicking "Log in" button', () => {
    // Klicka på "Log in"-knappen i navbaren
    cy.contains('Log in').click();
    
    // Kontrollera att modalen är synlig
    cy.get('div[style*="position: fixed"]').should('be.visible');
    
    // Kontrollera att modalen innehåller rätt element
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Log in');
  });
});