import axios from 'axios';

export const fetchHotels = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:5003/api/hotels', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Could not fetch hotels');
  }
};