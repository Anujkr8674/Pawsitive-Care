import React, { useState,useEffect } from 'react';
import './Services.css'; // Make sure to use the correct CSS file for styling

const Services = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('personal');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="services">
      <h2>Pet Care Services</h2>
      <div className="service-menu">
        <button 
          className={`service-button ${selectedCategory === 'street' ? 'active' : ''}`} 
          onClick={() => handleCategoryChange('street')}
        >
          Street Animal
        </button>
        <button 
          className={`service-button ${selectedCategory === 'personal' ? 'active' : ''}`} 
          onClick={() => handleCategoryChange('personal')}
        >
           Pet Care
        </button>
      </div>

      <div className="services-list">
        {selectedCategory === 'personal' && (
          <>
            <div className="service-item">Training</div>
            <div className="service-item">Pet Grooming</div>
            <div className="service-item">Pet Boarding</div>
            <div className="service-item">Dog Walking</div>
            <div className="service-item">Quality Food</div>
          </>
        )}
        {selectedCategory === 'street' && (
          <>
            <div className="service-item">Street Animal Rescue</div>
            <div className="service-item">Street Animal Feeding</div>
            <div className="service-item">Street Animal Medical Care</div>
            <div className="service-item">Street Animal Shelter</div>
          </>
        )}
      </div>
    </section>
  );
}

export default Services;
