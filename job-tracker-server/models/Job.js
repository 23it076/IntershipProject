const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: String,
  location: String,
  // who created this job (typically a user)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // moderation status for provider review
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);


