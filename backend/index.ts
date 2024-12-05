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
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: '-2092174',  // London ID (hämta via searchDestination om du inte vet det)
      search_type: 'CITY',  
      arrival_date: '2024-12-20', 
      departure_date: '2024-12-25',  
      adults: '1', 
      children_age: '0,1,17', 
      room_qty: '1', 
      price_min: '50', 
      price_max: '500', 
      sort_by: 'PRICE', 
      units: 'metric',  
      languagecode: 'en-us', 
      currency_code: 'USD', 
    },
    headers: {
      'x-rapidapi-key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    }
  };

  try {
    // Skickar förfrågan till API:t
    const response = await axios.request(options);
    console.log(response.data);  // Här kan du se resultatet

    // Skickar tillbaka svaret till frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);  // Fångar eventuella fel
    res.status(500).send('Error fetching hotels');
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});