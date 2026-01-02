const express = require('express');
const router = express.Router();
// const UserReg = require('../models/UserReg'); // Import your UserReg model
const UserReg = require('../models/userReg');

// Get all user registrations
router.get('/', async (req, res) => {
    try {
        const userRegs = await UserReg.find(); // Fetch all userRegs from the database
        res.json(userRegs); // Send the data as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




//  Route to delete a registration by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await UserReg.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: ' User Registration deleted successfully' });
        } else {
            res.status(404).json({ message: 'User Registration not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;