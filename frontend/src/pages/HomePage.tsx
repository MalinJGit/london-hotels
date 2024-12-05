import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from '../components/HotelList';
import Header from '../components/Header';
import '../styles/HomePage.css';

interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  location: string;
}

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5001/api/hotels');
        console.log('Fetched hotels:', response.data); // Logga för att se datan
        setHotels(response.data);
      } catch (err) {
        setError('Kunde inte hämta hotell, försök igen senare.');
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Header 
          image1="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg"
          image2="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg"
          image3="https://cdn.pixabay.com/photo/2015/11/21/15/15/telephone-1055044_1280.jpg"
        />
        <h1>Hitta Hotell</h1>
      </header>

      <main className="homepage-main">
        {loading && <p>Laddar hotell...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <HotelList hotels={hotels} />
        )}
      </main>
    </div>
  );
};

export default HomePage;