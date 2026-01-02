import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import axios from 'axios'; // Add axios for API requests
import { API_ENDPOINTS } from '../config/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Send a POST request to the backend
      // const response = await axios.post('http://localhost:5000/api/subscribe', { email });
      const response = await axios.post(API_ENDPOINTS.SUBSCRIPTION, { email });

      if (response.status === 200) {
        setSuccess('Subscription successful!');
        alert('Thank you for subscribing!');  // Alert message
        
        // Clear the email input after success
        setEmail(''); 

        // Optional: Reload the page to reset state (this may not be needed if setEmail works)
        // window.location.reload(); 

      }
    } catch (err) {
      setError('There was a problem with your subscription. Please try again.');
    }
  };
  


  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About the store section */}
        <div className="footer-section about-store">
          <h3>About Pawsitive Care</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="./aboutus">About us</a></li>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Return policy</a></li>
            <li><a href="./contact">Contact us</a></li>
          </ul>
        </div>

        {/* Language section */}
        <div className="footer-section language">
          {/* <h3>Language</h3> */}
          <h3>Quick Links</h3>
          <ul>
            
            {/* <li><a href="#" className="active">English</a></li> */}
            <li><a href="appointment">Appointment</a></li>
            {/* <li><a href="adopt">adopt</a></li> */}
            <li><a href="PetAdoptionForm">Adoption From</a></li>
            {/* <li><a href=" donation"> Donation</a></li> */}
            <li><a href=" volunteer"> volunteer</a></li>
            <li><a href=" Donate"> Donate</a></li>
            <li><a href=" shop"> Shop Now</a></li>
            
           
          
          </ul>
        </div>

        {/* Get in touch section */}
        {/* <div className="footer-section get-in-touch">
          <h3>Get in touch</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div> */}

<div className="footer-section get-in-touch">
  <h3>Get in touch</h3>

  {/* <!-- Social icons section with links --> */}
  <div className="social-icons">

  <a 
      href="https://www.google.com/maps/place/Biyoans+PVT.+LTD/@23.997673,85.3739383,16.12z/data=!4m6!3m5!1s0x39f49df0ed222d7b:0xe5317a0d8eb9d481!8m2!3d23.9980749!4d85.3765369!16s%2Fg%2F11vcm5769c?authuser=0&entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faMapMarkerAlt} />
    </a>

    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      
      <FontAwesomeIcon icon={faFacebookF} />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faInstagram} />
    </a>

    
  </div>
  <br/>

  {/* <!-- Subscribe section --> */}
  <div className="subscribe-section">
    <input 
      id='in'
      type="email" 
      className="subscribe-input" 
      placeholder="Enter your email" 
      value={email}
      onChange={handleEmailChange}
      required 
    />
    <br/>  <br/> 
    {/* <button id='in1' className="subscribe-button">Subscribe</button> */}
    <button id="in1" className="subscribe-button" onClick={handleSubscribe}>
      Subscribe
    </button>
    {error && <p className="error">{error}</p>}
    {success && <p className="success">{success}</p>}
  </div>
</div>

      </div>

      <div className="footer-bottom">
        <p>Terms of purchase | Security and privacy | Newsletter</p>
      </div>
    </footer>
  );
};

export default Footer;
