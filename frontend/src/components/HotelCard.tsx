import React from 'react';
import './HotelCardStyle.css';

interface HotelCardProps {
  hotelId: number;
  name: string;
  address: string;
  highlights: string[];
  stars: number;
  description: string;
  imageUrl: string;
  onFavorite: (hotelId: number) => void;
  isFavorited?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotelId, name, address, highlights, stars, description, imageUrl, onFavorite, isFavorited = false }) => {
  const starIcons = Array.from({ length: stars }, (_, index) => (
    <span key={index} className="star-icon">★</span>
  ));

  const handleFavoriteClick = () => {
    onFavorite(hotelId);
  };

  return (
    <div className="hotel-card">
      <img src={imageUrl} alt={name} className="hotel-card-image" />
      <div className="hotel-card-stars">
        {starIcons}
      </div>
      <div className="hotel-card-info">
        <h2 className="hotel-card-name">{name}</h2>
        <p className="hotel-card-address">{address}</p>
        <div className="hotel-card-highlights">
          <h4>Highlights:</h4>
          <ul>
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <p className="hotel-card-description">{description}</p>
        <button
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
        >
          {isFavorited ? 'Unfavorite' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default HotelCard;