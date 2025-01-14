describe('HotelCard Component for London-hotels', () => {
  it('should render hotel details correctly and show an image', () => {
    const hotel = {
      id: 1,
      name: 'Claridge\'s',
      price: 4500,
      location: 'Brook Street, Mayfair, London W1K 4HR',
      rating: 5,
      imageUrl: 'https://example.com/image.jpg'
    };

    // Given: Användaren är inloggad och på sidan där hotellkort visas
    cy.visit('/logged-in');

    // When: Användaren kollar på hotelldetaljerna
    cy.get('.hotel-card').first().should('contain.text', hotel.name);
    cy.get('.hotel-card').first().should('contain.text', hotel.location);
    cy.get('.hotel-card').first().should('contain.text', `${hotel.price} SEK per natt`);
    cy.get('.hotel-card img').first().should('have.attr', 'src', hotel.imageUrl);
  });
});