import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { CartContext } from '../CartContext'; // Import CartContext
import { ToastContainer, toast } from 'react-toastify';

const FoodProduct5 = () => {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
  const [selectedImage, setSelectedImage] = useState(0);
  // const [quantity, setQuantity] = useState(15);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "pics/F5.jpg",
    "pics/F5.jpg",
    "pics/F5.jpg",
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // const handleQuantityChange = (e) => {
  //   setQuantity(e.target.value);
  // };

  // Product details
  const product = {
    id: 15, // Use a unique id for the product
    name: 'Trixie Cat Teaser - Playing Rod with Fish 15',
    price: 206,
    discount: 'Save 25%', 
    image: images[selectedImage], // Use the selected image as the main image
    // quantity: parseInt(quantity), // Ensure quantity is passed as a number
  };

  // const handleAddToCart = () => {
  //   addToCart(product);  // Call the addToCart function with the product details
  // };

   // Function to handle adding item to cart
   const handleAddToCart = () => {  // No parameter required here
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Add userId to the product object to identify the user
    const productWithUser = { ...product, userId, discount: product.discount  };

    try {
      addToCart(productWithUser); // Use productWithUser object here
      toast.success(`${product.name} added to cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-message',
        bodyClassName: "toast-body",
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("There was an issue adding the item to your cart. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  return (
    <div className="product-page">
      <div className="image-gallery">
        <div className="main-image">
          <img src={images[selectedImage]} alt="Product" />
        </div>
        <div className="thumbnail-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageClick(index)}
              className={index === selectedImage ? 'selected' : ''}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h1>Trixie Cat Teaser - Playing Rod with Fish 15</h1>
        <p className="price">Rs. 206 <span id='span1'>{product.discount}</span></p>
        <div className="description">
          <p>
            This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
          </p>
        </div>
        {/* <div className="color-selection">
          <p>Color: Putty</p>
          <div className="color-options">
            <div className="color-option putty"></div>
            <div className="color-option red"></div>
            <div className="color-option navy"></div>
          </div>
        </div>
        <div className="size-selection">
          <p>Select Size</p>
          <select>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </div>
        <div className="quantity-selection">
          <p>Quantity</p>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div> */}
        <button className="add-to-cart" onClick={handleAddToCart}>  {/* Call handleAddToCart when clicked */}
          Add to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodProduct5;
