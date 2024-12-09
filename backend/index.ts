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
const API_URL = 'https://tourist-attraction.p.rapidapi.com/search';
const API_KEY = '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62';

// Route för att hämta hotell (eller turistattraktioner)
app.post('/api/search-hotels', async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', '45963'); // Sök efter London
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: API_URL,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: encodedParams,
    };

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