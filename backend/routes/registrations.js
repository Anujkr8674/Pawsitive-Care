const express = require('express');
const router = express.Router();
const Registration = require('../models/registrationFrom');

// Route to get all registrations
router.get('/all', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a registration by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Registration.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Registration deleted successfully' });
        } else {
            res.status(404).json({ message: 'Registration not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
