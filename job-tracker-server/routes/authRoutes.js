const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Import the controller functions

// ✅ REGISTER Route
// POST /api/auth/register
router.post('/register', register);

// ✅ LOGIN Route
// POST /api/auth/login
router.post('/login', login);

module.exports = router;