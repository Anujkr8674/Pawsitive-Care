const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming the order model file is named orderModel.js

// Get all orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

module.exports = router;
