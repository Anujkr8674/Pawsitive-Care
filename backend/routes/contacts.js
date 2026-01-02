const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Route to get all contacts
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
