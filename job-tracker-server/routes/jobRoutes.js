const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - organization
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               organization:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('organization');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
