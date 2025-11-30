import express from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { generateJWT } from '../middleware/auth.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Register user
router.post('/register', registerLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    // Check if username already exists
    const userCheck = await pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashed]
    );

    res.json({ registration: 'Successful', username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });   
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid username or password' }); 
        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid username or password' });   
        // Generate JWT with full claims
        const token = generateJWT(user);
        // Responde with success
        res.json({ login: 'Successful', username: user.username, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
