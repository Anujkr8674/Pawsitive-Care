const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');

// Route to get all donations
router.get('/all', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a donation by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Donation.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Donation deleted successfully' });
        } else {
            res.status(404).json({ message: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
