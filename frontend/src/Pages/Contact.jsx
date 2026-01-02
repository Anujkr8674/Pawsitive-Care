
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import './Contact.css'; // Import the CSS file for styling

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'email' ? value.toLowerCase() : value;
    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) formErrors.email = "Invalid email address";
    if (!formData.contactNo.match(/^\d{10}$/)) formErrors.contactNo = "Contact number must be 10 digits";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required";
    if (!formData.message.trim()) formErrors.message = "Message is required";

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('User authentication details are missing. Please log in again.');
      return;
    }

    try {
      const updatedFormData = { ...formData, userId };

      // console.log('Sending data:', updatedFormData); // Log data being sent for debugging

      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', contactNo: '', subject: '', message: '' });
        setErrors({});
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`); // Display error from the server
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending your message.');
    }
  };

  return (
    <section className="contact-us">
      <div className="form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group2">
            <label htmlFor="contactNo">Contact-No:</label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              maxLength={10}
              minLength={10}
              placeholder="Enter your contact number"
              pattern="\d{10}"
            />
            {errors.contactNo && <span className="error">{errors.contactNo}</span>}
          </div>
          <div className="form-group2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group2">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>
          <div className="form-group2">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
