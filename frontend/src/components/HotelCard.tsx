import React from 'react';

interface Hotel {
  id: number;
  name: string;
  price: number;
  location: string;
  rating: number;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-info">
        <h2>{hotel.name}</h2>
        <p>{hotel.location}</p>
        <div className="hotel-rating">
          <span>⭐ {hotel.rating}</span>
        </div>
        <p className="hotel-price">Från {hotel.price} SEK per natt</p>
      </div>
    </div>
  );
};

export default HotelCard;
