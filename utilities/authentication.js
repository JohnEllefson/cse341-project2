'use strict';

const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token. Access denied.' });

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing. Access denied' });
  }
};

// Middleware to check roles
const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === 'admin') return next();
    res.status(403).json({ message: 'Access denied' });
  };
};

// Middleware for role-based protection
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role) || req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  };
};

module.exports = { authenticateJWT, checkRole, authorizeRoles };
