const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
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
    required: true
  },
  phone: {
    type: String,
    required: true
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
  skills: {
    type: String,
    required: false
  },
  experience: {
    type: String,
    required: false
  },
  availability: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);

