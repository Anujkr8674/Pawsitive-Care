// import React, { useState, useEffect, useContext } from 'react';
// import './ProductPage.css';
// import { CartContext } from '../CartContext'; // Import CartContext
// import { ToastContainer, toast } from 'react-toastify';

// const ProductPage8 = () => {
//   const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
//   const [selectedImage, setSelectedImage] = useState(0);
//   // const [quantity, setQuantity] = useState(9);

//   useEffect(() => {
//     // Scroll to the top when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//   const images = [
//    "pics/A5.jpeg",
//    "pics/A5.jpeg",
//    "pics/A5.jpeg"
//   ];

//   const handleImageClick = (index) => {
//     setSelectedImage(index);
//   };

//   // const handleQuantityChange = (e) => {
//   //   setQuantity(e.target.value);
//   // };

//   // Product details
//   const product = {
//     id: 9, // Use a unique id for the product
//     name: 'Trixie Cat Teaser - Playing Rod with Fish 9',
//     price: 206,
//     image: images[selectedImage], // Use the selected image as the main image
//     // quantity: parseInt(quantity), // Ensure quantity is passed as a number
//   };

//   // const handleAddToCart = () => {
//   //   addToCart(product);  // Call the addToCart function with the product details
//   // };


//    // Function to handle adding item to cart
//    const handleAddToCart = () => {  // No parameter required here
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     // Add userId to the product object to identify the user
//     const productWithUser = { ...product, userId };

//     try {
//       addToCart(productWithUser); // Use productWithUser object here
//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         className: 'toast-message',
//         bodyClassName: "toast-body",
//       });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       toast.error("There was an issue adding the item to your cart. Please try again.", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   return (
//     <div className="product-page">
//       <div className="image-gallery">
//         <div className="main-image">
//           <img src={images[selectedImage]} alt="Product" />
//         </div>
//         <div className="thumbnail-images">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index}`}
//               onClick={() => handleImageClick(index)}
//               className={index === selectedImage ? 'selected' : ''}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="product-details">
//         <h1>'Trixie Cat Teaser - Playing Rod with Fish 9'</h1>
//         <p className="price">Rs.206</p>
//         <div className="description">
//           <p>
//             This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
//           </p>
//         </div>
//         <div className="color-selection">
//           <p>Color: Putty</p>
//           <div className="color-options">
//             <div className="color-option putty"></div>
//             <div className="color-option red"></div>
//             <div className="color-option navy"></div>
//           </div>
//         </div>
//         <div className="size-selection">
//           <p>Select Size</p>
//           <select>
//             <option>XS</option>
//             <option>S</option>
//             <option>M</option>
//             <option>L</option>
//           </select>
//         </div>
//         {/* <div className="quantity-selection">
//           <p>Quantity</p>
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="1"
//           />
//         </div> */}
//         <button className="add-to-cart" onClick={handleAddToCart}>  {/* Call handleAddToCart when clicked */}
//           Add to Cart
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductPage8;







// import React, { useState, useEffect, useContext } from 'react';
// import './ProductPage.css';
// import { CartContext } from '../CartContext'; // Import CartContext
// import { ToastContainer, toast } from 'react-toastify';

// const ProductPage8 = () => {
//   const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('M'); // Track selected size
//   const [selectedColor, setSelectedColor] = useState('Putty'); // Track selected color

//   useEffect(() => {
//     // Scroll to the top when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//   const images = [
//     "pics/A5.jpeg",
//     "pics/A5.jpeg",
//     "pics/A5.jpeg"
//   ];

//   const handleImageClick = (index) => {
//     setSelectedImage(index);
//   };

//   // Product details
//   const product = {
//     id: 9, // Use a unique id for the product
//     name: 'Trixie Cat Teaser - Playing Rod with Fish 9',
//     price: 206,
//     image: images[selectedImage], // Use the selected image as the main image
//   };

//   // Function to handle adding item to cart
//   const handleAddToCart = () => {  // No parameter required here
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     // Add userId, size, and color to the product object to identify the user and product variation
//     const productWithUser = { ...product, userId, size: selectedSize, color: selectedColor };

//     try {
//       addToCart(productWithUser); // Use productWithUser object here
//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         className: 'toast-message',
//         bodyClassName: "toast-body",
//       });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       toast.error("There was an issue adding the item to your cart. Please try again.", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   return (
//     <div className="product-page">
//       <div className="image-gallery">
//         <div className="main-image">
//           <img src={images[selectedImage]} alt="Product" />
//         </div>
//         <div className="thumbnail-images">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index}`}
//               onClick={() => handleImageClick(index)}
//               className={index === selectedImage ? 'selected' : ''}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="product-details">
//         <h1>'Trixie Cat Teaser - Playing Rod with Fish 9'</h1>
//         <p className="price">Rs.206</p>
//         <div className="description">
//           <p>
//             This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
//           </p>
//         </div>
//         <div className="color-selection">
//           <p>Color: {selectedColor}</p>
//           <div className="color-options">
//             <div className={`color-option putty ${selectedColor === 'Putty' ? 'selected' : ''}`} onClick={() => setSelectedColor('Putty')}></div>
//             <div className={`color-option red ${selectedColor === 'Red' ? 'selected' : ''}`} onClick={() => setSelectedColor('Red')}></div>
//             <div className={`color-option navy ${selectedColor === 'Navy' ? 'selected' : ''}`} onClick={() => setSelectedColor('Navy')}></div>
//           </div>
//         </div>
//         <div className="size-selection">
//           <p>Select Size</p>
//           <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
//             <option>XS</option>
//             <option>S</option>
//             <option>M</option>
//             <option>L</option>
//           </select>
//         </div>
//         <button className="add-to-cart" onClick={handleAddToCart}>  {/* Call handleAddToCart when clicked */}
//           Add to Cart
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductPage8;





// import React, { useState, useEffect, useContext } from 'react';
// import './ProductPage.css';
// import { CartContext } from '../CartContext';
// import { ToastContainer, toast } from 'react-toastify';

// const ProductPage8 = () => {
//   const { addToCart } = useContext(CartContext);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [selectedColor, setSelectedColor] = useState('Putty');

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const images = ["pics/A5.jpeg", "pics/A5.jpeg", "pics/A5.jpeg"];

//   const handleImageClick = (index) => {
//     setSelectedImage(index);
//   };

//   const product = {
//     // Create a unique ID by combining ID, size, and color.
//     id: `9-${selectedSize}-${selectedColor}`,
//     name: 'Trixie Cat Teaser - Playing Rod with Fish 9',
//     price: 206,
//     image: images[selectedImage],
//     size: selectedSize, // Include size and color properties
//     color: selectedColor,
//   };

//   const handleAddToCart = () => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     const productWithUser = { ...product, userId };

//     try {
//       addToCart(productWithUser);
//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         className: 'toast-message',
//         bodyClassName: "toast-body",
//       });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       toast.error("There was an issue adding the item to your cart. Please try again.", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   return (
//     <div className="product-page">
//       <div className="image-gallery">
//         <div className="main-image">
//           <img src={images[selectedImage]} alt="Product" />
//         </div>
//         <div className="thumbnail-images">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index}`}
//               onClick={() => handleImageClick(index)}
//               className={index === selectedImage ? 'selected' : ''}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="product-details">
//         <h1>'Trixie Cat Teaser - Playing Rod with Fish 9'</h1>
//         <p className="price">Rs.206</p>
//         <div className="description">
//           <p>
//             This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
//           </p>
//         </div>
//         <div className="color-selection">
//           <p>Color: {selectedColor}</p>
//           <div className="color-options">
//             <div className={`color-option putty ${selectedColor === 'Putty' ? 'selected' : ''}`} onClick={() => setSelectedColor('Putty')}></div>
//             <div className={`color-option red ${selectedColor === 'Red' ? 'selected' : ''}`} onClick={() => setSelectedColor('Red')}></div>
//             <div className={`color-option navy ${selectedColor === 'Navy' ? 'selected' : ''}`} onClick={() => setSelectedColor('Navy')}></div>
//           </div>
//         </div>
//         <div className="size-selection">
//           <p>Select Size</p>
//           <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
//             <option>XS</option>
//             <option>S</option>
//             <option>M</option>
//             <option>L</option>
//           </select>
//         </div>
//         <button className="add-to-cart" onClick={handleAddToCart}>
//           Add to Cart
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductPage8;





import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { CartContext } from '../CartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductPage8 = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Putty');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = ["pics/A5.jpeg", "pics/A5.jpeg", "pics/A5.jpeg"];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Create a unique ID using product ID, selected size, and color combination.
  const product = {
    // id: `product9-${selectedSize}-${selectedColor}`, // Unique identifier for every color and size combination
    id: 9, // Use a unique id for the product
    name: 'Trixie Cat Teaser - Playing Rod with Fish 9',
    price: 206,
    image: images[selectedImage],
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
  
    // Define a quantity for the item
    const quantity = 1; // You can modify this to allow user-defined quantities
  
    const productWithUser = { ...product, userId, quantity , discount: product.discount }; // Include quantity in the product
  
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
        <h1>Trixie Cat Teaser - Playing Rod with Fish 9</h1>
        <p className="price">Rs. 206  <span id='span1'>{product.discount}</span></p>
        <div className="description">
          <p>
            This jumper is knitted from a wool and viscose blend with a slight stretch to help maintain shape and aid recovery when worn.
          </p>
        </div>
        <div className="color-selection">
          <p>Color: {selectedColor}</p>
          <div className="color-options">
            {/* Each color option will update the selectedColor state */}
            <div className={`color-option putty ${selectedColor === 'Putty' ? 'selected' : ''}`} onClick={() => setSelectedColor('Putty')}></div>
            <div className={`color-option red ${selectedColor === 'Red' ? 'selected' : ''}`} onClick={() => setSelectedColor('Red')}></div>
            <div className={`color-option navy ${selectedColor === 'Navy' ? 'selected' : ''}`} onClick={() => setSelectedColor('Navy')}></div>
          </div>
        </div>
        <div className="size-selection">
          <p>Select Size</p>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {/* Dropdown for selecting size */}
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

export default ProductPage8;
