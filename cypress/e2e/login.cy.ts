describe('User Login for London-hotels', () => {
    it('should allow a registered user to log in', () => {
      // Gå till inloggningssidan
      cy.visit('/login');
  
      // Fyll i e-post och lösenord
      const email = 'testuser@example.com';
      const password = 'password123';
  
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
  
      // Klicka på inloggningsknappen
      cy.get('button[type="submit"]').click();
  
      // Kontrollera att användaren omdirigeras till inloggningssidan (profil)
      cy.url().should('include', '/dashboard');
  
      // Kontrollera att rätt användarnamn eller e-post visas på sidan
      cy.contains(email).should('exist');
    });
  });
  