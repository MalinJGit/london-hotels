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

export const fetchFavorites = async (token: string) => {
  try {
    const response = await axios.get('/api/favorites/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  // Returnera favoriter som en lista
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Could not fetch favorites');
  }
};

// Lägg till en favorit
export const addFavorite = async (hotel_id: number, token: string) => {
  try {
    console.log('Skickar request till backend med hotel_id:', hotel_id);
    const response = await axios.post('http://localhost:5003/api/favorites', { hotel_id }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
    });
    console.log('Response från backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
   
    if (error.response && error.response.status === 404) {
      console.error('404: Endpoint not found:', error.response.config.url);
    }
    if (error.response && error.response.status === 401) {
       console.error('401: Unauthorized:', error.response.data.message);
    }
    throw error; 
  }
};

// Ta bort en favorit
export const deleteFavorite = async (hotel_id: number, token: string) => {
  try {
    const response = await axios.delete(`http://localhost:5003/api/favorites/${hotel_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting favorite:', error);
    if (error.response && error.response.status === 404) {
        console.error('404: Endpoint not found:', error.response.config.url);
      }
      if (error.response && error.response.status === 401) {
         console.error('401: Unauthorized:', error.response.data.message);
      }
    throw new Error('Could not delete favorite');
  }
};