// ✅ Get all jobs created by the logged-in provider
const getProviderJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching provider jobs", error });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getApplicants,
  getProviderJobs, // ✅ export it
};
