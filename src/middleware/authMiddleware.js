
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authorization' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid atau telah kedaluwarsa' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
