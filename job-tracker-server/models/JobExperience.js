const mongoose = require('mongoose');

const JobExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  isCurrentJob: { type: Boolean, default: false },
  // provider review status for user-submitted job
  providerStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  // link to mirrored Job document for precise status syncing
  providerJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  
  // ✅ CHANGED THIS FIELD NAME from 'userId' to 'user'
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('JobExperience', JobExperienceSchema);