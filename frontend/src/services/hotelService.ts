import axios from 'axios';

export const fetchHotels = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:5003/api/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.hotels;
  } catch (error: unknown) {
    if (error instanceof Error) { 
      throw new Error('Error fetching hotels: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};