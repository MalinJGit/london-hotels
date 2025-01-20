// Exempel på komponenten FavoriteHotels
import React from 'react';

interface FavoriteHotelsProps {
  favoriteHotels: any[];
  favorites: number[];
  onFavorite: (hotelId: number) => void;
}

const FavoriteHotels: React.FC<FavoriteHotelsProps> = ({ favoriteHotels, favorites, onFavorite }) => {
  return (
    <div>
      {favoriteHotels.map((hotel) => (
        <div key={hotel.id} className="hotel-item">
          <h3>{hotel.name}</h3>
          <button
            onClick={() => onFavorite(hotel.id)}
            className={favorites.includes(hotel.id) ? 'favorite' : ''}
          >
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteHotels;