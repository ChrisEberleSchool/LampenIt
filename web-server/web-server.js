import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ===== API ROUTES =====
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => res.json({ status: 'ok' }));

apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === '123' && password === '123') {
    return res.json({ login: 'Successful', username });
  }
  return res.status(401).json({ error: 'Invalid username or password' });
});

apiRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.json({ registration: 'Successful', username });
});

app.use('/api/web', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
