import React, { useState } from 'react';
import HotelCard from './HotelCard';
import '../index.css';

interface Hotel {
  hotel_id: number;
  name: string;
  address: string;
  highlights: string[];
  stars: number;
  description: string;
  image_url: string;
}

interface HotelListProps {
  hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavorite = (hotelId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(hotelId)
        ? prevFavorites.filter((id) => id !== hotelId)
        : [...prevFavorites, hotelId]
    );
  };

  return (
    <div className="hotel-list-container">
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.hotel_id}
            hotelId={hotel.hotel_id}
            name={hotel.name}
            address={hotel.address}
            highlights={hotel.highlights}
            stars={hotel.stars}
            description={hotel.description}
            imageUrl={hotel.image_url}
            onFavorite={handleFavorite}
            isFavorited={favorites.includes(hotel.hotel_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;