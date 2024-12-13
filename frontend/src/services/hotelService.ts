import axios from 'axios';

const API_URL = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation';
const API_KEY = '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62';

export const fetchHotels = async (query: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY,
      },
      params: {
        query: query,
      },
    });
    return response.data?.hotels || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};