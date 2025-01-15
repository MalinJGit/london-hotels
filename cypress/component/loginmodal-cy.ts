describe('Makin sure that the login modal is showing when clicked on', () => {
        beforeEach(() => {
            // Besök startsidan
            cy.visit('http://localhost:5173');
          });
  
      // Kontrollera att logga in-knappen finns
      cy.get('button[data-cy="login-button"]').should('exist').and('contain', 'Logga in');
  
      // Klicka på logga in-knappen
      cy.get('button[data-cy="login-button"]').click();
  
      // Kontrollera att modalen visas
      cy.get('div[data-cy="login-modal"]').should('exist').and('be.visible');
  
      // Kontrollera att modalen innehåller rätt element
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist').and('contain', 'Logga in');
    });
  

