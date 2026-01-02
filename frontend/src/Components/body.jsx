import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './Body.css';

function Body() {
  const navigate = useNavigate();
  const reviewSectionRef = useRef(null); // Create a ref for the review section

  // State to manage form input
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to manage submitted reviews
  const [reviews, setReviews] = useState([]);
  
  // State to control visibility of the review form
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleJoinCommunityClick = () => {
    navigate('/donate');
  };

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ADMIN_REVIEWS);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Error fetching reviews');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReviews();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    if (!reviewData.name || reviewData.name.length < 2) {
      window.alert('Name must be at least 2 characters long.');
      return false;
    }
    if (!validateEmail(reviewData.email)) {
      window.alert('Please enter a valid email address.');
      return false;
    }
    if (!reviewData.message || reviewData.message.length < 10) {
      window.alert('Message must be at least 10 characters long.');
      return false;
    }
    return true;
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  // Handle form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        setReviewData({
          name: '',
          email: '',
          message: ''
        });
        window.alert('Review submitted successfully!');
        setIsFormVisible(false); // Hide the form after submission
        
        // Scroll to the review section
        reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Pawsitive Care</h1>
          <br />
          <p>"We offer the best services for animals" Contact us for more details.</p>
          <br /><button className="contact-button" onClick={handleContactClick}>
            Contact Us
          </button>
        </div>
      </section>

      {/* Other sections remain unchanged */}


      <section className="join-community-section">
      <div className="join-community-content">
        <div className="text-section">
          <h3 id='h'>Saving Animals</h3>
          <h3 id='h'>Changing Lives</h3>
          <p>Our mission is to rescue and treat the un-owned street animals of all over India who have become ill or injured, and through their rescue inspire a community to protect and defend the lives of all animals.</p>
          <button id = "b12"className="join-community-button" onClick={handleJoinCommunityClick}>
            Join Our Community
          </button>
        </div>
        <div className="image-section">
          <img src="pics/stray.png" alt="Dog with a person" />
        </div>
      </div>
    </section>
   
   

      <br/>

      <section className="services-section">
        <h2>We Offer Best Services</h2>
        <div className="services-list">
          <div className="service-item">
            <img src="pics/dog9.jpg" alt="Pet Grooming" />
            <p>Pet Grooming</p>
          </div>
          <div className="service-item">
            <img src="pics/dog11.png" alt="Street Animal Care" />
            <p>Street Animal Pickup Care</p>
          </div>
          <div className="service-item">
            <img src="pics/dog7.jpg" alt="Medical Services" />
            <p>Medical Services</p>
          </div>
          <div className="service-item">
            <img src="pics/dog8.png" alt="Pet Products" />
            <p>Pet Products</p>
          </div>


          <div className="service-item">
            <img src="pics/dog12.webp" alt="Street Animal Care" />
            <p>Home Service</p>
          </div>
          <div className="service-item">
            <img src="pics/dog6.jpg" alt="Medical Services" />
            <p>Training</p>
          </div>
          <div className="service-item">
            <img src="pics/dog13.jpg" alt="Pet Products" />
            <p>Pet Care Shop</p>
          </div>

          <div className="service-item">
            <img src= "pics/24.jpg" alt="Pet Products" />
            <p>24/7 Support</p>
          </div>
          
        </div>
      </section>

      

      {/* <section className="review-section" ref={reviewSectionRef}>
      
        <h2>What Our Clients Say</h2>
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                 <p>{review.message}</p>
                 <br/>
                <p><strong>{review.name}</strong> <br/>({review.email})</p>
               
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave a review!</p>
          )}
        </div>

      </section> */}







{/* <section className="review-section" ref={reviewSectionRef}>
  
  <h2>What Our Clients Say</h2>
  <div className="reviews-list">
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className="review-item">
          <p>
            

            {review.message && review.message.length > 100 ? (
              <>
                {review.showFullMessage ? review.message : `${review.message.substring(0, 100)}...`}
                <span 
                  className="read-more" 
                  onClick={() => {
                    const updatedReviews = reviews.map((rev, idx) =>
                      idx === index ? { ...rev, showFullMessage: !rev.showFullMessage } : rev
                    );
                    setReviews(updatedReviews);
                  }}
                >
                  {review.showFullMessage ? 'Read Less' : 'Read More'}
                </span>
              </>
            ) : (
              review.message
            )}
          </p>
          <br />
          <p><strong>{review.name}</strong> <br />({review.email})</p>
        </div>
      ))
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
</section> */}





<section className="review-section" ref={reviewSectionRef}>
  {/* Displaying the reviews */}
  <h2>What Our Clients Say</h2>
  <br/><br/>
  <div className="reviews-list">
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div 
          key={index} 
          className={`review-item ${review.showFullMessage ? 'expanded' : ''}`}
        >
          <p>
            {review.message && review.message.length > 100 ? (
              <>
                {review.showFullMessage ? review.message : `${review.message.substring(0, 100)}...`}
                <span 
                  className="read-more1" 
                  onClick={() => {
                    const updatedReviews = reviews.map((rev, idx) =>
                      idx === index ? { ...rev, showFullMessage: !rev.showFullMessage } : rev
                    );
                    setReviews(updatedReviews);
                  }}
                >
                  {review.showFullMessage ? 'Read Less' : 'Read More'}
                </span>
              </>
            ) : (
              review.message
            )}
          </p>
          <br />
          <p><strong>{review.name}</strong> <br />({review.email})</p>
        </div>
      ))
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
</section>
<br/><br/><br/>

        <h2>Give Your Valueable Feedback</h2><br/>
        <button id='b12' onClick={() => setIsFormVisible(!isFormVisible)}>
          Give Your Feedback
        </button>
        <br/><br/>

        {isFormVisible && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <input
              type="text"
              name="name"
              value={reviewData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={reviewData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={reviewData.message}
              onChange={handleInputChange}
              placeholder="Your Review"
              required
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>
        )}
        <br/><br/><br/>
      
    </>
  );
}

export default Body;
