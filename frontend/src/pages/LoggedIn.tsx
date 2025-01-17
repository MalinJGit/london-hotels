import React, { useState, useEffect } from 'react';
import HotelList from '../components/HotelList';
import { fetchHotels } from '../services/hotelService';
import '../styles/LoggedIn-styles.css';
import '../styles/Footer-styles.css';
import '../styles/Button.css';

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
      <h1>Welcome to your account</h1>
      <p>You can click on the below button to see available hotels in London. There are a range of different hotels who all have different prices and qualities. If you like a hotel you can click on the "save-button" and it will be saved to your account.</p>
      <button className="showHotels" onClick={handleShowHotels}>See available hotels</button>

      {loading ? (
        <p>Loading hotel...</p>
      ) : error ? (
        <p>{error}</p>
      ) : showHotels ? (
        <HotelList hotels={hotels} />
      ) : null}
    </div>
  );
};

export default LoggedIn;