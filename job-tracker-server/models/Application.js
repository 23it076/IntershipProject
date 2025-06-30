const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserForJob', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  appliedDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Reviewed, Accepted, Rejected
  resumeLink: { type: String },
  skillsMatched: [String]
});

module.exports = mongoose.model('Application', applicationSchema);




