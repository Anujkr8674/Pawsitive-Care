import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './PetCare.css';

const PetCare = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewMore = () => {
    navigate('/PetAccessories'); // Redirect to PetAccessories page
  };
  return (
    <div className="pet-care-page">
      {/* Navbar */}
      {/* <div className="navbar">
        <h1>Pet Care</h1>
      </div> */}

      {/* Professional Pets Grooming Section */}
      <div className="header-section">
        <div className="text">
        <h1>Professional Pets  Care</h1>
        <p>We provide progessional services to your pet </p>
        <p>we Love Your pets,Your Pet Our Priority</p>
        <button className="appointment-btn1" onClick={()=>navigate("/appointment")}>Get Appointment</button>

        </div>
        
        <div className="background-image">
            {/* <img src="pics/bgDog.jpg" alt="Grooming" /> */}
        </div>
      </div>

      {/* All Pet Care Services */}
      {/* <div className="services-section">
        <h2>All Pet Care Services</h2>
        <div className="service-cards">
          <div className="service-card">Training</div>
          <div className="service-card">24/7 Support</div>
          <div className="service-card">Best Veterinarians</div>
          <div className="service-card">Quality Food</div>
          <div className="service-card">Grooming</div>
        </div>
      </div> */}

<section className="services-section">
        <h2>All Pet Care Services</h2>
        <div className="services-list">
          <div className="service-item">
            <img src="pics/dog6.jpg" alt="Pet Grooming" />
            <p>Traning</p>
          </div>
          <div className="service-item">
            <img src="pics/24.jpg" alt="Street Animal Care" />
            <p>24/7</p>
          </div>
          <div className="service-item">
            <img src="pics/dog7.jpg" alt="Medical Services" />
            <p>Medical Services</p>
          </div>
          <div className="service-item">
            <img src="pics/dog8.png" alt="Pet Products" />
            <p>Quality food</p>
          </div>
          <div className="service-item">
            <img src="pics/dog9.jpg" alt="Street Animal Care" />
            <p>Gromming</p>
          </div>
          <div className="service-item">
            <img src="pics/dog.jpeg" alt="Medical Services" />
            <p>Best Veterinarians</p>
          </div>
          
        </div>
      </section>

      {/* Meet Our Caring Team of Expert Veterinarians */}
      <div className="team-section">
  <div className="expert">
    <h2>Meet Our Caring Team of Expert Veterinarians</h2>
      <br/><br/>
    <div className="team-list">
      <div className="team-item">
        <img src="pics/Doc1.webp" alt="Veterinarian 1" />
        <p>Dr. Mike Brown</p><br/>
        <p6 id ="p6">Most Talented Pet Doctor Most Talented Pet Doctor Most Talented Pet Doctor </p6>
      </div>
      <div className="team-item">
        <img src="pics/Doc2.jpg" alt="Veterinarian 2" />
        <p>Dr. Mike Brown</p><br/>
        <p6 id ="p6">Most Talented Pet Doctor Most Talented Pet Doctor Most Talented Pet Doctor </p6>
      </div>
      <div className="team-item">
        <img src="pics/Doc3.jpeg" alt="Veterinarian 3" />
        <p>Dr. Mike Brown</p><br/>
        <p6 id ="p6">Most Talented Pet Doctor Most Talented Pet Doctor Most Talented Pet Doctor </p6>
      </div>
      <div className="team-item">
        <img src="pics/Doc4.png" alt="Veterinarian 4" />
        <p>Dr. Mike Brown</p><br/>
        <p6 id ="p6">Most Talented Pet Doctor Most Talented Pet Doctor Most Talented Pet Doctor </p6>
      </div>
    </div>
    <br/><br/>
    <button onClick={()=>navigate("/appointment")} className="appointment-btn">Book an Appointment</button>
  </div>
</div>


      {/* Shop Section */}
      <div className="shop-section">
  <h2>Discover a World of Stylish Pet Accessories And Pet Food in the Store</h2>
  
  <div className="shop-items">
    <div className="shop-item">
      <img src="pics/A3.jpg" alt="Toy 1" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <p>₹188 <span>Save 25%</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="shop-item">
      <img src="pics/F1.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="shop-item">
      <img src="pics/F2.webp" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    <div className="shop-item">
      <img src="pics/A3.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
    
   
  </div>

  <button className="View-More"onClick={handleViewMore}>View-More</button>
</div>


      {/* Footer */}
      
    </div>
  );
};

export default PetCare;
