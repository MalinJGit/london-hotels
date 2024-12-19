import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

// Middleware för att hantera CORS och JSON
app.use(cors({
  origin: 'http://localhost:5173', // Justera för din frontend URL
}));
app.use(express.json()); // Middleware för att hantera inkommande JSON-data

// Konfigurera RapidAPI URL och headers
const API_KEY = process.env.RAPIDAPI_KEY;
const HOST = 'tripadvisor16.p.rapidapi.com';

// PostgreSQL pool för databasanslutning
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// Skapa användare och hash lösenord
app.post('/api/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email och lösenord krävs' }); // Skicka JSON med meddelande
  }

  // Kolla om användaren redan finns
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Användare finns redan' }); // Skicka JSON med meddelande
    }

    // Hash lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lägg till användaren till databasen
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    const newUserId = result.rows[0].id;
    res.status(201).json({ message: `Användare skapad med ID: ${newUserId}` }); // Skicka JSON med resultat
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Internt serverfel: ${error.message}` }); // Skicka JSON vid serverfel
    } else {
      res.status(500).json({ message: 'Internt serverfel' }); // Skicka JSON vid serverfel
    }
  }
});

// Logga in användare och skapa JWT
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Felaktig email eller lösenord' }); // Skicka JSON vid fel
    }

    const user = rows[0];

    // Kontrollera lösenord
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Felaktig email eller lösenord' }); // Skicka JSON vid fel
    }

    // Skapa JWT-token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // Giltighetstid för token
    });

    res.json({ token }); // Skicka JSON med token
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internt serverfel' }); // Skicka JSON vid serverfel
  }
});

// Middleware för att skydda rutter och validera JWT
const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied' }); // Skicka JSON vid accessfel
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    (req as Request & { user?: { userId: number } }).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' }); // Skicka JSON vid tokenfel
  }
};

// Använda skyddad rutt för att hämta hotell
app.get('/api/hotels', protect, async (req: Request & { user?: { userId: number } }, res: Response) => {
  const latitude = req.query.latitude || '51.509865'; // Standardvärde för London
  const longitude = req.query.longitude || '-0.118092';
  const pageNumber = req.query.pageNumber || '1';
  const currencyCode = req.query.currencyCode || 'USD';

  console.log('Authenticated User ID:', req.user?.userId); // För debug

  try {
    const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation', {
      params: {
        latitude,
        longitude,
        pageNumber,
        currencyCode,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST,
      },
    });

    res.json(response.data); // Skicka hotellistans data tillbaka till frontend
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Error fetching hotels' }); // Skicka JSON vid fel
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
