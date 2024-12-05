import React from 'react';
import HotelCard from './HotelCard';

interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
}

interface HotelListProps {
  hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div>
      {hotels.length > 0 ? (
        hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      ) : (
        <p>Inga hotell matchar dina filter.</p>
      )}
    </div>
  );
};

export default HotelList;
