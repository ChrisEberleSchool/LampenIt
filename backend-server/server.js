import express from 'express';
import publicRoutes from './routes/publicRoutes.js';
import privateRoutes from './routes/privateRoutes.js';
import internalRoutes from './routes/internalRoutes.js';

const app = express();
const PORT = process.env.PORT;

// Allow all IPs to come through
app.set('trust proxy', 1);


app.use(express.json());

// --- Log client info middleware ---
app.use((req, res, next) => {
  console.log('Client IP seen by Express:', req.ip);
  next();
});

// --- Log client info middleware ---
app.use((req, res, next) => {
  const clientIP = req.ip || req.socket.remoteAddress;
  console.log(`[${new Date().toISOString()}] ${req.method} request from ${clientIP} to ${req.originalUrl}`);
  next();
});

// Mount routes
app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/internal', internalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Lampen-IT server running on port ${PORT}`);
});
