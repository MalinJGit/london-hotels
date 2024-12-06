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
        const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels', {
          headers: {
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
            'X-RapidAPI-Key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62', // Ersätt med din egen API-nyckel från RapidAPI
          },
          params: {
            dest_id: '-2092174',  // London ID (hämta via searchDestination om du inte vet det)
      search_type: 'CITY',  
      arrival_date: '2024-12-20', 
      departure_date: '2024-12-25',  
      adults: '1', 
      children_age: '0,1,17', 
      room_qty: '1', 
      price_min: '50', 
      price_max: '500', 
      sort_by: 'PRICE', 
      units: 'metric',  
      languagecode: 'en-us', 
      currency_code: 'USD',
          },
        });

        console.log('Fetched hotels:', response.data); // Logga för att se datan
        setHotels(response.data.hotels);
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