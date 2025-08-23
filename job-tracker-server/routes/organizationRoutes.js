// routes/organizationRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/organizationModel'); // make sure you have this model

const router = express.Router();

// ✅ Register Organization
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if org already exists
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const org = new Organization({
      name,
      email,
      password: hashedPassword,
    });

    await org.save();
    res.status(201).json({ message: 'Organization registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login Organization
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check org
    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // create token
    const token = jwt.sign(
      { id: org._id, role: 'organization' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      organization: {
        id: org._id,
        name: org.name,
        email: org.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get all organizations (Admin only later if needed)
router.get('/', async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
