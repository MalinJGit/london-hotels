import React from 'react';
import HotelCard from './HotelCard';

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
  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.hotel_id}
          name={hotel.name}
          address={hotel.address}
          highlights={hotel.highlights}
          stars={hotel.stars}
          description={hotel.description}
          imageUrl={hotel.image_url}
        />
      ))}
    </div>
  );
};

export default HotelList;