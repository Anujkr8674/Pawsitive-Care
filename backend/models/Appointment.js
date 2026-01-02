const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  address1: {
    type: String,
    required: false
  },
  address2: {
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
  petFirstName: {
    type: String,
    required: false
  },
  petLastName: {
    type: String,
    required: false
  },
  breed: {
    type: String,
    required: false
  },
  age: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  service: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  signature: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appointmentImage: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);

