

import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { CartContext } from '../CartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductPage7 = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [selectedColor, setSelectedColor] = useState('Putty'); // Default color

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "pics/A4.jpeg",
    "pics/A4.jpeg",
    "pics/A4.jpeg",
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const product = {
    // id: `product8-${selectedSize}-${selectedColor}`, // Unique ID for the product
    id: 8, // Use a unique id for the product
    name: 'Trixie Cat Teaser - Playing Rod with Fish 8',
    price: 206,
    discount: 'Save 25%', 
    image: images[selectedImage], // Use the selected image as the main image
    size: selectedSize,
    color: selectedColor,
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const productWithUser = { ...product, userId , discount: product.discount};

    try {
      addToCart(productWithUser);
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
        <h1>Trixie Cat Teaser - Playing Rod with Fish 8</h1>
        <p className="price">Rs. 206  <span id='span1'>{product.discount}</span></p>
        <div className="description">
          <p>
            This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
          </p>
        </div>
        <div className="color-selection">
          <p>Color: {selectedColor}</p>
          <div className="color-options">
            <div className={`color-option putty ${selectedColor === 'Putty' ? 'selected' : ''}`} onClick={() => setSelectedColor('Putty')}></div>
            <div className={`color-option red ${selectedColor === 'Red' ? 'selected' : ''}`} onClick={() => setSelectedColor('Red')}></div>
            <div className={`color-option navy ${selectedColor === 'Navy' ? 'selected' : ''}`} onClick={() => setSelectedColor('Navy')}></div>
          </div>
        </div>
        <div className="size-selection">
          <p>Select Size</p>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductPage7;
