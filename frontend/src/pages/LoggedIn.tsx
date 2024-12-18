import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const LoggedIn: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]); // Spara hotelldata
  const [favorites, setFavorites] = useState<string[]>([]); // Spara favoritmarkeringar
  const [loading, setLoading] = useState(false);
//   const history = useHistory();

  useEffect(() => {
    // Hämta hotell och favoritmarkerade hotell när användaren är inloggad
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleFavorite = (hotelId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(hotelId)) {
        // Ta bort från favoriter om det redan är markerat
        return prevFavorites.filter((id) => id !== hotelId);
      } else {
        // Lägg till i favoriter
        return [...prevFavorites, hotelId];
      }
    });
  };

  return (
    <div className="logged-in">
      <h1>Välkommen till din profil</h1>

      {loading ? (
        <p>Laddar hotell...</p>
      ) : (
        <div>
          <h2>Tillgängliga hotell</h2>
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-item">
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <button onClick={() => handleFavorite(hotel.id)}>
                {favorites.includes(hotel.id) ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoggedIn;