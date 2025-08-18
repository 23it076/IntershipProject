const express = require('express');
const JobExperience = require('../models/JobExperience');
const auth = require('../middleware/auth'); // ✅ middleware path fixed
const router = express.Router();

// GET all experiences
router.get('/', auth, async (req, res) => {
  try {
    const experiences = await JobExperience.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single experience
router.get('/:id', auth, async (req, res) => {
  try {
    const experience = await JobExperience.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create experience
router.post('/', auth, async (req, res) => {
  try {
    const { jobTitle, company, location, startDate, endDate, description, isCurrentJob } = req.body;

    const experience = new JobExperience({
      jobTitle,
      company,
      location,
      startDate,
      endDate: isCurrentJob ? null : endDate,
      description,
      isCurrentJob,
      userId: req.user.id
    });

    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update experience
router.put('/:id', auth, async (req, res) => {
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

    const experience = await JobExperience.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE experience
router.delete('/:id', auth, async (req, res) => {
  try {
    const experience = await JobExperience.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
