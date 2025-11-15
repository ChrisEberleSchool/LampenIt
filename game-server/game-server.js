/**
 * Game server API instance
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const replicaApp = process.env.APP_NAME || 'game-server';

app.use(express.json());

// Example API route
app.use('/api/health/check', (req, res) => {
  res.json({ status: 'ok', server: replicaApp });
  console.log(`[${replicaApp}] Health check`);
});

// Catch-all for testing
app.use('*', (req, res) => {
  res.json({ message: `Request handled by ${replicaApp}` });
});

app.listen(port, () => {
  console.log(`[${replicaApp}] Game server listening on port ${port} (env: ${process.env.NODE_ENV})`);
});
