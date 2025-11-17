import express from 'express';
import publicRoutes from  './routes/publicRoutes.js'
import privateRoutes from './routes/privateRoutes.js';
import internalRoutes from './routes/internalRoutes.js';

const app = express();
const PORT = process.env.PORT;

// REQUIRED for Express-rate-limit + Nginx
app.set('trust proxy', 1);

app.use(express.json());

// Mount routes
app.use('/api/web/public', publicRoutes);
app.use('/api/web/private', privateRoutes);
app.use('/api/web/internal', internalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
