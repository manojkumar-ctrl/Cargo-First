import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.substring(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const secret = process.env.JWT_SECRET || 'supersecretjwtkey';
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


