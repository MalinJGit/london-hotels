describe('User Registration for London-hotels', () => {
  it('should allow a new user to register and display success message', () => {
    // Given: Användaren är på registreringssidan
    cy.visit('/register');

    // When: Användaren fyller i registreringsformuläret med giltig e-post och lösenord
    const email = 'testuser@example.com';
    const password = 'password123';

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    // När användaren klickar på registreringsknappen
    cy.get('button[type="submit"]').click();

    // Then: Användaren ska få en bekräftelse på att registreringen var framgångsrik
    cy.contains('Registration successful').should('exist');

    // Alternativt validera felmeddelande om något gick fel
    cy.contains('Något gick fel').should('not.exist');

    // Kontrollera via API att användaren har registrerats
    cy.request('GET', 'http://localhost:5003/api/users').then((response) => {
      expect(response.status).to.eq(200);

      // Kontrollera att användaren finns i listan
      const user = response.body.find((user: any) => user.email === email);
      expect(user).to.exist;
      expect(user).to.have.property('email', email);
    });
  });
});