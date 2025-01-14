describe('User Registration for London-hotels', () => {
  it('should allow a new user to register and save data in the database', () => {
    // Gå till registreringssidan
    cy.visit('/register');

    // Fyll i e-post och lösenord
    const email = 'testuser@example.com';
    const password = 'password123';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    // Klicka på registreringsknappen
    cy.get('button[type="submit"]').click();

    // Kontrollera att användaren får en bekräftelse på registreringen
    cy.contains('Registration successful').should('exist');

    // Kontrollera via API att användaren är sparad i databasen
    cy.request('GET', 'http://localhost:5000/api/users').then((response) => {
      expect(response.status).to.eq(200);

      // Kontrollera att användaren finns i listan
      const user = response.body.find((user) => user.email === email);
      expect(user).to.exist;
      expect(user).to.have.property('email', email);
    });
  });
});
