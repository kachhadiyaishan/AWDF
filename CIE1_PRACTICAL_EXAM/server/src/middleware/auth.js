import jwt from 'jsonwebtoken';

export function authGuard(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Sign in to continue.' } });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Your session is invalid or expired.' } });
  }
}

export function requireHR(req, res, next) {
  if (req.user?.role !== 'HR') return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'HR access is required.' } });
  next();
}
