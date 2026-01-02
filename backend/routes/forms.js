
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId to convert IDs
const authenticateToken = require('../middleware/authMiddleware');
const VolunteerForm = require('../models/volunteer');
const AppointmentForm = require('../models/Appointment');
const ContactFrom = require('../models/contact');
const DonationFrom = require('../models/donation');
const PetAdoptionFrom = require('../models/petAdoption');


// // Update status of a volunteer form
// router.patch('/api/admin/volunteers/:id/status', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     console.log('Received ID for status update:', id);

//     // Validate status
//     if (!['Accepted', 'Rejected', 'Pending'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }

//     // Convert string ID to ObjectId
//     const volunteerId = ObjectId(id);

//     const updatedVolunteer = await VolunteerForm.findByIdAndUpdate(
//       volunteerId,
//       { status },
//       { new: true }
//     );

//     if (!updatedVolunteer) {
//       return res.status(404).json({ message: 'Volunteer application not found' });
//     }

//     res.status(200).json(updatedVolunteer);
//   } catch (error) {
//     console.error('Error updating volunteer status:', error);
//     res.status(500).json({ message: 'Failed to update status.', error });
//   }
// });

// Update status of an appointment form
router.patch('/api/admin/appointments/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Received ID for appointment status update:', id);

    // Validate status
    if (!['Accepted', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Convert string ID to ObjectId
    const appointmentId = ObjectId(id);

    const updatedAppointment = await AppointmentForm.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Failed to update status.', error });
  }
});




// Fetch submitted forms for a specific user
router.get('/api/user/forms', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the `authenticateToken` middleware sets `req.user.id`

    // Fetch forms submitted by the user
    const volunteerForms = await VolunteerForm.find({ userId });
    const appointmentForms = await AppointmentForm.find({ userId });
    const contactFrom = await ContactFrom.find({ userId});
    const donationsForms = await DonationFrom.find({userId});
    const petAdoptionFrom = await PetAdoptionFrom.find({userId});

    // Check if forms exist
    if (!volunteerForms.length && !appointmentForms.length &&  contactFrom.length && donationsForms.length  && petAdoptionFrom ) {
      // if (!volunteerForms.length && !appointmentForms.length &&  contactFrom.length  ) {
      return res.status(404).json({ message: 'No forms found for this user.' });
    }

    res.status(200).json({
      volunteerForms,
      appointmentForms,
      contactFrom,
      donationsForms,
      petAdoptionFrom
    });
  } catch (error) {
    console.error('Error fetching user forms:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch user forms.' });
  }
});

module.exports = router;

