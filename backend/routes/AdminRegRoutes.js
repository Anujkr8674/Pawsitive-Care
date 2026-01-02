const express = require('express');
const router = express.Router();
const AdminRegistration = require('../models/AdminReg');

// Route to get all admin registrations
router.get('/all', async (req, res) => {
    try {
        const adminRegs = await AdminRegistration.find();
        res.json(adminRegs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete an admin registration by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const result = await AdminRegistration.findByIdAndDelete(req.params.id);
//         if (result) {
//             res.status(200).json({ message: 'Admin registration deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Admin registration not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// Example route setup in your Express backend
router.delete('/api/admin/adminregs/:id', async (req, res) => {
    try {
      const adminId = req.params.id;
      const result = await AdminRegistration.findByIdAndDelete(adminId); // Assuming you are using Mongoose
      if (!result) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      res.send({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error });
    }
  });
  
module.exports = router;
