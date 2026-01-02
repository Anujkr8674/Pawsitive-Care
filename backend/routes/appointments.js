const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Route to get all appointments
router.get('/all', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete an appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Appointment.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
