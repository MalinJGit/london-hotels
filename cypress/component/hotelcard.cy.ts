import React from 'react';
import { cy } from 'cypress';  // Importera cy från Cypress (om du inte har gjort det i testet)
import HotelCard from '../../frontend/src/components/HotelCard';

describe('HotelCard Component', () => {
  it('should render hotel details correctly', () => {
    const hotel = {
      id: 1,
      name: 'Claridge\'s',
      price: 4500,
      location: 'Brook Street, Mayfair, London W1K 4HR',
      rating: 5,
      imageUrl: 'https://example.com/image.jpg'
    };

    cy.mount(<HotelCard hotel={hotel} />); 

    cy.get('.hotel-card').should('contain.text', hotel.name);
    cy.get('.hotel-card').should('contain.text', hotel.location);
    cy.get('.hotel-card').should('contain.text', `${hotel.price} SEK per natt`);
    cy.get('.hotel-card img').should('have.attr', 'src', hotel.imageUrl);
  });
});