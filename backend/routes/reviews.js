const express = require('express');
const router = express.Router();
const Review = require('../models/Review');




//  Route to get all subscription
router.get('/all', async (req, res) => {
    try {
        // const subscriptions = await Subscription.find();
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a registration by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Review.findByIdAndDelete(req.params.id);
        // const result = await Subscription.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Reviwes deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reviwes not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
