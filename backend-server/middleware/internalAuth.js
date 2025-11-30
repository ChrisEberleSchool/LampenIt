export const verifyInternalAuth = (req, res, next) => {
  if (req.headers['x-internal-auth'] !== process.env.X_INTERNAL_AUTH) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
