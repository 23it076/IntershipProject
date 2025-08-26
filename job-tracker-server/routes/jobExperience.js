// File: routes/jobExperience.js

const express = require("express");
const router = express.Router();

// 1. Import the controller functions
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController'); // Make sure this path is correct

// 2. Correctly import and destructure the 'protect' middleware function
const { protect } = require("../middleware/authMiddleware"); // Make sure this path is correct

// --- Define the Routes ---

// @route   GET /api/experience
// @desc    Get all job experiences for the logged-in user
// @access  Private
router.get("/", protect, getAllJobs);

// @route   POST /api/experience
// @desc    Create a new job experience
// @access  Private
router.post("/", protect, createJob);

// @route   GET /api/experience/:id
// @desc    Get a single job experience by its ID
// @access  Private
router.get("/:id", protect, getJobById);

// @route   PUT /api/experience/:id
// @desc    Update a job experience
// @access  Private
router.put("/:id", protect, updateJob);

// @route   DELETE /api/experience/:id  
// @desc    Delete a job experience
// @access  Private
router.delete("/:id", protect, deleteJob);

module.exports = router;