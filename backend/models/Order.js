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
  },
  status: {
    type: String,
    enum: [
      'Pending', 
      'Accepted',
      'Rejected', 
      'Processing', 
      'Shipped', 
      ' Transit',  // Note: includes leading space as per frontend
      'Out for Delivery',
      'Delivered', 
      'Failed Delivery',
      'Return Initiated',
      'Return Picked Up',
      'Cancelled'
    ],
    default: 'Pending'
  },
  statusUpdateDate: {
    type: Date,
    required: false
  },
  estimatedPickupDate: {
    type: Date,
    required: false
  },
  itemStatus: {
    type: String,
    enum: ['Active', 'Cancelled'],
    default: 'Active'
  }
}, { _id: true });

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  locality: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  alternateMobile: { type: String, required: false }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cartItems: {
    type: [cartItemSchema],
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderType: {
    type: String,
    enum: ['Prepaid', 'Postpaid'],
    default: 'Prepaid'
  },
  paymentProof: {
    type: String,
    required: false
  },
  deliveryDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    enum: [
      'Pending', 
      'Accepted',
      'Rejected', 
      'Processing', 
      'Shipped', 
      ' Transit',  // Note: includes leading space as per frontend
      'Out for Delivery',
      'Delivered', 
      'Failed Delivery',
      'Return Initiated',
      'Return Picked Up',
      'Cancelled'
    ],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

