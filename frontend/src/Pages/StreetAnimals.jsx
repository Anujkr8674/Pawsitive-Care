import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './StreetAnimals.css';

const StreetAnimal = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const handleNavigateAdopt = () => {
    navigate('/adopt');
  };

  const handleNavigateDonate = () => {
    navigate('/donate');
  };

  const handleNavigateVolunteer = () => {
    navigate('/volunteer'); // Updated the path for volunteering
  };

  return (
    <div className="street-animal-page">
      <div className="header-section1">
        <h1>A BETTER LIFE FOR INDIA’S STRAY ANIMALS</h1>
        <p className="header-paragraph">Give a Homeless Animal a Loving Home</p> {/* Paragraph just below button */}
        <button className="adopt-btn-header" onClick={handleNavigateAdopt}>Adopt Now</button> {/* Adopt Button just below h1 */}
        <button className="donate-btn-header" onClick={handleNavigateDonate}>Donate Now</button>

        {/* Background Image for the Header Section */}
        <div className="background-image"></div>
      </div>

      <div className="services-section">
        <h2>Give a shelter to Homeless Animals</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src="pics/dog14.png" alt="Well-Trained Animal" />
            <button id='bt2' typeof='submit' onClick={handleNavigateDonate}>Donate</button>
          </div>
          <div className="service-card">
            <img src="pics/dog16.jpg" alt="Healthy Food" />
            <button id='bt2' typeof='submit' onClick={handleNavigateAdopt}>Adopt</button>
          </div>
          <div className="service-card">
            <img src="pics/dog17.jpg" alt="Fully Vaccinated" />
            <button id='bt2' typeof='submit' onClick={handleNavigateVolunteer}>Volunteer</button>
          </div>
        </div>
      </div>

      <br /> <br />

      <div className="features-section">
        <div className="feature-box">
          <img src="pics/dog2.jpg" alt="our impact" className="impact-image" />
          <div className="feature-text">
            <h2>79.9 Million Animals at Risk</h2>
            <p id='p20'>In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
            </p>
            {/* <button id='btn5' className="about-btn">About Us</button> */}
          </div>
        </div>

        <div className="impact-box">
          <div className="impact-text">
            <h2>Housing, Care, & More for India’s Most Vulnerable</h2>
            <p id='p20'>In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
              In India, street dogs are misunderstood as dangerous, savage animals. SAFI works alongside India's local shelters to rescue, rehabilitate, vaccinate, and house these strays in need.
            </p><br/>
            <p id='p20'>Since 2020, we’ve helped build up India’s animal welfare infrastructure, providing medical care, food, forever home matching, education, and much more. Your tax-deductible donation helps us fight for stray animals in India.</p>
            {/* <button id='btn5' className="impact-btn">See Our Impact</button> */}
          </div>
          <img src="pics/dog1.jpg" alt="Our Impact" className="impact-image" />
        </div>
      </div>

      <br /> <br />

      <div className="adoption-section">
        <div className="adoption-content">
          <div className="text-section">
            <h3 className='head'>Pet Adoption is a Big <br /> and Good Deed</h3>
            <p>"Help us provide shelter, food, <br /> and care for homeless animals."</p>
            <br/><button className="donate-btn1" onClick={handleNavigateDonate}>Donate Now</button>
            <br/><br/>
            <button className="adopt-btn1" onClick={handleNavigateAdopt}>Adopt a Pet</button>
          </div>
          <div className="image-section1">
            <img src="pics/dog20.png" alt="Adoption" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetAnimal;
