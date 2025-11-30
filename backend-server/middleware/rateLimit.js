import rateLimit from 'express-rate-limit';

// Login limiter
export const loginLimiter = rateLimit({
    // 15 minutes
    windowMs: 15 * 60 * 1000, 
    // limit each IP to 5 requests per window
    max: 5, 
    message: { error: 'Too many login attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Register limiter
export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: { error: 'Too many registration attempts, please try later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
