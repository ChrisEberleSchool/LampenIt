import express from 'express';
import bcrypt from 'bcryptjs';
import pkg from 'pg';

const internalAuth = process.env.X_INTERNAL_AUTH;

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Postgres connection pool
const pool = new Pool({
  user: 'root',
  host: 'db',   
  database: 'lampenit',
  password: 'example',
  port: 5432,
});

// Middleware to check Nginx internal header
app.use('/api/web', (req, res, next) => {
  if (req.headers['x-internal-auth'] !== internalAuth) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});


// ===== API ROUTES =====
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => res.json({ status: 'ok' }));

// Register user
apiRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
    res.json({ registration: 'Successful', username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

    res.json({ login: 'Successful', username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.use('/api/web', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
  console.log(`Web server running on port ${PORT}`);
});
