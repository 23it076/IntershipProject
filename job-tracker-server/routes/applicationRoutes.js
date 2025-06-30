const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management
 */

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - job
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user applying
 *               job:
 *                 type: string
 *                 description: ID of the job being applied to
 *               status:
 *                 type: string
 *                 description: Status of the application (e.g., pending, accepted)
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).send(application);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all job applications with user and job info
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: A list of applications
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user')
      .populate('job');
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
