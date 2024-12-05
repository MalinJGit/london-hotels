import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import HotelList from '../components/HotelList';
import { fetchHotels } from '../services/hotelService';
import '../styles/HomePage.css';

// Interface för hotell
interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
}

// Interface för filter
interface Filters {
  priceRange: [number, number];
  rating: number;
  location: string;
}

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); // Lista med alla hotell
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]); // Filtrerade hotell
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 500],
    rating: 0,
    location: '',
  }); // Aktiva filter
  const [loading, setLoading] = useState<boolean>(true); // Laddningsstatus
  const [error, setError] = useState<string | null>(null); // Felhantering

  // Hämta hotell från API vid komponentens första render
  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedHotels = await fetchHotels();
        setHotels(fetchedHotels);
        setFilteredHotels(fetchedHotels); // Visa alla hotell initialt
      } catch (err) {
        setError('Kunde inte hämta hotell, försök igen senare.');
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  // Hantera filterändringar
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);

    // Filtrera hotellen baserat på de nya filtren
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
    <div className="homepage">
      <header className="homepage-header">
        <h1>Hitta Hotell i London</h1>
      </header>

      <main className="homepage-main">
        {loading && <p>Laddar hotell...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <HotelList hotels={filteredHotels} />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;