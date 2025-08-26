const JobExperience = require('../models/JobExperience');
const Job = require('../models/Job');

// Create new job experience
const createJob = async (req, res) => {
  try {
    const job = new JobExperience({ 
      ...req.body, 
      user: req.user._id   // ✅ ensure we use the Mongo _id
    });
    const savedJob = await job.save();

    // Mirror to provider-reviewable Job so providers can see user-submitted jobs
    try {
      const mirroredJob = new Job({
        title: req.body.jobTitle,
        description: req.body.description,
        company: req.body.company,
        location: req.body.location,
        createdBy: req.user._id,
        status: 'pending'
      });
      await mirroredJob.save();
      // persist link to mirrored job for exact status updates
      savedJob.providerJobId = mirroredJob._id;
      await savedJob.save();
    } catch (mirrorErr) {
      // Do not fail the original request if mirroring fails; just log
      console.error('Failed to mirror JobExperience to Job:', mirrorErr?.message || mirrorErr);
    }

    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all job experiences of the logged-in user
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobExperience.find({ user: req.user._id })  // ✅ use _id consistently
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  try {
    const job = await JobExperience.findOne({ 
      _id: req.params.id, 
      user: req.user._id  // ✅ use _id consistently
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { jobTitle, company, location, startDate, endDate, description, isCurrentJob } = req.body;
    const updateData = { 
      jobTitle, company, location, startDate, 
      endDate: isCurrentJob ? null : endDate, 
      description, isCurrentJob 
    };

    const updatedJob = await JobExperience.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },  // ✅ use _id consistently
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJob) return res.status(404).json({ error: 'Job not found or unauthorized' });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobExperience.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id   // ✅ use _id consistently
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
