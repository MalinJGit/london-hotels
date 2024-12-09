import React, { useState } from 'react';
import { fetchHotels } from '../services/hotelService';
import HotelList from '../components/HotelList';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results = await fetchHotels(query);
    setHotels(results);
    setLoading(false);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Header 
          image1="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg"
          image2="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg"
          image3="https://cdn.pixabay.com/photo/2015/11/21/15/15/telephone-1055044_1280.jpg"
        />
        <h1>Hotellsök i London</h1>
        <SearchBar onSearch={handleSearch} />
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