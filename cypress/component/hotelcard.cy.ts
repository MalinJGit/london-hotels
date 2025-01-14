describe('HotelCard Component', () => {
  beforeEach(() => {
    // Besök sidan där hotelcard-komponenten renderas
    cy.visit('http://localhost:5173/hotels'); // Eller den sida där HotelCard visas
  });

  it('should render hotel details correctly', () => {
    const hotel = {
      name: 'Claridge\'s',
      location: 'Brook Street, Mayfair, London W1K 4HR',
      price: 4500,
      rating: 5,
      imageUrl: 'https://example.com/image.jpg'
    };

    // Kontrollera att hotelcard-komponenten visar rätt detaljer
    cy.get('.hotel-card').should('contain.text', hotel.name);
    cy.get('.hotel-card').should('contain.text', hotel.location);
    cy.get('.hotel-card').should('contain.text', `Från ${hotel.price} SEK per natt`);
    cy.get('.hotel-card img').should('have.attr', 'src', hotel.imageUrl);
  });
});