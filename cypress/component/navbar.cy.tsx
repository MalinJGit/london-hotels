describe('Navbar Component', () => {
  beforeEach(() => {
    // Besök sidan där navbar-komponenten renderas
    cy.visit('http://localhost:5173');
  });

  it('should have a link to the "Om oss" page', () => {
    // Kontrollera att länken till "Om oss" finns
    cy.get('a').contains('Om oss').should('have.attr', 'href', '/about');
  });

  it('should have a link to the signup page', () => {
    // Kontrollera att länken till "Skapa konto" finns
    cy.get('a').contains('Skapa konto').should('have.attr', 'href', '/signup');
  });
});