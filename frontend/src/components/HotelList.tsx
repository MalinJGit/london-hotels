import React from 'react';

interface HotelListProps {
  hotels: any[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <ul>
      {hotels.map((hotel) => (
        <li key={hotel.id}>{hotel.name}</li>
      ))}
    </ul>
  );
};

export default HotelList;
