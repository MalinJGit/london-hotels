import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from '../components/HotelList';
import '../styles/LoggedIn-styles.css';

const LoggedIn: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [favorites, setFavorites] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError('Ingen giltig token hittades. Logga in för att fortsätta.');
    }
  }, []);

  const fetchHotels = async () => {
    if (!token) {
      setError('Ingen giltig token hittades. Logga in för att fortsätta.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/hotels', {
        params: {
          latitude: '51.509865',
          longitude: '-0.118092',
          pageNumber: 1,
          currencyCode: 'USD',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHotels(response.data?.hotels || []); 
      console.error('Error fetching hotels:', error);
      setError('Fel vid hämtning av hotellinformation.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHotels();
    }
  }, [token]);

  return (
    <div className="logged-in">
      <h1>Välkommen till din profil</h1>

      {loading ? (
        <p>Laddar hotell...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <HotelList hotels={hotels} />
      )}
    </div>
  );
};

export default LoggedIn;