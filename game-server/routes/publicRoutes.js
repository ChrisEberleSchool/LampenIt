import express from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { generateJWT } from '../middleware/auth.js';


const router = express.Router();

// Register user
router.post('/passwords', async (req, res) => {
  res.status(500).json({ error: 'Bro really thought he did sum. looool' });
});


export default router;
