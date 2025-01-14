describe('User Registration for London-hotels', () => {
  it('should allow a new user to register and save data in the database', () => {
    // Given: Användaren är på registreringssidan
    cy.visit('/register');

    // When: Användaren fyller i registreringsformuläret med giltig e-post och lösenord
    const email = 'testuser@example.com';
    const password = 'password123';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    // När användaren klickar på registreringsknappen
    cy.get('button[type="submit"]').click();

    // Then: Användaren ska få en bekräftelse på att registreringen var framgångsrik
    cy.contains('Registration successful').should('exist');

    // Then: Kontrollera via API att användaren finns i databasen
    cy.request('GET', 'http://localhost:5000/api/users').then((response) => {
      expect(response.status).to.eq(200);

      // Kontrollera att användaren finns i listan
      const user = response.body.find((user: any) => user.email === email);
      expect(user).to.exist;
      expect(user).to.have.property('email', email);
    });
  });
});