import axios from 'axios';

export const fetchHotelsByLocation = async (latitude: string, longitude: string, pageNumber: string = '1', currencyCode: string = 'USD') => {
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation',
    params: {
      latitude,
      longitude,
      pageNumber,
      currencyCode,
    },
    headers: {
      'x-rapidapi-key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
