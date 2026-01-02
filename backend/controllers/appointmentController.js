// const Appointment = require('../models/Appointment');

// exports.createAppointment = async (req, res) => {
//   const { service, date, time, notes } = req.body;
//   try {
//     const newAppointment = new Appointment({
//       // user: req.user.id,
//       service,
//       date,
//       time,
//       notes,
//     });
//     const appointment = await newAppointment.save();
//     res.json(appointment);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find().populate('user', 'name email');
//     res.json(appointments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };




exports.createAppointment = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    petFirstName,
    petLastName,
    breed,
    age,
    gender,
    service,
    date,
    signature
  } = req.body;

  try {
    const newAppointment = new Appointment({
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      petFirstName,
      petLastName,
      breed,
      age,
      gender,
      service,
      date,
      signature,
    });

    const appointment = await newAppointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

