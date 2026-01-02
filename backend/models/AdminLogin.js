const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminLogin', adminLoginSchema);

