
import React, { useState, useEffect, useContext } from 'react';
import './PetAccessories.css';
import { CartContext } from '../CartContext.js'; // Import CartContext 
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css';


function PetAccessories() {
    const { addToCart } = useContext(CartContext); // Get addToCart from context

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, []);

    // const handleAddToCart = (item) => {
    //     addToCart(item);
    //     toast.success(`${item.name} has been added to the cart!`, {
    //         position: "top-center", // Set position to top-center
    //         autoClose: 3000, 
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         className: 'toast-message', // Add custom class name for further styling
    //         bodyClassName: "toast-body",
    //     });
    // };




      // Function to handle adding item to cart
      const handleAddToCart = (item) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const itemWithUser = { ...item, userId };

        try {
            addToCart(itemWithUser);
            toast.success(`${item.name} added to cart!`, {
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
//         <div className="accessories-section">
//             <h1>All Pet Care Accessories</h1>
//             <div className="accessories-items">
               
//                 <div className="shop-item">
//                     <Link to="/ProductPage">
//                         <img id="1" src="pics/A1.webp" alt="Toy 2" />
//                         <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//                     </Link>   
                    
//                     <p>₹188 <span>Save 25%</span></p>
//                     <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 1, name: 'Trixie Cat Teaser', price: 206, image: 'pics/A1.webp' })} >
//                         Add to Cart
//                     </button>
//                 </div>
//             {/* <div className="shop-item">
//             <Link to="/ProductPage1">
//                 <img id="2" src="pics/A2.jpg" alt="Toy 2" />
//                 <p> Cat Teaser - Playing Rod with Fish</p>
//             </Link>   
                
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 2, name: 'Cat Teaser', price: 206, image:'pics/A2.jpg'})}>
//                     Add to Cart
//                 </button>
               
//             </div> */}


            

//             <div className="shop-item">
//             <Link to="/ProductPage2">
//                 <img id="2" src="pics/A3.jpg" alt="Toy 2" />
//                 <p> Trixie Cat Teaser - Playing Rod with Fish 2</p>
//             </Link>    
                
//                 <p>₹200 <span>Save 25%</span></p>
//                 <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 3, name: 'Cat 3', price: 200, image:'pics/A3.jpg'})}>
//                     Add to Cart
//                 </button>
                
//             </div>

//             <div className="shop-item">
//             <Link to="/ProductPage3">
//                 <img id="4" src="pics/A4.jpeg" alt="Toy 2" />
//                 <p>Cat-4 Teaser - Playing Rod with Fish</p>
//            </Link> 
                
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 4, name: 'Ca4 Teaser', price: 206, image:'pics/A4.jpeg'})}>
//                     Add to Cart
//                 </button>
              
//             </div>

//             <div className="shop-item">
//             <Link to="/ProductPage4">
//                 <img id="5" src="pics/A5.jpeg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>   
               
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 5, name: 'Ca5 Teaser', price: 306, image:'pics/A5.jpeg'})}>
//                     Add to Cart
//                 </button>
               
//             </div>

//             <div className="shop-item">
//             <Link to="/ProductPage5">
//                 <img id="6" src="pics/A6.jpeg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
              
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 6, name: 'Ca6 Teaser', price: 406, image:'pics/A6.jpeg'})}>
//                     Add to Cart
//                 </button>
                
//             </div>
//             <div className="shop-item">
//             <Link to="/ProductPage6">
//                 <img id="7" src="pics/A4.jpeg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>
               
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 7, name: 'Trixie Cat Teaser', price: 206, image: 'pics/A4.jpeg' })} >
//                         Add to Cart
//                     </button>
              
//             </div>

//             <div className="shop-item">
//             <Link to="/ProductPage7">
//                 <img id="8" src="pics/A5.jpeg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>   
                
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 8, name: 'Trixie Cat Teaser', price: 206, image: 'pics/A5.jpeg' })} >
//                         Add to Cart
//                     </button>
           
//             </div>

//             <div className="shop-item">
//             <Link to="/ProductPage8">
//                 <img id="9" src="pics/A6.jpeg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>
                
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 9, name: 'Trixie Cat Teaser', price: 206, image: 'pics/A6.jpeg' })} >
//                         Add to Cart
//                     </button>
            
//             </div>
//             <div className="shop-item">
//             <Link to="/ProductPage9">
//                 <img id="10" src="pics/A1.webp" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//                 </Link>   
               
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 10, name: 'Trixie Cat Teaser', price: 206, image: 'pics/A1.webp' })} >
//                         Add to Cart
//                     </button>
                
//             </div>


            

//          {/* Add more accessory items here  */}
//       </div>
//       <ToastContainer />
//     </div>
//   );



<div className="accessories-section">
<h1>All Pet Care Accessories</h1>
<div className="accessories-items">
  
  {/* First Item */}
  <div className="shop-item">
    <Link to="/ProductPage1">
      <img id="`product1-${selectedSize}-${selectedColor}`" src="pics/A1.webp" alt="Toy 1" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 1</p>
    </Link>
    <p>₹188 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 1, name:"Trixie Cat Teaser - Playing Rod with Fish 1", price: 188, image: 'pics/A1.webp' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage1">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  {/* Second Item */}
  <div className="shop-item">
    <Link to="/ProductPage2">
      <img id="`product2-${selectedSize}-${selectedColor}`" src="pics/A3.jpg" alt="Toy 2" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 2</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 2, name: 'Trixie Cat Teaser - Playing Rod with Fish 2', price: 206, image: 'pics/A3.jpg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage2">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  {/* Additional Items */}
  {/* Add similar structures for other items using the Link component and corresponding paths */}
  <div className="shop-item">
    <Link to="/ProductPage3">
      <img id="`product3-${selectedSize}-${selectedColor}`" src="pics/A4.jpeg" alt="Toy 3" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 3</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 3, name: 'Trixie Cat Teaser - Playing Rod with Fish 3', price: 206, image: 'pics/A4.jpeg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage3">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  <div className="shop-item">
    <Link to="/ProductPage4">
      <img id="`product4-${selectedSize}-${selectedColor}`" src="pics/A5.jpeg" alt="Toy 4" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 4</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 4, name: 'Trixie Cat Teaser - Playing Rod with Fish 4', price: 206, image: 'pics/A5.jpeg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage4">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>


  <div className="shop-item">
    <Link to="/ProductPage5">
      <img id="`product5-${selectedSize}-${selectedColor}`" src="pics/A6.jpeg" alt="Toy 5" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 5</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 4, name: 'Trixie Cat Teaser - Playing Rod with Fish 5', price: 206, image: "pics/A6.jpeg"})}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage5">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>






  
  {/* First Item */}
  <div className="shop-item">
    <Link to="/ProductPage6">
      <img id="`product6-${selectedSize}-${selectedColor}`" src="pics/A1.webp" alt="Toy 6" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 6</p>
    </Link>
    <p>₹188 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 6, name:"Trixie Cat Teaser - Playing Rod with Fish 6", price: 188, image: 'pics/A1.webp' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage6">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  {/* Second Item */}
  <div className="shop-item">
    <Link to="/ProductPage7">
      <img id="`product7-${selectedSize}-${selectedColor}`" src="pics/A3.jpg" alt="Toy 7" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 7</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 7, name: 'Trixie Cat Teaser - Playing Rod with Fish 7', price: 206, image: 'pics/A3.jpg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage7">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  {/* Additional Items */}
  {/* Add similar structures for other items using the Link component and corresponding paths */}
  <div className="shop-item">
    <Link to="/ProductPage8">
      <img id="`product8-${selectedSize}-${selectedColor}`" src="pics/A4.jpeg" alt="Toy 8" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 8</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 8, name: 'Trixie Cat Teaser - Playing Rod with Fish 8', price: 206, image: 'pics/A4.jpeg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage8">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>

  <div className="shop-item">
    <Link to="/ProductPage9">
      <img id="`product9-${selectedSize}-${selectedColor}`" src="pics/A5.jpeg" alt="Toy 9" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 9</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 9, name: 'Trixie Cat Teaser - Playing Rod with Fish 9', price: 206, image: 'pics/A5.jpeg' })}>
      Add to Cart
    </button> */}
    <Link to= "/ProductPage9">
    <button className=' add-to-cart-btn'> Add to Cart</button>
    </Link>
  </div>


  {/* <div className="shop-item">
    <Link to="/ProductPage5">
      <img id="5" src="pics/A6.jpeg" alt="Toy 5" />
      <p>Trixie Cat Teaser - Playing Rod with Fish 5</p>
    </Link>
    <p>₹206 <span>Save 25%</span></p>
    <button className="add-to-cart-btn" onClick={() => handleAddToCart({ id: 4, name: 'Trixie Cat Teaser - Playing Rod with Fish 5', price: 206, image: "pics/A6.jpeg"})}>
      Add to Cart
    </button>
  </div> */}

  {/* Add more items as needed */}
</div>
{/* Toast notification container */}
<ToastContainer />
</div>
);
}

export default PetAccessories;

