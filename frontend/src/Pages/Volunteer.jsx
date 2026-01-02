import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './Volunteer.css'; // Ensure this imports the updated CSS file

const Volunteer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    petName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    references: [
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
    ],
    skills: [],
    daysOfWork: [],
    skillInput: "",
    commentsInput: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [errors, setErrors] = useState({}); 

  const countries = ["India", "USA", "Canada", "UK", "Australia"];
  const skillsOptions = ["First Aid", "Teaching", "Financial Aid", "IT", "Childcare", "Special Needs", "Law & Human Rights"];
  const daysOfWorkOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleChange = (e) => {
    const { name, value } = e.target;
      // Convert email to lowercase if the field being updated is 'email'
      // const updatedValue = name === 'email' ? value.toLowerCase() : value;
      let updatedValue = value;
      if (name === 'email') {
        updatedValue = value.toLowerCase();
      } else if (name === 'phone') {
        updatedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      }


    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    setFormData(prevState => {
      const updatedList = checked
        ? [...prevState[category], name]
        : prevState[category].filter(item => item !== name);

      return { ...prevState, [category]: updatedList };
    });
  };



  const validateForm = () => {
    const formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone numbers

    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.email || !emailRegex.test(formData.email)) formErrors.email = "A valid email is required.";
    if (!formData.phone || !phoneRegex.test(formData.phone)) formErrors.phone = "A valid phone number is required.";
    // if (!formData.email)  formErrors.email = "A valid email is required.";
    // if (!formData.phone) formErrors.phone = "A valid phone number is required.";
    if (!formData.address) formErrors.address = "Street address is required.";
    if (!formData.city) formErrors.city = "City is required.";
    // if (!formData.state) formErrors.state = "State is required.";
    if (!formData.zip) formErrors.zip = "Zip code is required.";
  //   if (!formData.country) formErrors.country = "Country is required.";
  //   // Add more validation as needed

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  // if (!validateForm()) return; // Prevent submission if there are validation errors



  const handleSubmit = async (e) => {   
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if there are validation errors


   // const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const userId = localStorage.getItem('userId');
  // const email = localStorage.getItem('email');

  console.log("Token in Volunteer:", token); // Log the token value

  // if ( !token) {
    if (!token || !userId) {
    alert('User authentication details are missing. Please log in again.');
    return;
  }


    try {
      // Prepare volunteer data - map formData to backend schema
      // Convert skills array to string and map fields correctly
      const volunteerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        // Map skillInput to skills (convert to string)
        skills: formData.skillInput || (formData.skills && Array.isArray(formData.skills) ? formData.skills.join(', ') : ''),
        // Map commentsInput to message
        message: formData.commentsInput || '',
        experience: '', // Add if you have this field in the form
        availability: formData.daysOfWork && Array.isArray(formData.daysOfWork) && formData.daysOfWork.length > 0 ? formData.daysOfWork.join(', ') : '',
        userId,
      };

      const response = await axios.post(API_ENDPOINTS.USER_VOLUNTEERS, volunteerData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request header
        },
  
      });
  
      if (response.status === 201) {
        alert('Volunteer application submitted successfully!');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          petName: "",
          address: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          references: [
            { name: "", email: "", phone: "" },
            { name: "", email: "", phone: "" },
            { name: "", email: "", phone: "" },
          ],
          skills: [],
          daysOfWork: [],
          skillInput: "",
          commentsInput: "",
        });
      }
    } catch (error) {
      console.error('There was an error submitting the application:', error);
      alert('Failed to submit application. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Volunteer Form</h2>
      <br/>
      <h4>Name</h4>

      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
           {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
           {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>

      <br/>

      <h4>Contact Info *</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            maxLength={10}
            minLength={10}
            onChange={handleChange}
            required
          />
           {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>
      <br/>

      <h4>Address *</h4>
      <div className="form-group">
        <label> Street Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
         {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <br/><br/>
      <div className="form-group">
        <label>Street Address Line 2</label>
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
            required
          />
           {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
      </div><br/>

      <div className="form-row">
        <div className="form-group">
          <label>Zip Code *</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            maxLength={6}
            onChange={handleChange}
            required
          />
           {errors.zip && <span className="error">{errors.zip}</span>}
        </div>
        <div className="form-group">
          <label>Country *</label>
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
        </div>
      </div>

      <br/>

      <h4>Skills & Days of Work</h4>
      <div className="checkbox-container">
        <div className="form-column">
          {skillsOptions.map((skill, index) => (
            <div key={index} className="form-group-checkbox">
              <input
                type="checkbox"
                name={skill}
                checked={formData.skills.includes(skill)}
                onChange={(e) => handleCheckboxChange(e, "skills")}
              />
              <label>{skill}</label>
            </div>
          ))}
        </div>
        <div className="form-column">
          {daysOfWorkOptions.map((day, index) => (
            <div key={index} className="form-group-checkbox">
              <input
                type="checkbox"
                name={day}
                checked={formData.daysOfWork.includes(day)}
                onChange={(e) => handleCheckboxChange(e, "daysOfWork")}
              />
              <label>{day}</label>
            </div>
          ))}
        </div>
      </div>

      <br/>

      <h4>Skillsets or Area of Interests</h4>
      <div className="form-group">
        <input
          id="skillInput"
          type="text"
          name="skillInput"
          value={formData.skillInput}
          onChange={handleChange}
        />
      </div>

      <h4>Comments</h4>
      <div className="form-group" id="skill">
        <input
          id="commentsInput"
          type="text"
          name="commentsInput"
          value={formData.commentsInput}
          onChange={handleChange}
        />
      </div>
      <br/><br/>

      <button type="submit">Submit Application</button>
    </form>
  );
};

export default Volunteer;
