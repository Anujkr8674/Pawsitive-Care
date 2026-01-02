const mongoose = require('mongoose');

const adminRegSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminReg', adminRegSchema);

