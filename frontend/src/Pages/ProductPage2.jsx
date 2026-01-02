import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { CartContext } from '../CartContext'; // Import CartContext
import { ToastContainer, toast } from 'react-toastify';

const ProductPage2 = () => {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [selectedColor, setSelectedColor] = useState('Putty'); // Default color

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Array of images for the product
  const images = [
    "pics/A3.jpg",
    "pics/A3.jpg",
    "pics/A3.jpg",
  ];

  // Handle image thumbnail click
  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Product details
  const product = {
    // id: `product2-${selectedSize}-${selectedColor}`, // Unique ID with size and color
    id: 2, // Use a unique id for the product
    name: 'Trixie Cat Teaser - Playing Rod with Fish 2',
    price: 206,
    discount: 'Save 25%', 
    image: images[selectedImage], // Use the selected image as the main image
    size: selectedSize,
    color: selectedColor,
  };

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Add userId to the product object to identify the user
    const productWithUser = { ...product, userId,  discount: product.discount };

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
      {/* Image Gallery */}
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

      {/* Product Details Section */}
      <div className="product-details">
        <h1>Trixie Cat Teaser - Playing Rod with Fish 2</h1>
        <p className="price">Rs. 206 <span id='span1'>{product.discount}</span></p>
        <div className="description">
          <p>
            This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
          </p>
        </div>

        {/* Color Selection */}
        <div className="color-selection">
          <p>Color: {selectedColor}</p>
          <div className="color-options">
            <div
              className={`color-option putty ${selectedColor === 'Putty' ? 'selected' : ''}`}
              onClick={() => setSelectedColor('Putty')}
            ></div>
            <div
              className={`color-option red ${selectedColor === 'Red' ? 'selected' : ''}`}
              onClick={() => setSelectedColor('Red')}
            ></div>
            <div
              className={`color-option navy ${selectedColor === 'Navy' ? 'selected' : ''}`}
              onClick={() => setSelectedColor('Navy')}
            ></div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-selection">
          <p>Select Size</p>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProductPage2;
