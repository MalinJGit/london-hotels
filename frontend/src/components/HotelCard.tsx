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
  isFavorited: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotelId,
  name,
  address,
  highlights,
  stars,
  description,
  imageUrl,
  onFavorite,
  isFavorited,
}) => {
  const handleFavoriteClick = () => {
    onFavorite(hotelId);
  };

  const starIcons = Array(stars).fill('⭐');

  return (
    <div className="hotel-card">
      <img src={imageUrl} alt={name} className="hotel-card-image" />
      <div className="hotel-card-info">
      <div className="stars">
          {starIcons && starIcons.map((star, index) => (
            <span key={index} className="star-icon">{star}</span>
          ))}
        </div>
        <h2>{name}</h2>
        <p className='hotel-card-address'>{address}</p>
        <ul className="highlights-list">
          {highlights && highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <p>{description}</p>
        <button onClick={handleFavoriteClick} className="favorite-button">
          {isFavorited ? '❤️ Unsave' : '🤍 Save'}
        </button>
      </div>
    </div>
  );
};

export default HotelCard;