import React, { useState } from 'react';
import { fetchHotelsByLocation } from '../services/hotelService'; // Använd den nya funktionen
import HotelList from '../components/HotelList';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Hantera sökningen efter hotell i London
  const handleSearch = async () => {
    setLoading(true);
    try {
      // Latitude och longitude för London
      const latitude = '51.509865';
      const longitude = '-0.118092';

      const results = await fetchHotelsByLocation(latitude, longitude);
      setHotels(results?.hotels || []); // Sätt hotellen från resultatet
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]); // Återställ till tom lista vid fel
    } finally {
      setLoading(false);
    }
  };

  // Ladda hotell när sidan visas
  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Header 
          image1="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg"
          image2="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg"
          image3="https://cdn.pixabay.com/photo/2015/11/21/15/15/telephone-1055044_1280.jpg"
        />
        <h1>Hotellsök i London</h1>
        <SearchBar onSearch={handleSearch} /> {/* Sök-knapp om användaren vill uppdatera */}
      </header>
      {loading ? (
        <p>Laddar...</p>
      ) : (
        <HotelList hotels={hotels} />
      )}
    </div>
  );
};

export default HomePage;