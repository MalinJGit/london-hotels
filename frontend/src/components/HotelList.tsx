import React from 'react';
import HotelCard from './HotelCard';

interface HotelListProps {
  hotels: any[];
  favorites: number[];
  onFavorite: (hotelId: number) => void;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, favorites, onFavorite }) => {
  function handleFavorite(hotelId: number): void {
    onFavorite(hotelId);
  }

  return (
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
            onFavorite={() => handleFavorite(hotel.hotel_id)}
            isFavorited={favorites.includes(hotel.hotel_id)}
          />
        ))}
    </div>
  );
};



export default HotelList;