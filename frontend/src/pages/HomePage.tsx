import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import HotelList from '../components/HotelList';
import { fetchHotels } from '../services/hotelService';

interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    imageUrl: string;
  }
  
  interface Filters {
    priceRange: [number, number];
    rating: number;
    location: string;
  }  

const HomePage: React.FC = () => {
  // State för hotell och filter
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 500],
    rating: 0,
    location: '',
  }); 

  // Hämta hotell från backend vid laddning
  useEffect(() => {
    const loadHotels = async () => {
      const fetchedHotels = await fetchHotels();
      setHotels(fetchedHotels);
      setFilteredHotels(fetchedHotels); // Visa alla hotell initialt
    };
    loadHotels();
  }, []);

  // Hantera uppdatering av filter
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Filtrera hotellen baserat på användarens val
    const filtered = hotels.filter((hotel) => {
      const withinPrice =
        hotel.price >= newFilters.priceRange[0] &&
        hotel.price <= newFilters.priceRange[1];
      const matchesRating = hotel.rating >= newFilters.rating;
      const matchesLocation =
        newFilters.location === '' ||
        hotel.location.toLowerCase().includes(newFilters.location.toLowerCase());
      return withinPrice && matchesRating && matchesLocation;
    });
    setFilteredHotels(filtered);
  };

  return (
    <div>
      <h1>Hitta Hotell i London</h1>
      {/* FilterBar komponent */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* HotelList komponent */}
      <HotelList hotels={filteredHotels} />
    </div>
  );
};

export default HomePage;
