const express = require('express');
const router = express.Router();
const PetAdoption = require('../models/petAdoption');


// Route to get all volunteer data
router.get('/all', async (req, res) => {
    try {
      const petAdoption = await PetAdoption.find();
      res.json(petAdoption);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  // Delete a pet adoption by ID
router.delete('/:id', async (req, res) => {
  try {
      const result = await PetAdoption.findByIdAndDelete(req.params.id);
      if (result) {
          res.status(200).send('Pet adoption deleted successfully');
      } else {
          res.status(404).send('Pet adoption not found');
      }
  } catch (error) {
      res.status(500).send('Server error');
  }
});

  
  module.exports = router;