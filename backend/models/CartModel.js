const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    required: false
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  cartItems: {
    type: [cartItemSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

