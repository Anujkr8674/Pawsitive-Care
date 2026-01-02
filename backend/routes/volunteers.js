const express = require('express');
const router = express.Router();
const volunteer = require('../models/volunteer');


// Route to get all volunteer data
router.get('/all', async (req, res) => {
    try {
      const Volunteers = await volunteer.find();
      res.json(Volunteers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



  // Route to delete a volunteer by ID
router.delete('/:id', async (req, res) => {
  try {
      const result = await volunteer.findByIdAndDelete(req.params.id);
      if (result) {
          res.status(200).json({ message: 'Volunteer deleted successfully' });
      } else {
          res.status(404).json({ message: 'Volunteer not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});



  module.exports = router;