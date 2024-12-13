import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5003;

// Middleware för att hantera CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Konfigurera RapidAPI URL och headers
const API_URL = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation';
const API_KEY = '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62';

// Route för att hämta hotell (eller turistattraktioner)
app.post('/api/search-location', async (req, res) => {
  try {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
        params: {
          query: 'London, uk'
        },
        headers: {
          'x-rapidapi-key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
          'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }

    const response = await axios.request(options);
    res.json(response.data); // Skicka datan tillbaka till frontend
  } catch (error) {
    console.error('Error with API request:', error);
    res.status(500).send('Error fetching hotels');
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});