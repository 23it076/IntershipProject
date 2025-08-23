const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") next();
    else res.status(403).json({ message: "Access denied: Admins only" });
  });
};

const verifyProvider = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "provider") next();
    else res.status(403).json({ message: "Access denied: Providers only" });
  });
};

module.exports = { verifyToken, verifyAdmin, verifyProvider };
