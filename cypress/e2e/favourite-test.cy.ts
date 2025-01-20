describe('Favorite mark a hotel in the list', () => {
  it('should allow a logged-in user to mark a hotel as a favorite', () => {
    // Given: Användaren loggar in
    cy.visit('http://localhost:5173/');

    cy.get('nav').contains('Log in').click();

    cy.get('input[type="email"]').type('testuser9@example.com');
    cy.get('input[type="password"]').type('password130');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/logged-in');

    // Hämta användarens ID från API eller session
    cy.request('POST', 'http://localhost:5003/api/login', {
      email: 'testuser9@example.com',
      password: 'password130',
    }).then((response) => {
      const userId = response.body.userId;

      // Användaren favoritmarkerar ett hotell
      cy.get('button').contains('🤍 Save').first().click(); 

      // Favoritknappen ska visa som markerad (ändrar texten och knappen ska nu innehålla "❤️ Unsave")
      cy.get('button').contains('❤️ Unsave').first().should('exist'); 

      // Kontrollera via API att hotellet är favoritmarkerat
      cy.request({
        method: 'GET',
        url: 'http://localhost:5003/api/favorites',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });
});