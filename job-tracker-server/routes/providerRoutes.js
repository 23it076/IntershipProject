// routes/providerRoutes.js
const express = require('express');
const Job = require('../models/Job');
const JobExperience = require('../models/JobExperience');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper to include legacy jobs that don't have a status yet
const buildStatusFilter = (status) => {
  if (!status) return {};
  if (status === 'pending') {
    return { $or: [{ status: 'pending' }, { status: { $exists: false } }] };
  }
  return { status };
};

// Provider: search user-created jobs by query (title/location/company) that are pending
router.get('/jobs/search', protect, async (req, res) => {
  try {
    const { q } = req.query;
    const match = q
      ? { $or: [
          { title: new RegExp(q, 'i') },
          { location: new RegExp(q, 'i') },
          { company: new RegExp(q, 'i') }
        ] }
      : {};
    const jobs = await Job.find({ ...buildStatusFilter('pending'), ...match }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error searching jobs', error: err.message });
  }
});

// Provider: approve a pending job
router.patch('/jobs/:id/approve', protect, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    // reflect status to linked JobExperience by providerJobId
    await JobExperience.updateMany(
      { providerJobId: job._id },
      { providerStatus: 'approved' }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error approving job', error: err.message });
  }
});

// Provider: reject a pending job
router.patch('/jobs/:id/reject', protect, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    await JobExperience.updateMany(
      { providerJobId: job._id },
      { providerStatus: 'rejected' }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting job', error: err.message });
  }
});

// Provider: list all jobs segmented by status
router.get('/jobs', protect, async (req, res) => {
  try {
    const { status } = req.query; // optional filter
    const filter = buildStatusFilter(status);
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err.message });
  }
});

module.exports = router;
