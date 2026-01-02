const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
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
  donationType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: false
  },
  paymentMethod: {
    type: String,
    required: false
  },
  paymentDetails: {
    cardNumber: {
      type: String,
      required: false
    },
    cardExpiry: {
      type: String,
      required: false
    },
    cardCVV: {
      type: String,
      required: false
    },
    upiId: {
      type: String,
      required: false
    }
  },
  selectedItem: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: false
  },
  petSupplies: {
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

module.exports = mongoose.model('Donation', donationSchema);

