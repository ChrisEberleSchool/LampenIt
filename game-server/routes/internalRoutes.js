import express from 'express';
import { verifyInternalAuth } from '../middleware/internalAuth.js';

const router = express.Router();

// Protect all internal routes
router.use(verifyInternalAuth);

// Example internal route
router.get('/logs', (req, res) => {
  res.json({ message: 'Internal logs accessible only via internal auth' });
});

export default router;
