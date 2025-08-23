// // const express = require('express');
// // const router = express.Router();
// // const Job = require('../models/Job');

// // /**
// //  * @swagger
// //  * tags:
// //  *   name: Jobs
// //  *   description: Job management
// //  */

// // /**
// //  * @swagger
// //  * /api/jobs:
// //  *   post:
// //  *     summary: Create a new job
// //  *     tags: [Jobs]
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             required:
// //  *               - title
// //  *               - description
// //  *               - organization
// //  *             properties:
// //  *               title:
// //  *                 type: string
// //  *               description:
// //  *                 type: string
// //  *               organization:
// //  *                 type: string
// //  *     responses:
// //  *       201:
// //  *         description: Job created successfully
// //  *       400:
// //  *         description: Bad request
// //  */
// // router.post('/', async (req, res) => {
// //   try {
// //     const job = new Job(req.body);
// //     await job.save();
// //     res.status(201).json(job);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // });

// // /**
// //  * @swagger
// //  * /api/jobs:
// //  *   get:
// //  *     summary: Get all jobs
// //  *     tags: [Jobs]
// //  *     responses:
// //  *       200:
// //  *         description: A list of jobs
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: array
// //  *               items:
// //  *                 type: object
// //  */
// // router.get('/', async (req, res) => {
// //   try {
// //     const jobs = await Job.find().populate('organization');
// //     res.json(jobs);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;






// // routes/jobExperienceRoutes.js
// const express = require('express');
// const router = express.Router();
// const JobExperience = require('../models/JobExperience');
// const authMiddleware = require('../middleware/authMiddleware'); // ✅ JWT check

// /**
//  * @swagger
//  * tags:
//  *   name: JobExperiences
//  *   description: Manage user job experiences
//  */

// /**
//  * @swagger
//  * /api/job-experiences:
//  *   post:
//  *     summary: Add a new job experience
//  *     tags: [JobExperiences]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - jobTitle
//  *               - company
//  *               - startDate
//  *             properties:
//  *               jobTitle:
//  *                 type: string
//  *               company:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               startDate:
//  *                 type: string
//  *                 format: date
//  *               endDate:
//  *                 type: string
//  *                 format: date
//  *               description:
//  *                 type: string
//  *               isCurrentJob:
//  *                 type: boolean
//  *     responses:
//  *       201:
//  *         description: Job experience created successfully
//  *       400:
//  *         description: Bad request
//  */
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const jobExperience = new JobExperience({
//       ...req.body,
//       userId: req.user.id // ✅ link to logged-in user
//     });
//     await jobExperience.save();
//     res.status(201).json(jobExperience);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/job-experiences:
//  *   get:
//  *     summary: Get all job experiences of the logged-in user
//  *     tags: [JobExperiences]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: A list of job experiences
//  */
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const jobs = await JobExperience.find({ userId: req.user.id });
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/job-experiences/{id}:
//  *   put:
//  *     summary: Update a job experience
//  *     tags: [JobExperiences]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *     responses:
//  *       200:
//  *         description: Job experience updated successfully
//  */
// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const job = await JobExperience.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );
//     if (!job) return res.status(404).json({ error: 'Job not found' });
//     res.json(job);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/job-experiences/{id}:
//  *   delete:
//  *     summary: Delete a job experience
//  *     tags: [JobExperiences]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Job experience deleted successfully
//  */
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const job = await JobExperience.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id
//     });
//     if (!job) return res.status(404).json({ error: 'Job not found' });
//     res.json({ message: 'Job deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
// File: routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobsByProvider,
  updateJob,
  deleteJob,
  getApplicants,
} = require("../controllers/jobController");

const { protect, verifyProvider } = require("../middleware/authMiddleware");

/**
 * @route   POST /api/jobs
 * @desc    Provider creates a job
 * @access  Private (Provider only)
 */
router.post("/", protect, verifyProvider, createJob);

/**
 * @route   GET /api/jobs
 * @desc    Provider gets all their created jobs
 * @access  Private (Provider only)
 */
router.get("/", protect, verifyProvider, getJobsByProvider);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Provider updates a specific job
 * @access  Private (Provider only)
 */
router.put("/:id", protect, verifyProvider, updateJob);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Provider deletes a specific job
 * @access  Private (Provider only)
 */
router.delete("/:id", protect, verifyProvider, deleteJob);

/**
 * @route   GET /api/jobs/:id/applicants
 * @desc    Provider gets all applicants for a job
 * @access  Private (Provider only)
 */
router.get("/:id/applicants", protect, verifyProvider, getApplicants);

module.exports = router;
