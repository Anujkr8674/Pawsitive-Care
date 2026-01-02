//import React, { useState } from 'react';
import React,{useEffect} from 'react';
import './ShopNow.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ShopNow() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  
  const handleViewMore = () => {
    navigate('/PetAccessories');
     // Redirect to PetAccessories page
  };
 
  const handleViewAll = () => {
    navigate('/PetFood');
     // Redirect to PetFood page
  };
 
  

  return (
    <>
      <section className="donations-header1">
        <div className="Shero-content">
          <h1>UPTO 60% OFF, We Make</h1><h1> Shopping Easy</h1>
        </div>
      </section>

      <div className="Steam-section">
  <div className="Sexpert">
    <h2>Shop Category</h2>
      
    <div className="Steam-list">
      <div className="Steam-item">
        <img src="pics/dog26.webp" alt="Veterinarian 1" />
        <p>Dog Accessories</p><br/>
      </div>
      <div className="Steam-item">
        <img src="pics/dog27.jpg" alt="Veterinarian 2" />
        <p>Cat Accessories</p><br/>
      </div>
      <div className="Steam-item">
        <img src="pics/dog30.jpg" alt="Veterinarian 3" />
        <p>Dog Food</p><br/>
      </div>
      <div className="Steam-item">
        <img src="pics/cat1.png" alt="Veterinarian 4" />
        <p>Cat Food</p><br/>
      </div>
    </div>
    <br/><br/>
    
  </div>
</div>



<div className="Sshop-section">
  <h2>Pet Accessories</h2> 
  <div className="Sshop-items">
    <div className="Sshop-item">
      {/* <Link to="/ProductPage"> */}
      <img src="pics/A1.webp" alt="Toy 1"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 1</p>
      {/* </Link> */}
      <p>₹188 <span>Save 25%</span></p>
      {/*<button className="Sadd-to-cart-btn">Buy Now</button>*/}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage1")}>Buy Now</button>

    </div>

    <div className="Sshop-item">
      <img src="pics/A3.jpg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 2</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage2")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/A4.jpeg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 3 </p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage3")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/A5.jpeg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 4</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage4")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/A6.jpeg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 5</p>
      <p>₹206 <span>Save 25%</span></p>
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage5")}>Buy Now</button>
    </div>
  </div>
  <button className="SView-More"onClick={handleViewMore}>View-More</button>
</div>
<br/>

<div className="Sshop-section">
  <h2>Pet Food</h2> 
  <div className="Sshop-items">
    <div className="Sshop-item">
      <img src="pics/F1.jpg" alt="Toy 1"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 11</p>
      <p>₹188 <span>Save 25%</span></p>
      {/* <button className="Sadd-to-cart-btn">Buy Now</button> */}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage11")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/F2.webp" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 12</p>
      <p>₹206 <span>Save 25%</span></p>
      {/* <button className="Sadd-to-cart-btn">Buy Now</button> */}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage12")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/F3.webp" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 13</p>
      <p>₹206 <span>Save 25%</span></p>
      {/* <button className="Sadd-to-cart-btn">Buy Now</button> */}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage13")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/F4.jpg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 14</p>
      <p>₹206 <span>Save 25%</span></p>
      {/* <button className="Sadd-to-cart-btn">Buy Now</button> */}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage14")}>Buy Now</button>
    </div>
    <div className="Sshop-item">
      <img src="pics/F5.jpg" alt="Toy 2"/>
      <p>Trixie Cat Teaser - Playing Rod with Fish 15</p>
      <p>₹206 <span>Save 25%</span></p>
      {/* <button className="Sadd-to-cart-btn">Buy Now</button> */}
      <button className="Sadd-to-cart-btn" onClick={()=>navigate("/ProductPage15")}>Buy Now</button>
    </div>
  </div>
  <button className="SView-More"onClick={handleViewAll}>View-More</button>
</div>

    </>
   );
}
export default ShopNow;

