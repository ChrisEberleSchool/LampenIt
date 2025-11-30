import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protect all private routes
router.use(authenticateAdmin);

// Example private route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', user: req.user.username });
});

export default router;
