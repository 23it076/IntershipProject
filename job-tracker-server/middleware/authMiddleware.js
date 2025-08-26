// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "admin") next();
//     else res.status(403).json({ message: "Access denied: Admins only" });
//   });
// };

// const verifyProvider = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "provider") next();
//     else res.status(403).json({ message: "Access denied: Providers only" });
//   });
// };

// module.exports = { verifyToken, verifyAdmin, verifyProvider };


// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is logged in
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (and exclude the password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Move to the next piece of middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for 'admin' role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
  }
};

module.exports = { protect, isAdmin };