import axios from 'axios';

const API_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels';
const API_KEY = '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62';

export const fetchHotels = async (query: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY,
      },
      params: {
        dest_id: '-2092174',
        search_type: 'CITY',
        adults: '1',
        search_query: query,
      },
    });
    return response.data?.hotels || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};