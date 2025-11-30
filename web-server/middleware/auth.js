import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const generateJWT = (user) => {
  return jwt.sign(
    {
      sub: user.username,        
      role: user.role || 'user', 
      jti: uuidv4(),            
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',            
      issuer: 'myapp.com',       
      audience: 'myapp-frontend', 
    }
  );
};

// Middleware to verify JWT
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'fishhub.ca',
      audience: 'fishhub-frontend',
    });
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware to allow only admin users
export const authenticateAdmin = (req, res, next) => {
  verifyJWT(req, res, () => {  // First verify token
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};