require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');


// const nodemailer = require('nodemailer');   //for email

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// for appointment


const appointmentUploadDir = path.join(__dirname, 'uploadAppointment');
if (!fs.existsSync(appointmentUploadDir)) fs.mkdirSync(appointmentUploadDir);

// for orders
const orderUploadDir = path.join(__dirname, 'uploadOrders');
if (!fs.existsSync(orderUploadDir)) fs.mkdirSync(orderUploadDir);



const multer = require('multer');



const verifyToken = require('./middleware/verifyToken');


const authenticateToken = require('./middleware/authMiddleware');

// Models
const Appointment = require('./models/Appointment');
const PetAdoption = require('./models/petAdoption');
const Donation = require('./models/donation');
const Contact = require('./models/contact');
const Registration = require('./models/registrationFrom');
const AdminReg = require('./models/AdminReg');
const AdminLogin = require('./models/AdminLogin');
const Volunteer = require('./models/volunteer');
const UserReg = require('./models/userReg');
const user = require('./models/userlogin');
const Subscription = require('./models/Subscription');
const Review = require('./models/Review');
const Cart = require('./models/CartModel');

const Order = require('./models/Order');


// Routes
const volunteerRoutes = require('./routes/volunteers');
const petAdoptionRoutes = require('./routes/petadoption');
const adminRegistrationRoutes = require('./routes/AdminRegRoutes');
const appointmentsRoutes = require('./routes/appointments');
const contactsRoutes = require('./routes/contacts');
const donationsRoutes = require('./routes/donations');
const registrationsRoutes = require('./routes/registrations');
const userregRoutes = require('./routes/userReg');
const subscriptionsRoutes = require('./routes/subscription');
const reviewsRoute = require('./routes/reviews');
const cartRoutes = require('./routes/cartRoutes');

const ordersRoutes = require('./routes/orderRoutes')


const authRoutes = require('./routes/auth');
const petAdoption = require('./models/petAdoption');

const otpRoutes = require('./routes/otpRoutes');   //otp

const otpforgotRoutes = require('./routes/otpforgotRoutes');

// const otpadminforgotRoutes = require('./routes/otpadminforgotRoutes');

const adminRoutes = require('./routes/otpadminforgotRoutes');



const userFormsRoutes = require('./routes/forms');








// const adminRoutes = require('./routes/adminRoutes');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || '18e4e74072651732914140cc00ef10307e37fb012e31dc04fbf434bd84dd91aafdf54fea91dc0ed064e6c988a0f3c9704ed264c0bc5ec12b987c702003511b1b';

// // Environment Variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// Middleware
// CORS Configuration - Allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // In production, set FRONTEND_URL to your Vercel URL
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('combined')); // Logging middleware


app.use('/api/otp', otpRoutes); // Add OTP routes
app.use('/api', otpforgotRoutes); 
// app.use('/api', otpadminforgotRoutes);
app.use('/api', adminRoutes);


app.use('/api/user', userFormsRoutes);

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Rate Limiting - General limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Rate Limiting - More lenient for cart operations
const cartLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // Allow 50 requests per minute for cart operations
  message: 'Too many cart requests, please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate Limiting - Very lenient for order operations (critical operation)
const orderLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // Allow 20 order requests per minute
  message: 'Too many order requests, please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate Limiting - Lenient for login operations (important for user experience)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Allow 10 login attempts per 15 minutes per IP
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});

app.use(limiter);


// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    // Don't exit process, let server continue (for development)
  });

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Middleware to protect user routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Middleware to protect admin routes
const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });

    AdminReg.findById(decoded.adminId, (err, admin) => {
      if (err || !admin) {
        return res.status(403).send({ message: 'Access forbidden: Admins only' });
      }
      req.adminId = decoded.adminId; // Add admin ID to request object
      next();
    });
  });
};


app.options('*', cors());
app.use('/api/admin/petadoptions', petAdoptionRoutes);
app.use('/api/admin/adminregistrations', adminRegistrationRoutes);
app.use('/api/admin/appointments', appointmentsRoutes);
app.use('/api/admin/contacts', contactsRoutes);
app.use('/api/admin/donations', donationsRoutes);
app.use('/api/admin/registrations', registrationsRoutes);
app.use('/api/admin/volunteers', volunteerRoutes);
app.use('/api/admin/userregs', userregRoutes);
app.use("/api/admin/subscriptions", subscriptionsRoutes);
// app.use("/api/admin/adminregistrations")
app.use('/api/admin/orders', ordersRoutes);



// Add code

// reviews
// Use the reviews route
app.use("/api/admin/reviews", reviewsRoute);
// app.use("api/admin/carts", cartRoutes);
app.use('/api/admin/carts', cartRoutes);
// app.use('/api/admin/orsers', ordersRoutes);


// app.use('/api/otp', otpRoutes); // Add OTP routes


//  images

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null,UPLOADS_DIR); // Make sure the 'uploads' folder exists
    cb(null, path.join(__dirname, 'uploads')); // Ensure this path is correc
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, Date.now() + path.extname(file.originalname)); // File naming
  }
});

const upload = multer({ storage: storage });

// Serve the uploaded files
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//  app.use('/uploads', express.static(...));


// added done

// for appointment

// Set up multer for appointments
const appointmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appointmentUploadDir); // Save files in 'uploadAppointment'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename: timestamp + extension
  }
});
const appointmentUpload = multer({ storage: appointmentStorage });

// Set up multer for order payment proof uploads
const orderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploadOrders'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const orderUpload = multer({ 
  storage: orderStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

app.use('/uploadAppointment', express.static(path.join(__dirname, 'uploadAppointment')));
app.use('/uploadOrders', express.static(path.join(__dirname, 'uploadOrders')));





// user
 app.use('/api/auth/userlogin', authRoutes);



 app.use('/api/cart', cartLimiter, cartRoutes); // Apply cart-specific rate limiter
//  app.use('/api/user/orders', ordersRoutes);


// Routes
app.get('/', (req, res) => {
  res.send("Appointment API is running");
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});




app.get('/api/admin/petadoptions',  async (req, res) => {
  try {
    const petAdoption = await PetAdoption.find();
    // console.log('Fetched pet adoptions:', petAdoption); // Debugging
     res.json(petAdoption);
    //  res.send('petAdoptions data');
  } catch (err) {
    res.status(500).json(err);
  }
});




// Appointment upload route
app.post('/api/appointments/user/upload', appointmentUpload.single('appointmentImage'), async(req, res) => {
  try {
    const imageUrl = `/uploadAppointment/${req.file.filename}`;
    const appointments = await Appointment.find();
    res.status(201).json({ message: 'Image uploaded successfully!', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});




app.get('/api/admin/adminregs', async (req, res) => {
  try {
    const adminregs = await AdminReg.find();
    console.log(adminregs); // Log fetched admin registrations
    res.status(200).json(adminregs);
  } catch (err) {
    console.error('Error fetching admin registrations:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.get('/api/admin/contacts',  async (req, res) => {
  try {
    const contacts = await Contact.find();
    // console.log('Fetched pet adoptions:', petAdoption); // Debugging
     res.json(contacts);
    //  res.send('petAdoptions data');
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/admin/donations',  async (req, res) => {
  try {
    const donations = await Donation.find();
    // console.log('Fetched pet adoptions:', petAdoption); // Debugging
     res.json(donations);
    //  res.send('petAdoptions data');
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/api/admin/registrations',  async (req, res) => {
  try {
    const registrations = await Registration.find();
    // console.log('Fetched pet adoptions:', petAdoption); // Debugging
     res.json(registrations);
    //  res.send('petAdoptions data');
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/api/admin/volunteers',  async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    // console.log('Fetched pet adoptions:', petAdoption); // Debugging
     res.json(volunteers);
    //  res.send('petAdoptions data');
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.get('/api/admin/userregs',  async (req, res) => {
  try {
    const userregs = await UserReg.find();
    // console.log('Fetched pet userreg:', userregistration); // Debugging
     res.json(userregs);
    //  res.send('userregistration data');
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/admin/subscriptions', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Review

// Route to get all reviews
app.get('/api/admin/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Define GET route to retrieve all cart data
app.get('/api/admin/carts', async (req, res) => {
  try {
    const cart = await Cart.find();
     res.json(cart);
    // res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart data:', error);
    res.status(500).json({ error: 'Failed to retrieve cart data' });
  }
});




// user dashboard





// Fetch volunteer applications for the authenticated user
app.get('/api/user/volunteers', authenticateToken, async (req, res) => {
  try {
    // Fetch volunteer data where userId matches the authenticated user's ID
    const userVolunteers = await Volunteer.find({ userId: req.userId });
    res.status(200).json(userVolunteers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch volunteer applications.', error });
  }
});




// Fetch appointments for the authenticated user
app.get('/api/user/appointments', authenticateToken, async (req, res) => {
  try {
    // Fetch appointment data where userId matches the authenticated user's ID
    const userAppointments = await Appointment.find({ userId: req.userId });
    res.status(200).json(userAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments.', error });
  }
});


// Fetch all contact messages
app.get('/api/user/contacts', authenticateToken, async (req, res) => {
  try {
    const UserContacts = await Contact.find({ userId: req.userId});
    res.status(200).json(UserContacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact messages.', error: err });
  }
});



// Get donations
app.get('/api/user/donations', authenticateToken, async (req, res) => {
  try {
    // Fetch donation data where userId matches the authenticated user's ID
    const userDonations = await Donation.find({ userId: req.userId });
    res.status(200).json(userDonations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donation records.', error });
  }
});


//  orders 

app.get('/api/user/orders', authenticateToken, async (req, res) => {
  try {
    // Get the actual userId string from UserReg model using the MongoDB _id from token
    let userIdString = null;
    try {
      const user = await UserReg.findById(req.userId);
      if (user && user.userId) {
        userIdString = user.userId;
      } else {
        // Fallback: convert MongoDB ObjectId to string
        userIdString = req.userId.toString();
      }
    } catch (userError) {
      console.error('Error fetching user for orders:', userError);
      // Fallback: use the userId from token as string
      userIdString = req.userId.toString();
    }

    // Find orders by userId string
    const userOrders = await Order.find({ userId: userIdString });
    
    console.log(`Found ${userOrders.length} orders for userId: ${userIdString}`);
    
    res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch order records.', error: error.message });
  }
});


// app.post('/api/user/userregs', async (req, res) => {


  // app.get('/api/user/userregs/:id', authenticateToken, async (req, res) => {
  //   try {
  //     // Fetch user registration data where userId matches the authenticated user's ID
  //     const userRegistrations = await UserReg.find({ userId: req.params.userId});
  //     res.status(200).json(userRegistrations);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch user registration records.', error });
  //   }
  // });




  // app.get('/api/user/userregs/:userId', authenticateToken, async (req, res) => {
  //   try {
  //     // Fetch user registration data where userId matches the authenticated user's userId
  //     const userRegistrations = await UserReg.find({ userId: req.params.userId });
  //     if (userRegistrations.length === 0) {
  //       return res.status(404).json({ message: 'No registrations found for the provided userId' });
  //     }
  //     res.status(200).json(userRegistrations);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch user registration records.', error });
  //   }
  // });



  // app.get('/api/user/userregs/:userId', authenticateToken, async (req, res) => {
  //   try {
  //     // Fetch user registration data where userId matches the provided userId (string)
  //     const userRegistrations = await UserReg.findOne({ userId: req.params.userId });
      
  //     if (!userRegistrations) {
  //       return res.status(404).json({ message: 'User registration not found.' });
  //     }
      
  //     res.status(200).json(userRegistrations);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch user registration records.', error });
  //   }
  // });




  // app.get('/api/user/userregs/:id', authenticateToken, async (req, res) => {
  //   try {
  //     // Fetch user registration data where _id matches the provided id
  //     const userRegistration = await UserReg.findById(req.params.id);
      
  //     if (!userRegistration) {
  //       return res.status(404).json({ message: 'User registration not found.' });
  //     }
      
  //     res.status(200).json(userRegistration);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch user registration records.', error });
  //   }
  // });
  
  




//   app.get('/api/user/userregs/email/:email', authenticateToken, async (req, res) => {
//     try {
//         // Fetch user registration data where email matches the provided email
//         const userRegistration = await UserReg.findOne({ email: req.params.email });
        
//         if (!userRegistration) {
//             return res.status(404).json({ message: 'User registration not found.' });
//         }
        
//         res.status(200).json(userRegistration);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch user registration records.', error });
//     }
// });

  





  


  // app.get('/api/user/userregs/:id', authenticateToken, async (req, res) => {
  //   try {
  //     // Get the userId from the query parameter
  //     const userId = req.params.userId;
  
  //     // Check if the userId is provided
  //     if (!userId) {
  //       return res.status(400).json({ message: 'User ID is required.' });
  //     }
  
  //     // Fetch user registration data where userId matches the provided userId
  //     const userRegistrations = await UserReg.find({ userId: userId });
  //     res.status(200).json(userRegistrations);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch user registration records.', error });
  //   }
  // });
  



// Get pet adoption records
app.get('/api/user/petadoptions', authenticateToken, async (req, res) => {
  try {
    const userPetAdoptions = await PetAdoption.find({ userId: req.userId });
    res.status(200).json(userPetAdoptions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pet adoption records.', error });
  }
});











// Appointments
app.get('/api/appointments', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch appointments.', error });
  }
});



app.post('/api/user/appointments', authenticateToken, async (req, res) => {
  console.log("User ID from token:", req.userId);
  
  try {
    // Include the userId from the authenticated token in the appointment data
    const appointmentData = { ...req.body, userId: req.userId };

    // Create a new appointment instance with the appointmentData
    const appointment = new Appointment(appointmentData);

    // Save the appointment to the database
    await appointment.save();
    res.status(201).send({ message: 'Appointment booked successfully!' });
  } catch (error) {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Validation error.', error: error.message });
    }
    res.status(500).send({ message: 'Failed to book appointment.', error });
  }
});


// Volunteers
app.post('/api/user/volunteers', authenticateToken,  async (req, res) => {
  console.log("User ID from token:", req.userId);

  try {
    // const volunteerData = req.body;
    const volunteerData = { ...req.body, userId: req.userId };
    // const volunteer = new Volunteer(req.body);
    const volunteer = new Volunteer(volunteerData);
    await volunteer.save();
    res.status(201).send({ message: 'Volunteer application submitted successfully!' });
  } catch (error) {

    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Validation error.', error: error.message });
    }
    res.status(500).send({ message: 'Failed to submit volunteer application.', error });
  }
});


// Donations
app.post('/api/user/donations', authenticateToken, async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, donationType, amount,
      paymentMethod, paymentDetails, selectedItem, quantity, petSupplies
    } = req.body;

    console.log("User ID from token:", req.userId);  // Log user ID from token
    console.log(req.body);  // Log request body for debugging

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !donationType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Construct donation data with userId from token
    const donationData = {
      firstName,
      lastName,
      email,
      phone,
      donationType,
      amount,
      paymentMethod,
      paymentDetails: {
        cardNumber: paymentDetails?.cardNumber || '',
        cardExpiry: paymentDetails?.cardExpiry || '',
        cardCVV: paymentDetails?.cardCVV || '',
        upiId: paymentDetails?.upiId || ''
      },
      selectedItem,
      quantity,
      petSupplies,
      userId: req.userId  // Include userId in the donation data
    };

    // Create and save donation
    const donation = new Donation(donationData);
    await donation.save();

    res.status(201).json({ message: 'Donation submitted successfully!', donation });
  } catch (error) {

    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error.', error: error.message });
    }

    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});



  // Pet Adoption Route to handle form submission and image upload
app.post('/api/user/petadoptions', authenticateToken, upload.single('petImage'), async (req, res) => {
  try {
    // const petAdoptionFrom = new PetAdoption(req.body);
    const {firstName,
      lastName,
      email,
      phone,
      petName,
      address,
      address2,
      city,
      state,
      zip,
      country,
      referenceName,
      referenceEmail,
      referenceContactNo,
      
      
      ownPets,
      // add
      petName1,
      
      petBreed,
      // add end
      petDetails,
      veterinarianFirstName,
      veterinarianLastName,
  
  
      veterinarianPhone,
      homeOwnership,
      landlordInfo,
      yard,
     
      isFenced,
  
      petPolicy,
      // add code child
      surrendered,
      childrenHome,          
      hoursAlone,
      cratePet,
      emergencyPlan,
      behavioralIssues,
      animalCrimes,
      crimeDetails,
      date,
      amount,
      paymentMethod,
      signature,
      userId
    } = req.body;


    // Check if userId is present in the request
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to submit the adoption request.' });
    }

     // const petImage = req.file ? req.file.path : ''; // Save the file name if an image is uploaded
     const petImage = req.file ? `/${req.file.filename}` : '';

     const petAdoptionFrom = new petAdoption({
      // userId,
      userId: req.userId,
      firstName,
      lastName,
      email,
      phone,
      petName,
      address,
      address2,
      city,
      state,
      zip,
      country,
      referenceName,
      referenceEmail,
      referenceContactNo,
      
      
      ownPets,
      // add
      petName1,
      
      petBreed,
      // add end
      petDetails,
      veterinarianFirstName,
      veterinarianLastName,
  
  
      veterinarianPhone,
      homeOwnership,
      landlordInfo,
      yard,
     
      isFenced,
  
      petPolicy,
      // add code child
      surrendered,
      childrenHome,          
      hoursAlone,
      cratePet,
      emergencyPlan,
      behavioralIssues,
      animalCrimes,
      crimeDetails,
      date,
      amount,
      paymentMethod,
      signature,
      image: petImage,

    })
    await petAdoptionFrom.save();
    res.status(201).json({ message: 'Pet adoption request submitted successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit pet adoption request', details: err });
  }
});


// contact
app.post('/api/user/contact', authenticateToken, async (req, res) => {
  try {
    // Include the userId from the authenticated token in the contact data
    const contactData = { ...req.body, userId: req.userId };

    // Create a new contact instance with the contactData
    const contact = new Contact(contactData);

    // Save the contact to the database
    await contact.save();
    res.status(201).json({ message: 'Contact message submitted successfully!' });
  } catch (err) {
    // Check for validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error.', error: err.message });
    }
    res.status(500).json({ error: 'Failed to submit contact message', details: err });
  }
});



//  for Subscription


// Route to add a new subscription
app.post('/api/user/subscription', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already subscribed
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to subscribe', error });
  }
});

// Reviews

// Route to add a new review (without rating)
app.post('/api/user/reviews', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newReview = new Review({ name, email, message });
    await newReview.save();

    // res.status(201).json({ message: 'Review submitted successfully!' });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit review', error });
  }
});







// Place a new order
app.post('/api/user/orders', orderLimiter, authenticateToken, orderUpload.single('paymentProof'), async (req, res) => {
  try {
    // Extract the necessary data from the request body
    // Note: For FormData, we need to parse JSON strings
    let cartItems, address, totalAmount, orderType, requestUserId;
    
    if (req.body.cartItems) {
      // FormData request
      cartItems = typeof req.body.cartItems === 'string' ? JSON.parse(req.body.cartItems) : req.body.cartItems;
      address = typeof req.body.address === 'string' ? JSON.parse(req.body.address) : req.body.address;
      totalAmount = typeof req.body.totalAmount === 'string' ? parseFloat(req.body.totalAmount) : req.body.totalAmount;
      orderType = req.body.orderType;
      requestUserId = req.body.userId;
    } else {
      // JSON request (backward compatibility)
      ({ cartItems, address, totalAmount, orderType, userId: requestUserId } = req.body);
    }

    // Validate required fields
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required' });
    }
    if (!address || !address.name || !address.email || !address.mobile) {
      return res.status(400).json({ message: 'Valid address is required' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Valid total amount is required' });
    }

    // Get the actual userId string from UserReg model using the MongoDB _id from token
    let userIdString = requestUserId; // Use from request if provided
    if (!userIdString) {
      // If not provided, fetch from UserReg using the MongoDB _id from token
      try {
        const user = await UserReg.findById(req.userId);
        if (user && user.userId) {
          userIdString = user.userId;
        } else {
          // Fallback: convert MongoDB ObjectId to string
          userIdString = req.userId.toString();
        }
      } catch (userError) {
        console.error('Error fetching user:', userError);
        // Fallback: use the userId from request body or convert ObjectId to string
        userIdString = requestUserId || req.userId.toString();
      }
    }

    // Handle payment proof image upload for prepaid orders
    let paymentProofPath = null;
    if (req.file && orderType === 'Prepaid') {
      paymentProofPath = `/uploadOrders/${req.file.filename}`;
    }

    // Create a new order instance, including the userId string
    const newOrder = new Order({
      userId: userIdString,
      cartItems,
      address,
      totalAmount,
      orderType: orderType || 'Prepaid', // Default to Prepaid if not provided
      paymentProof: paymentProofPath, // Add payment proof path if uploaded
    });

    // Save the new order to the database
    await newOrder.save();
    
    // Return order details including order ID for QR code generation
    res.status(201).json({ 
      message: 'Order placed successfully',
      orderId: newOrder._id,
      order: newOrder
    });
  } catch (err) {
    // Check for validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error.', error: err.message });
    }
    console.error('Order placement error:', err);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});






// User Registration
app.post('/api/user/userregs', async (req, res) => {
  // console.log('Incoming registration data:', req.body); // Check if data is coming in
  try {
    const { firstName, lastName, userId, email, mobileNumber, dateOfBirth, password, confirmPassword } = req.body;

    // Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).send({ message: 'Passwords do not match' });
    }

    // Create a new registration object
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuserreg = new UserReg({
      firstName,
      lastName,
      userId,
      // regUserId,
      email,
      mobileNumber,
      dateOfBirth,
      password: hashedPassword,
      confirmPassword: hashedPassword

    });

    // Save the user to the database
    await newuserreg.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.code === 11000) {
      res.status(400).send({ message: 'User already exists' });
    } else {
      res.status(500).send({ message: 'Error registering user', error });
    }
  }
});







// User login

// User Login
app.post('/api/user/login', loginLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body; // Use 'identifier' instead of separate userId and email fields.

    // Ensure both fields are provided
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required' });
    }

    // Find the user by either userId or email.
    const user = await UserReg.findOne({
      $or: [{ userId: identifier }, { email: identifier }],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (bcryptError) {
      console.error('Error comparing password:', bcryptError);
      return res.status(500).json({ message: 'Error during authentication' });
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token if the credentials are valid.
    let token;
    try {
      token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    } catch (tokenError) {
      console.error('Error generating token:', tokenError);
      return res.status(500).json({ message: 'Error generating authentication token' });
    }

    // Fetch cart items for the user
    let cartItems = [];
    try {
      const cart = await Cart.findOne({ userId: user.userId });
      if (cart && cart.cartItems && Array.isArray(cart.cartItems)) {
        cartItems = cart.cartItems;
      }
    } catch (cartError) {
      console.error('Error fetching cart during login:', cartError);
      // Continue with empty cart if there's an error
    }

    // Send back the token, userId, email, and cartItems.
    res.status(200).json({ 
      token, 
      userId: user.userId, // Include the userId in the response
      email: user.email,
      cartItems: cartItems // Include cart items in the response
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});





// Admin Registration
app.post('/api/admin/register-admin', async (req, res) => {
  try {
    const adminCount = await AdminReg.countDocuments();
    if (adminCount >= 3) {
      return res.status(400).json({ message: 'Admin registration limit reached' });
    }

    const { firstName, lastName, adminId, email, dob, password, confirmPassword } = req.body;

    // Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new AdminReg({
      firstName,
      lastName,
      adminId,
      email,
      dob,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});



// Admin Login with AdminID or Email
app.post('/api/admin/login', loginLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Ensure both fields are provided
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required' });
    }

    // Find admin by either adminId or email.
    const admin = await AdminReg.findOne({
      $or: [{ adminId: identifier }, { email: identifier }],
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, admin.password);
    } catch (bcryptError) {
      console.error('Error comparing password:', bcryptError);
      return res.status(500).json({ message: 'Error during authentication' });
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    let token;
    try {
      token = jwt.sign({ adminId: admin._id }, SECRET_KEY, { expiresIn: '1h' });
    } catch (tokenError) {
      console.error('Error generating token:', tokenError);
      return res.status(500).json({ message: 'Error generating authentication token' });
    }

    res.status(200).json({ 
      token, 
      adminId: admin.adminId,
      email: admin.email
    }); // Return both token and adminId

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Dashboard (admin only)
app.get('/api/admin/dashboard', adminAuthMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    const volunteers = await Volunteer.find();
    const donations = await Donation.find();
    res.json({ appointments, volunteers, donations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard data.', error });
  }
});




app.patch('/api/admin/volunteers/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Assuming you have a Volunteer model to interact with the database
  Volunteer.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedVolunteer) => {
      if (!updatedVolunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
      res.status(200).json(updatedVolunteer);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});



app.patch('/api/admin/appointments/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Assuming you have an Appointment model to interact with the database
  Appointment.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedAppointment) => {
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.status(200).json(updatedAppointment);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});


app.patch('/api/admin/contacts/:id/status', (req, res) => {
  const { id } = req.params; // Get the contact ID from the request parameters
  const { status } = req.body; // Get the new status from the request body

  // Assuming you have a Contact model to interact with the database
  Contact.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedContact) => {
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(updatedContact); // Return the updated contact
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' }); // Send a server error response
    });
});



app.patch('/api/admin/donations/:id/status', (req, res) => {
  const { id } = req.params; // Get the donation ID from the request parameters
  const { status } = req.body; // Get the new status from the request body

  // Assuming you have a Donation model to interact with the database
  Donation.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedDonation) => {
      if (!updatedDonation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
      res.status(200).json(updatedDonation); // Return the updated donation
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' }); // Send a server error response
    });
});




app.patch('/api/admin/petadoptions/:id/status', (req, res) => {
  const { id } = req.params; // Get the pet adoption ID from the request parameters
  const { status } = req.body; // Get the new status from the request body

  // Assuming you have a PetAdoption model to interact with the database
  PetAdoption.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedPetAdoption) => {
      if (!updatedPetAdoption) {
        return res.status(404).json({ message: 'Pet adoption not found' });
      }
      res.status(200).json(updatedPetAdoption); // Return the updated pet adoption
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' }); // Send a server error response
    });
});





// Express route to update the status of an order
// app.patch('/api/admin/orders/:id/status', authenticateToken, async (req, res) => {
//   const { id } = req.params; // Get the order ID from the route parameters
//   const { status } = req.body; // Get the new status from the request body

//   try {
//     // Find the order by ID and update its status
//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true } // Return the updated document
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json(updatedOrder); // Respond with the updated order
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(500).json({ message: 'Failed to update order status', error: err });
//   }
// });





// // Assuming this is part of your existing route
// app.patch('/api/admin/orders/:id/status', authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body; // Expecting { status: "Delivered" }

//   try {
//     // Prepare an object to update
//     const updateData = { status };

//     // If the status is 'Delivered', set the delivery date
//     if (status === 'Delivered') {
//       updateData.deliveryDate = new Date(); // Set current date
//     }

//     // Update the order status and possibly the delivery date
//     const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(500).json({ message: 'Failed to update order status', error: err });
//   }
// });




// app.patch('/api/admin/orders/:id/status', authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const { status, cartItems } = req.body; // Expecting { status: "Delivered", cartItems: [...] }

//   try {
//     // Prepare an object to update
//     const updateData = { status };

//     // If the status is 'Delivered', set the delivery date
//     if (status === 'Delivered') {
//       updateData.deliveryDate = new Date(); // Set current date
//     }

//     // Update the order status
//     const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // If cartItems are provided, update their status in the order
//     if (cartItems && Array.isArray(cartItems)) {
//       updatedOrder.cartItems = updatedOrder.cartItems.map(item => {
//         const updatedItem = cartItems.find(cartItem => cartItem._id === item._id);
//         return updatedItem ? { ...item, status: updatedItem.status } : item;
//       });
//       await updatedOrder.save(); // Save the updated cart items
//     }

//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(500).json({ message: 'Failed to update order status', error: err });
//   }
// });





// app.patch('/api/admin/orders/:id/status', async (req, res) => {
//   const { cartItems, deliveryDate } = req.body;

//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Update each cart item status individually
//     cartItems.forEach(updatedItem => {
//       const item = order.cartItems.id(updatedItem._id); // Find the specific cart item by _id
//       if (item) {
//         item.status = updatedItem.status; // Update only the status of the selected item
//       }
//     });

//     // Update delivery date if applicable
//     if (deliveryDate) {
//       order.deliveryDate = deliveryDate;
//     }

//     await order.save(); // Save the order with updated items

//     res.status(200).json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });




// app.patch('/api/admin/orders/:id/status', async (req, res) => {
//   const { cartItems, deliveryDate } = req.body;

//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Update each cart item status and statusUpdateDate individually
//     cartItems.forEach(updatedItem => {
//       const item = order.cartItems.id(updatedItem._id); // Find the specific cart item by _id
//       if (item) {
//         item.status = updatedItem.status; // Update only the status
//         item.statusUpdateDate = updatedItem.statusUpdateDate || item.statusUpdateDate; // Update statusUpdateDate if provided
//       }
//     });

//     // Update delivery date if applicable
//     if (deliveryDate) {
//       order.deliveryDate = deliveryDate;
//     }

//     await order.save(); // Save the order with updated items

//     res.status(200).json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });



// app.patch('/api/admin/orders/:id/status', async (req, res) => {
//   const { cartItems, deliveryDate } = req.body;

//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Update each cart item status and statusUpdateDate individually
//     cartItems.forEach(updatedItem => {
//       const item = order.cartItems.id(updatedItem._id); // Find the specific cart item by _id
//       if (item) {
//         item.status = updatedItem.status; // Update only the status
//         item.statusUpdateDate = new Date(); // Set current date for status update
//       }
//     });

//     // Update delivery date if applicable
//     if (deliveryDate) {
//       order.deliveryDate = deliveryDate;
//     }

//     await order.save(); // Save the order with updated items

//     // Return the updated order
//     res.status(200).json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     console.error('Error updating order status:', error); // Log the error for debugging
//     res.status(500).json({ message: 'Server error', error });
//   }
// });






// app.patch('/api/admin/orders/:id/status', async (req, res) => {
//   const { cartItems, deliveryDate } = req.body;

//   try {
//     // Find the order by ID
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     console.log('Current Order:', order); // Log the current order before updates
//     console.log('Incoming Cart Items:', cartItems); // Log incoming cart items

//     // Update each cart item individually
//     cartItems.forEach(updatedItem => {
//       const item = order.cartItems.id(updatedItem._id); // Find the specific cart item by _id
//       if (item) {
//         console.log(`Updating item with ID: ${item._id}`); // Log which item is being updated
//         item.status = updatedItem.status; // Update only the status
//         item.statusUpdateDate = new Date(); // Set current date for status update
//       } else {
//         console.warn(`Item with ID: ${updatedItem._id} not found in the order`); // Log if item is not found
//       }
//     });

//     // Update delivery date if applicable
//     if (deliveryDate) {
//       order.deliveryDate = deliveryDate;
//     }

//     await order.save(); // Save the order with updated items

//     // Return the updated order
//     res.status(200).json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });



app.patch('/api/admin/orders/:id/status', async (req, res) => {
  const { cartItems, deliveryDate, status } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Current Order:', order); // Log the current order before updates
    console.log('Incoming Cart Items:', cartItems); // Log incoming cart items
    console.log('Incoming Status:', status); // Log incoming status

    // Update order status if provided
    if (status) {
      // Validate order status before updating
      const allowedOrderStatuses = [
        'Pending', 
        'Accepted',
        'Rejected', 
        'Processing', 
        'Shipped', 
        ' Transit',  // Note: includes leading space
        'Out for Delivery',
        'Delivered', 
        'Failed Delivery',
        'Return Initiated',
        'Return Picked Up',
        'Cancelled'
      ];
      
      if (allowedOrderStatuses.includes(status)) {
        order.status = status;
        console.log(`Order status updated to: ${status}`);
      } else {
        console.warn(`Invalid order status: ${status}. Allowed statuses:`, allowedOrderStatuses);
        // Don't throw error, just log warning - let Mongoose validation handle it
      }
    }

    // Update each cart item individually if cartItems provided
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      cartItems.forEach(updatedItem => {
        // Try multiple ways to find the item
        let item = null;
        
        // Method 1: Find by MongoDB _id using id() method
        if (updatedItem._id) {
          try {
            item = order.cartItems.id(updatedItem._id);
          } catch (e) {
            console.log('Error using id() method:', e);
          }
        }
        
        // Method 2: Find by matching _id string
        if (!item) {
          item = order.cartItems.find(cartItem => {
            const cartItemId = cartItem._id?.toString();
            const updatedItemId = updatedItem._id?.toString();
            return cartItemId === updatedItemId;
          });
        }
        
        // Method 3: Find by id field (product id)
        if (!item && updatedItem.id) {
          item = order.cartItems.find(cartItem => 
            String(cartItem.id) === String(updatedItem.id)
          );
        }
        
        // Method 4: Find by index if _id matches
        if (!item && updatedItem._id) {
          const index = order.cartItems.findIndex(cartItem => 
            cartItem._id?.toString() === updatedItem._id?.toString()
          );
          if (index !== -1) {
            item = order.cartItems[index];
          }
        }

        if (item) {
          console.log(`Updating item - Found: ${item._id || item.id}, New Status: ${updatedItem.status}`); 
          if (updatedItem.status) {
            // Validate status before updating
            const allowedStatuses = [
              'Pending', 
              'Accepted',
              'Rejected', 
              'Processing', 
              'Shipped', 
              ' Transit',  // Note: includes leading space
              'Out for Delivery',
              'Delivered', 
              'Failed Delivery',
              'Return Initiated',
              'Return Picked Up',
              'Cancelled'
            ];
            
            if (allowedStatuses.includes(updatedItem.status)) {
              item.status = updatedItem.status; // Update the status
              item.statusUpdateDate = new Date(); // Set current date for status update
            } else {
              console.warn(`Invalid status: ${updatedItem.status}. Allowed statuses:`, allowedStatuses);
              throw new Error(`Invalid status: ${updatedItem.status}`);
            }
          }
        } else {
          console.warn(`Item not found. Looking for:`, { 
            _id: updatedItem._id, 
            id: updatedItem.id,
            status: updatedItem.status 
          }); 
          console.warn('Available items in order:', order.cartItems.map(i => ({ 
            _id: i._id?.toString(), 
            id: i.id,
            name: i.name 
          })));
        }
      });
    }

    // Update delivery date if applicable
    if (deliveryDate) {
      order.deliveryDate = deliveryDate;
    }

    // Validate before saving
    try {
      await order.save(); // Save the order with updated items
      console.log('Order saved successfully');
    } catch (saveError) {
      console.error('Error saving order:', saveError);
      // Check if it's a validation error
      if (saveError.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error', 
          error: saveError.message,
          details: Object.keys(saveError.errors || {}).map(key => ({
            field: key,
            message: saveError.errors[key].message
          }))
        });
      }
      throw saveError; // Re-throw if not validation error
    }

    // Return the updated order
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// // Route to cancel an order item
// // app.put('/cancel-order/:orderId/:itemId', async (req, res) => {
//   app.put('/api/user/cancel-order/:orderId/:itemId', async (req, res) => {

//   try {
//     const { orderId, itemId } = req.params;

//     // Find the order by ID
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Find the item within the order's cartItems
//     const itemIndex = order.cartItems.findIndex(item => item._id.toString() === itemId);
//     if (itemIndex === -1) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     // Update the itemStatus to 'Cancelled'
//     order.cartItems[itemIndex].itemStatus = 'Cancelled';

//     // Save the updated order
//     await order.save();

//     res.status(200).json({ message: 'Order item cancelled successfully' });
//   } catch (error) {
//     console.error('Error cancelling order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });








// Cancel Order Item and Set Estimated Pickup Date
app.put('/api/user/cancel-order/:orderId/:itemId', async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the item within the order's cartItems
    const itemIndex = order.cartItems.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update the itemStatus to 'Cancelled'
    order.cartItems[itemIndex].itemStatus = 'Cancelled';

    // Set the estimated pickup date to 5 days from the current date
    const cancellationDate = new Date();
    const estimatedPickupDate = new Date(cancellationDate);
    estimatedPickupDate.setDate(cancellationDate.getDate() + 5); // Add 5 days

    order.cartItems[itemIndex].estimatedPickupDate = estimatedPickupDate;

    // Save the updated order
    await order.save();

    res.status(200).json({
      message: 'Order item cancelled successfully',
      estimatedPickupDate: estimatedPickupDate, // Return the new pickup date
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// User Dashboard - Fetch user-specific data
app.get('/api/user/dashboard', authenticateToken, async (req, res) => {
  try {
    // The user ID should be available from the authenticated token set by `authenticateToken`
    const userId = req.user.id; // `authenticateToken` middleware sets `req.user`

    // Fetch appointments, volunteers, and donations related to the authenticated user
    const appointments = await Appointment.find({ userId });
    const volunteers = await Volunteer.find({ userId });
    const donations = await Donation.find({ userId });
    const contacts = await Contact.find({userId})

    // Send the fetched data back to the user
    res.json({ appointments, volunteers, donations, contacts });
    // res.json({ appointments, volunteers, donations,  });
  } catch (error) {
    console.error('Error fetching user dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data.', error });
  }
});






// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).send({ message: 'Resource not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
