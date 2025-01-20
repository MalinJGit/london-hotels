describe('User Login for London-hotels', () => {
  it('should allow a registered user to log in via the navbar and navigate to logged-in page', () => {
    // Användaren är på startsidan
    cy.visit('http://localhost:5173/');

    // Användaren klickar på "Log in"-knappen i navbaren
    cy.get('nav').contains('Log in').click();


    // Fyll i inloggningsformuläret med registrerad e-post och lösenord
    const email = 'testuser9@example.com';
    const password = 'password130';

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    // När användaren klickar på inloggningsknappen
    cy.get('button[type="submit"]').click();

    // Användaren omdirigeras till /logged-in
    cy.url().should('include', '/logged-in'); 

    // Kontrollera att "Welcome to your account" visas på den inloggade sidan
    cy.contains('Welcome to your account').should('exist');
  });
});