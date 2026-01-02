import React from 'react';
import './About.css';

const PAbout = () => {
  return (
    <div className="pet-care-container">
      <header className="header">
        <h1 className="main-title">Welcome to [Your Pet Care Name]</h1>
        <p className="subtitle">Caring for Your Pets Like Family</p>
      </header>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          [Your Pet Care Name] is your trusted partner in providing top-quality care for your furry friends. Whether you're looking for reliable pet sitting, grooming, or health services, we are here to ensure your pet's happiness and well-being.
        </p>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services">
          <div className="service">
            <h3>Pet Boarding</h3>
            <p>Comfortable, safe, and loving environment while you're away.</p>
          </div>
          <div className="service">
            <h3>Grooming</h3>
            <p>Professional grooming for your pet's health and well-being.</p>
          </div>
          <div className="service">
            <h3>Daycare</h3>
            <p>A fun and stimulating environment for your pets during the day.</p>
          </div>
          <div className="service">
            <h3>Veterinary Care</h3>
            <p>Routine checkups, vaccinations, and emergency care.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Testimonials</h2>
        <div className="testimonial">
          <p>
            "Absolutely love the care my dog receives at [Your Pet Care Name]. The team is incredibly loving and attentive, and I always feel at ease knowing my pet is in good hands."
          </p>
          <p>- Sarah J., Happy Pet Parent</p>
        </div>
        <div className="testimonial">
          <p>
            "The grooming service is fantastic! My cat looks amazing, and she’s always calm and comfortable after her grooming session."
          </p>
          <p>- David M., Satisfied Client</p>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@yourpetcare.com</p>
        <p>Address: 123 Pet Care Lane, Animal City, State, ZIP</p>
      </section>

      <footer className="footer">
        <p>Follow Us on Social Media</p>
        <div className="social-icons">
          <span>Facebook Icon</span>
          <span>Instagram Icon</span>
          <span>Twitter Icon</span>
        </div>
      </footer>
    </div>
  );
};

export default PAbout;
