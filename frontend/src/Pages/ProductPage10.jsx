import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { CartContext } from '../CartContext'; // Import CartContext

const ProductPage9 = () => {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(10);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "pics/A1.webp",
    "pics/A1.webp",
    "pics/A1.webp",
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Product details
  const product = {
    id: 10, // Use a unique id for the product
    name: 'Pet Accessories10',
    price: 110,
    image: images[selectedImage], // Use the selected image as the main image
    quantity: parseInt(quantity), // Ensure quantity is passed as a number
  };

  const handleAddToCart = () => {
    addToCart(product);  // Call the addToCart function with the product details
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
        <h1>Structured Ottoman Jumper</h1>
        <p className="price">Rs.110</p>
        <div className="description">
          <p>
            This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
          </p>
        </div>
        <div className="color-selection">
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
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>  {/* Call handleAddToCart when clicked */}
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage9;
