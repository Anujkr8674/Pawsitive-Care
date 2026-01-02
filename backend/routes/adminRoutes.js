// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const Appointment = require('../models/Appointment');
// const PetAdoption = require('../models/petAdoption');
// const Volunteer = require('../models/volunteer');
// const Donation = require('../models/donation');
// const Contact = require('../models/contact');
// const Registration = require('../models/registrationFrom');
// const AdminReg = require('../models/AdminReg');
// const AdminLogin  = require('../models/AdminLogin');

// const app = express();
// const SECRET_KEY = process.env.SECRET_KEY || '18e4e74072651732914140cc00ef10307e37fb012e31dc04fbf434bd84dd91aafdf54fea91dc0ed064e6c988a0f3c9704ed264c0bc5ec12b987c702003511b1b';

// // Use environment variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Middleware to protect routes
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).send({ message: 'No token provided' });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).send({ message: 'Invalid token' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// // Routes
// app.get('/', (req, res) => {
//   res.send("Appointment API is running");
// });

// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API is working!' });
// });


// // Appointments  


// app.get('/api/appointments', authMiddleware, async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ userId: req.userId });
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to fetch appointments.', error });
//   }
// });

// app.post('/api/appointments', async (req, res) => {
//   try {
//     const appointmentData = { ...req.body, userId: req.userId };
//     const appointment = new Appointment(appointmentData);
//     await appointment.save();
//     res.status(201).send({ message: 'Appointment booked successfully!' });
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to book appointment.', error });
//   }
// });



// // volunteers  


// app.post('/api/volunteers', async (req, res) => {
//   try {
//     const volunteerData = req.body;
//     const volunteer = new Volunteer(volunteerData);
//     await volunteer.save();
//     res.status(201).send({ message: 'Volunteer application submitted successfully!' });
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to submit volunteer application.', error });
//   }
// });


// // Donations

// app.post('/api/donations', async (req, res) => {
//   try {
//     const donation = new Donation(req.body);
//     await donation.save();
//     res.status(201).send('Donation data saved successfully');
//   } catch (error) {
//     res.status(500).send('Error saving donation data');
//   }
// });



// // petAdoption



// app.post('/api/petadoptions', async (req, res) => {
//   try {
//     const petAdoptionFrom = new PetAdoption(req.body);
//     await petAdoptionFrom.save();
//     res.status(201).json({ message: 'Pet adoption request submitted successfully!' });
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to submit pet adoption request', details: err });
//   }
// });



// // Contact 


// app.post('/api/contact', async (req, res) => {
//   try {
//     const contact = new Contact(req.body);
//     await contact.save();
//     res.status(201).json({ message: 'Contact message submitted successfully!' });
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to submit contact message', details: err });
//   }
// });



// // User Registration


// app.post('/api/register', async (req, res) => {
//   try {
//     const { firstName, lastName, userId, email, mobileNumber, dateOfBirth, password, confirmPassword } = req.body;

//     // Ensure passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).send({ message: 'Passwords do not match' });
//     }

//     // Create a new registration object
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newRegistration = new Registration({
//       firstName,
//       lastName,
//       userId,
//       email,
//       mobileNumber,
//       dateOfBirth,
//       password: hashedPassword
//     });

//     // Save the user to the database
//     await newRegistration.save();
//     res.status(201).send({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     if (error.code === 11000) {
//       res.status(400).send({ message: 'User already exists' });
//     } else {
//       res.status(500).send({ message: 'Error registering user', error });
//     }
//   }
// });



// // User Login


// app.post('/api/login', async (req, res) => {
//   try {
//     // const { username, password } = req.body;
//     // const user = await User.findOne({ username });
//     // if (!user || !(await user.comparePassword(password))) {
//     //   return res.status(401).send({ message: 'Invalid credentials' });
//     const { userId, password } = req.body;
//     const user = await Registration.findOne({ userId });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).send({ token });
//   } catch (error) {
//     res.status(500).send({ message: 'Error logging in', error });
//   }
// });


// // Admin  Registration

// app.post('/api/admin/register-admin', async (req, res) => {
//   try {
//     // Check if there are already 3 admins
//     const adminCount = await AdminReg.countDocuments();
//     if (adminCount >= 3) {
//       return res.status(400).json({ message: 'Admin registration limit reached' });
//     }

//     const { firstName, lastName, userId, email, dob, password, confirmPassword } = req.body;

//     // Ensure passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const newAdmin = new AdminReg({
//       firstName,
//       lastName,
//       userId,
//       email,
//       dob,
//       // password,
//       // confirmPassword,
//       password: hashedPassword,
//       confirmPassword: hashedPassword, // Ideally, confirmPassword shouldn't be saved
//     });
//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message || 'Server error' });
//   }
// });


// // Admin Login

// app.post('/api/admin/login', async (req, res) => {
//   try {
//     const { adminId, password } = req.body;

//     // Find the admin by adminId (which is userId in registration)
//     const admin = await AdminReg.findOne({ userId: adminId });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     // Check if password matches
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a token
//     // const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '1h' });
//     // res.status(200).json({ token });

//      // Generate a token or other login logic
//      const token = jwt.sign({ adminId: admin._id }, 'your_jwt_secret', { expiresIn: '1h' })
//      res.status(200).json({ token });


//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });





// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
