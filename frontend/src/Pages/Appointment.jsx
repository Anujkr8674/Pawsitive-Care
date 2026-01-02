import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './Appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    
    // Pet's Information
    petFirstName: "",
    petLastName: "",
    breed: "",
    age: "",
    date: "",
    signature: "",
    gender: "",    // Gender is now part of formData
    service: ""    // Service is now part of formData
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const countries = ["India", "USA", "Canada", "UK", "Australia"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // // Handle form data change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };




  const validate = () => {
    const newErrors = {};
    const { 
      firstName,
      lastName,
      email,
      phone,
      address1,
      city,
      state,
      zip,
      country,
      petFirstName,
      breed,
      age,
      date,
      signature,
      gender,
      service
    } = formData;





     // First Name validation
     if (!/^[a-zA-Z]{2,30}$/.test(firstName)) {
      newErrors.firstName = "First name must be 2-30 letters.";
    }

    // Last Name validation
    if (!/^[a-zA-Z]{2,30}$/.test(lastName)) {
      newErrors.lastName = "Last name must be 2-30 letters.";
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }

    // Phone Number validation
    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Address1 validation
    if (!/^[a-zA-Z0-9\s.,+'  -/#]{5,100}$/.test(address1)) {
      newErrors.address1 = "Address line 1 must be between 5 and 100 characters.";
    }

    // City validation
    if (!/^[a-zA-Z0-9\s.,+'  -/#]{2,50}$/.test(city)) {
      newErrors.city = "City name must be 2-50 letters.";
    }

    // State validation
    if (!/^[a-zA-Z0-9\s.,+'  -/#]{2,50}$/.test(state)) {
      newErrors.state = "State name must be 2-50 letters.";
    }

    // Zip Code validation (USA example)
    if (country === "USA" && !/^\d{6}(-\d{4})?$/.test(zip)) {
      newErrors.zip = "ZIP code must be in six digits ";
    }

    // Country validation
    if (!country) {
      newErrors.country = "Country is required.";
    }

    // Pet First Name validation
    if (!/^[a-zA-Z]{2,30}$/.test(petFirstName)) {
      newErrors.petFirstName = "Pet first name must be 2-30 letters.";
    }

    // Breed validation
    if (!/^[a-zA-Z\s]{2,50}$/.test(breed)) {
      newErrors.breed = "Breed must be 2-50 letters.";
    }

    // Age validation
    if (age < 0 || isNaN(age)) {
      newErrors.age = "Age must be a positive number.";
    }

    // Date validation (ensure date is in the future)
    if (new Date(date) <= new Date()) {
      newErrors.date = "Date must be in the future.";
    }

    // Signature validation
    if (!/^[\w\s]{5,100}$/.test(signature)) {
      newErrors.signature = "Signature must be between 5 and 100 characters.";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    // Service validation
    if (!service) {
      newErrors.service = "Service selection is required.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "email") {
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else if (name === "phone" || name === "age" || name === "zip") {
      setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


   // Handle image upload
   const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);


      // // Upload the image to the backend
      // const formData = new FormData();
      // formData.append('appointmentImage', file);

      // try {
      //   const response =  axios.post('http://localhost:5000/api/appointments/upload', formData, {
      //     headers: { 'Content-Type': 'multipart/form-data' }
      //   });
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     image: response.data.imageUrl, // Save the image URL in formData
      //   }));
      // } catch (error) {
      //   console.error('Image upload failed:', error);
      // }


      // Upload the image to the backend
          const formData = new FormData();
          formData.append('appointmentImage', file);

          try {
            const response = await axios.post(API_ENDPOINTS.APPOINTMENT_UPLOAD, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.data && response.data.imageUrl) {
              setFormData((prevData) => ({
                ...prevData,
                image: response.data.imageUrl, // Save the image URL in formData
              }));
            } else {
              console.error('Unexpected response structure:', response.data);
            }
          } catch (error) {
            console.error('Image upload failed:', error);
          }

    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;




  //   // Email validation
  //   if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Email address is invalid.";
  //   }

  //   // Phone number validation (example pattern)
  //   if (!/^\d{10}$/.test(phone)) {
  //     newErrors.phone = "Phone number must be 10 digits.";
  //   }

  //   // Zip code validation (example pattern based on country)
  //   if (formData.country === "USA" && !/^\d{5}(-\d{4})?$/.test(zip)) {
  //     newErrors.zip = "ZIP code must be in the format 12345 or 12345-6789.";
  //   }

  //   // Date validation (ensure date is in the future)
  //   if (new Date(date) <= new Date()) {
  //     newErrors.date = "Date must be in the future.";
  //   }

  //   // Age validation
  //   if (age < 0) {
  //     newErrors.age = "Age must be a positive number.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "email") {
  //     setFormData({ ...formData, [name]: value.toLowerCase() });
  //   } else if (name === "phone" || name === "age") {
  //     // Ensure numeric input for phone and age
  //     setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '') });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };




  // // Handle image upload
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();



    // if (!validate()) return;

    const token = localStorage.getItem('token'); // Get the token from localStorage
    // const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
  
    console.log("Token in Donate:", token); // Log the token value
  
    // if ( !token) {
      if (!token || !userId) {
      alert('User authentication details are missing. Please log in again.');
      return;
    }
    

    try {
      const formDataWithUserId = { ...formData, userId };
      const response = await axios.post(API_ENDPOINTS.USER_APPOINTMENTS, formDataWithUserId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 201) {
        alert('Appointment booked successfully!');
        // Reset form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          petFirstName: "",
          petLastName: "",
          breed: "",
          age: "",
          date: "",
          signature: "",
          gender: "",
          service: "",
          image: "",
        });
        setImagePreview("");
      }
    } catch (error) {
      console.error('There was an error booking the appointment:', error);
      alert('Failed to book appointment. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pet Service Appointment Form</h2>
      
      {/* Owner's Name */}
      <h4>Owner's Name</h4>
      <div className="form-row">
        <div className="form-group">
          <label id='label1'>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label id='label1'>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
      </div>

      <br/>

      {/* Contact Information */}
      <h4>Contact info*</h4>
      <div className="form-row">
        <div className="form-group">
          <label id='label1'>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label id='label1'>Phone *</label>
          <input
            type="tel"
            name="phone"
            // pattern='[0-9]'
            value={formData.phone}
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
      </div>

      <br/>

      {/* Address */}
      <h4>Address*</h4>
      <div className="form-group">
        <label id='label1'>Address 1 *</label>
        <input
          type="text"
          name="address1"  
          value={formData.address1}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9\s.,+'  -/#]*$"
          title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
          
          required
        />
         {errors.address1 && <p className="error">{errors.address1}</p>}
      </div>
      <br/><br/>
      <div className="form-group">
        <label id='label1'>Address 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <br/><br/>
      <div className="form-row">
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            pattern="^[a-zA-Z0-9\s.,+  '-/#]*$"
            title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
            
            required
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label id='label1'>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            pattern="^[a-zA-Z0-9\s.,'-/#]*$"
            title="Address can contain letters, numbers, spaces, and special characters like . , ' - / #"
            
            required
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
      </div><br/>
      <div className="form-row">
        <div className="form-group">
          <label id='label1'>Zip Code *</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            maxLength={6}
            minLength={6}
            required
          />
          {errors.zip && <p className="error">{errors.zip}</p>}
        </div>
        <div className="form-group">
          <label id='label1'>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
      </div>
      <br/><br/>

      {/* Pet's Information */}
      <h2>Pet's Information</h2>
      <div className="form-row">
        <div className="form-group">
          <label id='label1'>Pet First Name *</label>
          <input
            type="text"
            name="petFirstName"
            value={formData.petFirstName}
            onChange={handleChange}
            required
          />
          {errors.petFirstName && <p className="error">{errors.petFirstName}</p>}
        </div>
        <div className="form-group">
          <label id='label1'> Pet Last Name *</label>
          <input
            type="text"
            name="petLastName"
            value={formData.petLastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <br/>
      <br/>
      <div className="form-group">
        <label id='label1'>Breed *</label>
        <input
          id='label2'
          type="text"
          name="breed"  // Fixed field name to match the formData
          value={formData.breed}
          onChange={handleChange}
          required
        />
         {errors.breed && <p className="error">{errors.breed}</p>}
      </div>
      <br/><br/>
      <div className="form-group">
        <h4>Pet's age *</h4>
        <input
          id='label2'
          type="number"
          name="age"  
          placeholder="ex - 3"
          value={formData.age}
          onChange={handleChange}
          required
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <br/>

      {/* Gender Selection */}
      <h4>Select Gender</h4>
      <div className="form-group-radio">
        <label>
          <input
            id="radio"
            type="radio"
            name="gender"  // Name should match formData field
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}  // Use handleChange for direct update
          />
           {errors.gender && <p className="error">{errors.gender}</p>}
          Male
        </label>
      </div>
      <div className="form-group-radio">
        <label>
          <input
            id="radio"
            type="radio"
            name="gender"  // Name should match formData field
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
           {errors.gender && <p className="error">{errors.gender}</p>}
          Female
        </label>
      </div>
      
      {/* Image Upload */}
      <h4>Upload Image</h4>
      <div className="form-group">
        <input
          id='file'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {imagePreview && (
        <div id='img11' className="image-preview">
          <img id='img11' src={imagePreview} alt="Preview" />
        </div>
      )}

      <br/>

      {/* Service Selection */}
      <h4>Select Service</h4>
      <div className="form-group">
        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="">Select Service</option>
          <option value="Grooming">Grooming</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Training">Training</option>
          <option value="Check-up">Check-up</option>
        </select>
        {errors.service && <p className="error">{errors.service}</p>}
      </div>
      <br/>
      
      <div className="form-group">
        <label id='label1'>Appointment Date *</label>
        <br/>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>

      <br/><br/><br/>
      {/* Signature */}
      <div className="form-group">
        <label id='label1'>Signature *</label>
        <input
          id='label2'
          type="text"
          name="signature"
          value={formData.signature}
          onChange={handleChange}
          required
        />
         {errors.signature && <p className="error">{errors.signature}</p>}
      </div>
      <br/>
      <br/>

      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default Appointment;
