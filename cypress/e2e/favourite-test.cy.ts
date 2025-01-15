describe('Favorite mark a hotel in the list', () => {
    it('should allow a logged-in user to mark a hotel as a favorite', () => {
      // Given: Användaren loggar in
      cy.visit('/login');
      cy.get('input[type="email"]').type('testuser@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      // When: Användaren går till hotellsidan
      cy.visit('/logged-in');
  
      // Then: Hotellen ska visas
      cy.contains('Hotels List').should('exist');
  
      // When: Användaren favoritmarkerar ett hotell
      cy.get('[data-cy="favorite-button"]').first().click();
  
      // Then: Favoritknappen ska visas som markerad
      cy.get('[data-cy="favorite-button"]').first().should('have.class', 'favorited');
  
      // Kontrollera via API att hotellet är favoritmarkerat
      cy.request('GET', 'http://localhost:5003/api/favorites').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include({ hotelId: 1, userId: 123 });
      });
    });
  });
  