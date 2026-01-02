const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema);

