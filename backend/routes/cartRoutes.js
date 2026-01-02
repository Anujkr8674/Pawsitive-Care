// // backend/routes/cartRoutes.js
// const express = require('express');
// const Cart = require('../models/CartModel');
// const router = express.Router();

// // Route to get all cart data (orders)
// router.get('/all', async (req, res) => {
//     try {
//       const allOrders = await Cart.find();
//       res.json(allOrders);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   // Route to delete an order by ID
//   router.delete('/:id', async (req, res) => {
//     try {
//       const result = await Cart.findByIdAndDelete(req.params.id);
//       if (result) {
//         res.status(200).json({ message: 'Order deleted successfully' });
//       } else {
//         res.status(404).json({ message: 'Order not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// module.exports = router;




// const express = require('express');
// const Cart = require('../models/CartModel');
// const router = express.Router();

// // Get cart items for a user
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const cart = await Cart.findOne({ userId });
//     if (cart) {
//       res.json({ cart: cart.cartItems });
//     } else {
//       res.json({ cart: [] });
//     }
//   } catch (error) {
//     res.status(500).send('Error fetching cart');
//   }
// });

// // Save cart items for a user
// router.post('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { cartItems } = req.body;
//   try {
//     let cart = await Cart.findOne({ userId });
//     if (cart) {
//       cart.cartItems = cartItems;
//     } else {
//       cart = new Cart({ userId, cartItems });
//     }
//     await cart.save();
//     res.status(200).send('Cart saved');
//   } catch (error) {
//     res.status(500).send('Error saving cart');
//   }
// });

// module.exports = router;






const express = require('express');
const Cart = require('../models/CartModel');
const router = express.Router();

// Get cart items for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      res.json({ cart: cart.cartItems });
    } else {
      res.json({ cart: [] });
    }
  } catch (error) {
    res.status(500).send('Error fetching cart: ' + error.message);
  }
});

// Save or update cart items for a user
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { cartItems } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Update existing cart items
      cart.cartItems = cartItems;
    } else {
      // Create a new cart
      cart = new Cart({ userId, cartItems });
    }
    await cart.save();
    res.status(200).send('Cart saved successfully');
  } catch (error) {
    res.status(500).send('Error saving cart: ' + error.message);
  }
});

// Update quantity of an item in the cart
router.put('/:userId/update-item', async (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity } = req.body; // itemId and new quantity to update

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const item = cart.cartItems.find(item => item.id === itemId);
    if (!item) {
      return res.status(404).send('Item not found in cart');
    }

    // Update item quantity
    item.quantity = quantity;
    await cart.save();
    
    res.status(200).send('Item quantity updated successfully');
  } catch (error) {
    res.status(500).send('Error updating item: ' + error.message);
  }
});

// Remove an item from the cart
router.delete('/:userId/remove-item', async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body; // itemId to remove

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Filter out the item to be removed
    cart.cartItems = cart.cartItems.filter(item => item.id !== itemId);
    await cart.save();
    
    res.status(200).send('Item removed successfully');
  } catch (error) {
    res.status(500).send('Error removing item: ' + error.message);
  }
});

module.exports = router;
