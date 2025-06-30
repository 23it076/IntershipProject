const mongoose = require('mongoose');

const userForJobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },

    resumeLink: { type: String },
  github: { type: String }
  

  
}, { timestamps: true });

module.exports = mongoose.model('UserForJob', userForJobSchema);
