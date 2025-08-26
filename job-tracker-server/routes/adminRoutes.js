// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const { createUserByAdmin } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route for an admin to create a new user with a specific role
// POST /api/admin/create-user
// This route is protected. It first checks for login (protect), then checks for admin role (isAdmin).
router.post('/create-user', protect, isAdmin, createUserByAdmin);

module.exports = router;