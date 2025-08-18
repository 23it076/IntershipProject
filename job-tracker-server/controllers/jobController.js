const JobExperience = require('../models/JobExperience');

// Create new job experience
const createJob = async (req, res) => {
  try {
    // Add userId from auth middleware
    const job = new JobExperience({ ...req.body, userId: req.user.id });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all job experiences of the logged-in user
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobExperience.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job by ID, only if owned by logged-in user
const getJobById = async (req, res) => {
  try {
    const job = await JobExperience.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job - only if owned by logged-in user
const updateJob = async (req, res) => {
  try {
    const { jobTitle, company, location, startDate, endDate, description, isCurrentJob } = req.body;

    const updateData = {
      jobTitle,
      company,
      location,
      startDate,
      endDate: isCurrentJob ? null : endDate,
      description,
      isCurrentJob
    };

    const updatedJob = await JobExperience.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },  // ownership check
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job - only if owned by logged-in user
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobExperience.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deletedJob) return res.status(404).json({ error: 'Job not found or unauthorized' });
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
