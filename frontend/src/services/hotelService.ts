import axios from 'axios';

export const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/hotels'); // Din backend
      console.log('Fetched hotels:', response.data);  // Lägg till denna loggning för att visa datan från backend
      return response.data;  // Returnera datan
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw new Error('Kunde inte hämta hotell.');
    }
  };
  