import { mount } from '@cypress/react';
import Navbar from '../../frontend/src/components/Navbar';
import React from 'react';

describe('Navbar Component', () => {
  it('should render the Navbar correctly', () => {
    // Montera Navbar-komponenten
    mount(<Navbar />);

    // Kontrollera att Navbar finns i DOM
    cy.get('nav').should('exist');

    // Kontrollera att länken "Logga in" finns i navigeringen
    cy.get('a').contains('Logga in').should('exist');

    // Kontrollera att länken "Om oss" finns
    cy.get('a').contains('Om oss').should('exist');
  });

  it('should open and close the login modal when clicking on "Logga in"', () => {
    mount(<Navbar />);

    // Kontrollera att login-länken finns
    cy.get('a').contains('Logga in').should('exist');
    
    // Klicka på "Logga in" länken och kontrollera att modalen öppnas
    cy.get('a').contains('Logga in').click();
    
    // Kontrollera att modalen är synlig efter att användaren klickat på "Logga in"
    cy.get('[style*="position: fixed"]').should('be.visible');

    // Kontrollera att modalens stäng-knapp finns och kan klickas
    cy.get('button').contains('×').click();
    
    // Kontrollera att modalen stängs efter att ha klickat på stäng-knappen
    cy.get('[style*="position: fixed"]').should('not.exist');
  });

  it('should navigate to the "Skapa konto" page when clicking the "Skapa konto" link', () => {
    mount(<Navbar />);

    // Kontrollera att länken till "Skapa konto" finns och att den leder till rätt sida
    cy.get('a').contains('Skapa konto').should('have.attr', 'href', '/signup');
  });
});