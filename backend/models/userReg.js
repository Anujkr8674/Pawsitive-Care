const mongoose = require('mongoose');

const userRegSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: false
  },
  dateOfBirth: {
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

module.exports = mongoose.model('UserReg', userRegSchema);

