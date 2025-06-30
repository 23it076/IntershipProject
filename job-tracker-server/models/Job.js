const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  company: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);


