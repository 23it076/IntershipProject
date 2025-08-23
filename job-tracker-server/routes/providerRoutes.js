// routes/providerRoutes.js
const express = require('express');
const Job = require('../models/Job'); // assuming you have a Job model

const router = express.Router();

// Create job
router.post('/jobs', async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const newJob = new Job({ title, description, location });
    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err.message });
  }
});

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});

module.exports = router;
