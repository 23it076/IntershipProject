const mongoose = require('mongoose');

const JobExperienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  isCurrentJob: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('JobExperience', JobExperienceSchema);
