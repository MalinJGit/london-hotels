import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

// Middleware för att hantera CORS och JSON
app.use(cors({
  origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

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
    return res.status(400).json({ message: 'Email och lösenord krävs' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Användare finns redan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id',
      [email, hashedPassword]
    );

    const newUserId = result.rows[0].user_id;
    res.status(201).json({ message: `Användare skapad med ID: ${newUserId}` });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
});

// Logga in användare och skapa JWT
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email och lösenord krävs' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Felaktig email eller lösenord' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Felaktig email eller lösenord' });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.email}, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
});

// Middleware för att skydda rutter och validera JWT
const protect = (req: Request & { user?: { userId: number; email: string } }, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Hämta hotellinfo från databas
app.get('/api/hotels', protect, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        hotel_id, 
        name, 
        address, 
        highlights, 
        stars, 
        description, 
        image_url 
      FROM hotels
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Användare kan favoritmarkera ett hotell
app.post('/api/favorites', protect, async (req: Request & { user?: { userId: number; email: string } }, res: Response) => {
  
  
  console.log('Request body:', req.body);
  console.log('User email:', req.user?.email);

  const { hotel_id } = req.body;
  const email = req.user?.email;

  if (!hotel_id || !email) {
    return res.status(400).json({ message: 'Hotel ID och email krävs' });
  }

  try {
    const query = `
      INSERT INTO favorites (email, hotel_id)
      VALUES ($1, $2)
      ON CONFLICT (email, hotel_id) DO NOTHING
      RETURNING id
    `;
    const { rows } = await pool.query(query, [email, hotel_id]);
    if (rows.length === 0) {
      return res.status(409).json({ message: 'Hotellet är redan favoriterat' });
    }
    res.status(201).json({ message: 'Favorit tillagd', favoriteId: rows[0].id });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
});

// Hämtar alla hotell som användare har favoritmarkerat
app.get('/api/favorites', protect, async (req: Request & { user?: { userId: number; email: string } }, res: Response) => {
  console.log('User email:', req.user?.email);
  
  const email = req.user?.email;

  if (!email) {
    return res.status(400).json({ message: 'Email krävs' });
  }

  try {
    const query = `
      SELECT f.id AS favorite_id, h.hotel_id, h.name, h.address, h.stars, h.image_url
      FROM favorites f
      INNER JOIN hotels h ON f.hotel_id = h.hotel_id
      WHERE f.email = $1
    `;
    const { rows } = await pool.query(query, [email]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
});

// Ta bort favoritmarkeringen
app.delete('/api/favorites/:hotel_id', protect, async (req: Request & { user?: { userId: number; email: string } }, res: Response) => {
  console.log('DELETE request received');
  const { hotel_id } = req.params;
  const email = req.user?.email;

  if (!hotel_id || !email) {
    return res.status(400).json({ message: 'Hotel ID och email krävs' });
  }

  try {
    const query = `
      DELETE FROM favorites
      WHERE email = $1 AND hotel_id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [email, hotel_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Favoriten hittades inte' });
    }
    res.status(200).json({ message: 'Favorit borttagen' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
});


// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});