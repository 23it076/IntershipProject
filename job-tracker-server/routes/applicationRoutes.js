// const express = require('express');
// const router = express.Router();
// const Application = require('../models/Application');

// /**
//  * @swagger
//  * tags:
//  *   name: Applications
//  *   description: Job application management
//  */

// /**
//  * @swagger
//  * /api/applications:
//  *   post:
//  *     summary: Apply for a job
//  *     tags: [Applications]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application.json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - user
//  *               - job
//  *             properties:
//  *               user:
//  *                 type: string
//  *                 description: ID of the user applying
//  *               job:
//  *                 type: string
//  *                 description: ID of the job being applied to
//  *               status:
//  *                 type: string
//  *                 description: Status of the application (e.g., pending, accepted)
//  *     responses:
//  *       201:
//  *         description: Application created successfully
//  *       400:
//  *         description: Bad request
//  */
// router.post('/', async (req, res) => {
//   try {
//     const application = new Application(req.body);
//     await application.save();
//     res.status(201).send(application);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// /**
//  * @swagger
//  * /api/applications:
//  *   get:
//  *     summary: Get all job applications with user and job info
//  *     tags: [Applications]
//  *     responses:
//  *       200:
//  *         description: A list of applications
//  *       500:
//  *         description: Server error
//  */
// router.get('/', async (req, res) => {
//   try {
//     const applications = await Application.find()
//       .populate('user')
//       .populate('job');
//     res.send(applications);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API for managing job applications
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
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
 *                 description: MongoDB ObjectId of the user (UserForJob)
 *                 example: "66c4f2b9a72e90b4dcb12ef3"
 *               job:
 *                 type: string
 *                 description: MongoDB ObjectId of the job
 *                 example: "66c5a87d82a9e3a16e71b0f4"
 *               resumeLink:
 *                 type: string
 *                 description: URL link to the applicant's resume
 *                 example: "https://example.com/resume.pdf"
 *               skillsMatched:
 *                 type: array
 *                 description: List of skills matched with the job
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "React", "Node.js"]
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Bad request (missing or invalid fields)
 */
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
