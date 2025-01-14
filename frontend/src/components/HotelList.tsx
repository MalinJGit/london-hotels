import React from 'react';

interface Hotel {
  id: string;
  title: string;
  primaryInfo: string;
  secondaryInfo: string;
  provider: string;
  priceForDisplay: string | null;
  strikethroughPrice: string | null;
  imageUrl?: string;
}

interface HotelListProps {
  hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div className="hotel-list">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div className="hotel-item" key={hotel.id}>
            {hotel.imageUrl ? (
              <img src={hotel.imageUrl} alt={hotel.title} className="hotel-image" />
            ) : (
              <div className="placeholder-image">Bild ej tillgänglig</div>
            )}
            <h3>{hotel.title}</h3>
            <p>{hotel.primaryInfo}</p>
            <p>{hotel.secondaryInfo}</p>
            <p><strong>Provider:</strong> {hotel.provider}</p>
            {hotel.priceForDisplay ? (
              <p><strong>Price:</strong> {hotel.priceForDisplay}</p>
            ) : (
              <p><strong>Price:</strong> Pris inte tillgänglig</p>
            )}
            {hotel.strikethroughPrice && (
              <p><s>{hotel.strikethroughPrice}</s></p>
            )}
          </div>
        ))
      ) : (
        <p>Inga hotell tillgängliga.</p>
      )}
    </div>
  );
};

export default HotelList;