const express = require('express');
const UserForJob = require('../models/userForJob');  // Adjust the path as necessary

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to job application users
 */

/**
 * @swagger
 * /api/usersForJob:
 *   post:
 *     tags:
 *       - user
 *     summary: Create a new user for job application
 *     description: Adds a new user profile with job details.
 *     parameters:
 *       - name: user
 *         in: header
 *         description: The user ID to associate with the job application
 *         required: true
 *         schema:
 *           type: string
 *           example: '12345'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               id:
 *                 type: string
 *                 example: '12345'
 *               email:
 *                 type: string
 *                 example: 'johndoe@gmail.com'
 *               phone:
 *                 type: string
 *                 example: '123-456-7890'
 *               address:
 *                 type: string
 *                 example: '123 Main St, City, Country'
 *               resumeLink:
 *                 type: string
 *                 example: 'http://link-to-resume.com'
 *               github:
 *                 type: string
 *                 example: 'https://github.com/johndoe'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  const { name, id, email, phone, address, resumeLink, github } = req.body;

  try {
    const newUser = new UserForJob({
      name,
      id,
      email,
      phone,
      address,
      resumeLink,
      github,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

/**
 * @swagger
 * /api/usersForJob:
 *   get:
 *     tags:
 *       - user
 *     summary: Get all users for job applications
 *     description: Fetches all user profiles with job details.
 *     parameters:
 *       - name: user
 *         in: header
 *         description: The user ID to associate with the job application
 *         required: true
 *         schema:
 *           type: string
 *           example: '12345'
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       500:
 *         description: Error fetching users
 */
router.get('/', async (req, res) => {
  try {
    const users = await UserForJob.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;
