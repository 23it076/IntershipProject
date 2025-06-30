const JobExperience = require('../models/JobExperience');

// Create new job experience
const createJob = async (req, res) => {
  try {
    const job = new JobExperience(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all job experiences
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobExperience.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  try {
    const job = await JobExperience.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await JobExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobExperience.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};
