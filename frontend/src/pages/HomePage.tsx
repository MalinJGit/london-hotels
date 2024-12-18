import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from '../components/HotelList';
import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kontrollera om användaren är inloggad
  const [token, setToken] = useState<string | null>(null); // Lagra användarens token

  // Kontrollera om användaren är inloggad
  useEffect(() => {
    const savedToken = localStorage.getItem('token'); // Hämta token från localStorage
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Funktion för att hämta hotell
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
          Authorization: `Bearer ${token}`, // Lägg till användarens token i headers
        },
      });

      setHotels(response.data?.hotels || []); // Sätt hotellen från API-svaret
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API Error:', error.response.data); // Loggar detaljerad API-fel
          if (error.response.status === 401) {
            setError('Unauthorized - Kontrollera din token eller logga in igen.');
          } else if (error.response.status === 429) {
            setError('För många förfrågningar - Försök igen senare.');
          } else {
            setError('Fel vid hämtning av hotellinformation.');
          }
        } else {
          console.error('Unexpected error:', error);
          setError('Ett oväntat fel uppstod.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Hämta hotell när användaren är inloggad
  useEffect(() => {
    if (isLoggedIn) {
      fetchHotels();
    }
  }, [isLoggedIn]);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Header
          image1="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg"
          image2="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg"
          image3="https://cdn.pixabay.com/photo/2015/11/21/15/15/telephone-1055044_1280.jpg"
        />
        <h1>Discover the Magic of London!</h1>
        <p>London is not just a city; it's an experience. A vibrant mix of history, culture, and modernity, it offers something for everyone. Whether you're wandering through the iconic streets of Westminster, marveling at the grandeur of Buckingham Palace, or exploring the artistic gems in the Tate Modern, London invites you to step into a world where the past meets the future.</p>
      <h2>Discover the Best Hotels in London</h2>
      <p>London is home to a vast array of hotels, from luxurious five-star accommodations to charming boutique stays. Whether you're visiting for business, leisure, or a special occasion, there's a perfect place for you to call home during your time in the city.

      Create an account or log in to explore a curated list of available hotels in London. Once you're logged in, you'll have access to the best rates, availability updates, and a seamless booking experience. Don't miss out on finding your ideal stay in this vibrant, world-class city!</p>
      </header>

       {!isLoggedIn ? (
        <div>
          <p>Vänligen logga in för att se tillgängliga hotell.</p>
          <button
            onClick={() => {
              // Simulerar inloggning och sätter en dummy-token
              const dummyToken = 'your-example-token'; // Ersätt med riktig inloggningslogik
              localStorage.setItem('token', dummyToken);
              setToken(dummyToken);
              setIsLoggedIn(true);
            }}
          >
            Logga in
          </button>
        </div>
      ) : loading ? (
        <p>Laddar hotell...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <HotelList hotels={hotels} />
      )}
    </div>
  );
};

export default HomePage;