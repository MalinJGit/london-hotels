import React from 'react';
import './HotelCardStyle.css';

interface HotelCardProps {
  name: string;
  address: string;
  highlights: string[];
  stars: number;
  description: string;
  imageUrl: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, address, highlights, stars, description, imageUrl }) => {
  const starIcons = Array.from({ length: stars }, (_, index) => (
    <span key={index} className="star-icon">★</span>
  ));

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
        <p className="hotel-card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
