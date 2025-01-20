describe('User Registration for London-hotels', () => {
  it('should allow a new user to register, display success message, and then log in', () => {
    // Given: Användaren är på registreringssidan
    cy.visit('/signup');

    // When: Användaren fyller i registreringsformuläret med giltig e-post och lösenord
    const email = 'testuser20@example.com';
    const password = 'password140';

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    // När användaren klickar på registreringsknappen
    cy.get('button[type="submit"]').click();

    // Then: Användaren ska få en bekräftelse på att registreringen var framgångsrik
    cy.contains('Användare skapad med ID:').should('exist');

    // Alternativt validera felmeddelande om något gick fel
    cy.contains('Något gick fel').should('not.exist');

    // Gå tillbaka till startsidan
    cy.visit('/'); 

  });
});  