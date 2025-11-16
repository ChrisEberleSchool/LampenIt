const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const replicaApp = process.env.APP_NAME || 'game-server';

const internalAuth = process.env.X_INTERNAL_AUTH;

app.use(express.json());

// Middleware to check Nginx internal header
app.use('/api/game', (req, res, next) => {
  if (req.headers['x-internal-auth'] !== internalAuth) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

app.listen(port, () => {
  console.log(`[${replicaApp}] Game server listening on port ${port} (env: ${process.env.NODE_ENV})`);
});
