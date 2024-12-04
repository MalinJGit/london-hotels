import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5001;

// Middleware för att hantera CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API route för att hämta hotell
app.get('/api/hotels', async (req, res) => {
  try {
    const response = await axios.get('https://api.hotelapi.co/v1/hotels', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY', // Ersätt med din API-nyckel
      },
    });

    // Skicka tillbaka de hämtade hotellen till frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching hotels');
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
