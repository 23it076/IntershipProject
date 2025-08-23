const express = require("express");
const router = express.Router();
const JobExperience = require("../models/JobExperience");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ now directly function

// Create Job Experience
router.post("/", authMiddleware, async (req, res) => {
  try {
    const jobExperience = new JobExperience({
      ...req.body,
      user: req.user._id,
    });
    await jobExperience.save();
    res.status(201).json(jobExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Job Experiences of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobExperiences = await JobExperience.find({ user: req.user._id });
    res.json(jobExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Job Experience
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const jobExperience = await JobExperience.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!jobExperience) {
      return res.status(404).json({ message: "Job experience not found" });
    }
    res.json(jobExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Job Experience
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const jobExperience = await JobExperience.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!jobExperience) {
      return res.status(404).json({ message: "Job experience not found" });
    }
    res.json({ message: "Job experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
