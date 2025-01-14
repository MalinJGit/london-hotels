import React, { useState, useEffect } from 'react';
import HotelList from '../components/HotelList';
import { fetchHotels } from '../services/hotelService';
import '../styles/LoggedIn-styles.css';

const LoggedIn: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showHotels, setShowHotels] = useState(false); 

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError('Ingen giltig token hittades. Logga in för att fortsätta.');
    }
  }, []);

  // Hämta hotell från databasen
  const fetchHotelsFromDatabase = async () => {
    if (!token) {
      setError('Ingen giltig token hittades. Logga in för att fortsätta.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // hämtar hotell från backend
      const hotelsData = await fetchHotels(token);


      setHotels(hotelsData || []);
    } catch (err) {
      setError('Fel vid hämtning av hotellinformation.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowHotels = () => {
    setShowHotels(true);
    fetchHotelsFromDatabase();
  };

  return (
    <div className="logged-in">
      <h1>Välkommen till din profil</h1>
      <button onClick={handleShowHotels}>Se tillgängliga hotell</button>

      {loading ? (
        <p>Laddar hotell...</p>
      ) : error ? (
        <p>{error}</p>
      ) : showHotels ? (
        <HotelList hotels={hotels} />
      ) : (
        <p>Klicka på knappen för att visa tillgängliga hotell.</p>
      )}
    </div>
  );
};

export default LoggedIn;