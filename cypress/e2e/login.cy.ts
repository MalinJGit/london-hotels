describe('User Login for London-hotels', () => {
    it('should allow a registered user to log in', () => {
      // Given: Användaren är på inloggningssidan
      cy.visit('/login');
  
      // When: Användaren fyller i inloggningsformuläret med registrerad e-post och lösenord
      const email = 'testuser@example.com';
      const password = 'password123';
  
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
  
      // När användaren klickar på inloggningsknappen
      cy.get('button[type="submit"]').click();
  
      // Then: Användaren ska omdirigeras till dashboard-sidan
      cy.url().should('include', '/dashboard');
  
      // Then: Användaren ska kunna se sin e-post eller användarnamn på dashboard
      cy.contains(email).should('exist');
    });
  });  