const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },
  subject: {
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

module.exports = mongoose.model('Contact', contactSchema);

