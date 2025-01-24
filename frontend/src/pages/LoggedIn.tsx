import React, { useState, useEffect } from 'react';
import HotelList from '../components/HotelList';
import FavoriteHotels from '../pages/FavoriteHotels';
import { fetchHotels, fetchFavorites, addFavorite, deleteFavorite } from '../services/hotelService';
import '../styles/LoggedIn-styles.css';
import '../styles/Footer-styles.css';
import '../styles/Button.css';

const LoggedIn: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError('Ingen giltig token hittades. Logga in för att fortsätta.');
    }
  }, []);

  // Hämta favoriter när token finns
  useEffect(() => {
    const fetchFavoritesFromBackend = async () => {
      if (token) {
        try {
          const favoritesData = await fetchFavorites(token);
          console.log('Fetched favorite hotels:', favoritesData);
          setFavorites(favoritesData || []); 
        } catch (error) {
          setError('Fel vid hämtning av favoriter.');
        }
      }
    };
    fetchFavoritesFromBackend();
  }, [token]);

  // Hämta hotell från backend när användaren är inloggad
  useEffect(() => {
    const fetchHotelsFromDatabase = async () => {
      if (!token) {
        setError('Ingen giltig token hittades. Logga in för att fortsätta.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Hämtar hotell från backend
        const hotelsData = await fetchHotels(token);
        setHotels(hotelsData || []);
      } catch (err) {
        setError('Fel vid hämtning av hotellinformation.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHotelsFromDatabase();
    }
  }, [token]);


  const handleFavorite = async (hotelId: number) => {
    if (token) {
      if (favorites.includes(hotelId)) {
        try {
          await deleteFavorite(hotelId, token); // Ta bort favorit från backend
          setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== hotelId)); // Uppdatera state

        
          setHotels((prevHotels) => [
            ...prevHotels,
            hotels.find((hotel) => hotel.id === hotelId) || {},
          ]);
        } catch (error) {
          setError('Fel vid borttagning av favorit.');
        }
      } else {
        try {
          await addFavorite(hotelId, token);
          setFavorites((prevFavorites) => [...prevFavorites, hotelId]); // Uppdatera state med nya favoriter

         
          setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== hotelId));
        } catch (error) {
          setError('Fel vid tillägg av favorit.');
        }
      }
    } else {
      setError('Token saknas, logga in igen.');
    }
  };

  const favoriteHotels = hotels.filter((hotel) => favorites.includes(hotel.id));
  const otherHotels = hotels.filter((hotel) => !favorites.includes(hotel.id));

  return (
    <div className="logged-in">
      <h1>Welcome to your account</h1>
      <p>
        You can see available hotels in London right here. There are a range of different hotels
        with various prices and qualities. If you like a hotel, click on the "save" button to add it
        to your favorites.
      </p>

      {loading ? (
        <p>Loading hotel...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {favoriteHotels.length > 0 && (
            <div>
              <h2>Your Favorites</h2>
              <FavoriteHotels
                favoriteHotels={favoriteHotels}
                favorites={favorites}
                onFavorite={handleFavorite}
              />
            </div>
          )}

          {otherHotels.length > 0 && (
            <div>
              <h2>Available hotels:</h2>
              <HotelList
                hotels={otherHotels}
                favorites={favorites}
                onFavorite={handleFavorite}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoggedIn;