const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
