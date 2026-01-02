// import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { CartContext } from '../CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './PetFood.css'; // Ensure this file exists for styles

// function PetFood() {
//     const { addToCart } = useContext(CartContext);

//     // Scroll to top on component mount
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Function to handle adding item to cart
//     const handleAddToCart = (item) => {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('userId');

//         if (!token || !userId) {
//             alert("Please log in to add items to your cart.");
//             return;
//         }

//         const itemWithUser = { ...item, userId };

//         try {
//             addToCart(itemWithUser);
//             toast.success(`${item.name} added to cart!`, {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 className: 'toast-message',
//                 bodyClassName: "toast-body",
//             });
//         } catch (error) {
//             console.error("Error adding item to cart:", error);
//             toast.error("There was an issue adding the item to your cart. Please try again.", {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//             });
//         }
//     };

//     // Sample product data
//     const productData = [
//         { id: 11, name: 'Trixie Cat Food11', price: 206, image: 'pics/F1.jpg' },
//         { id: 12, name: 'Trixie Cat Teaser12', price: 250, image: 'pics/F2.webp' },
//         { id: 13, name: 'Trixie Cat Teaser13', price: 300, image: 'pics/F3.webp' },
//         { id: 14, name: 'Trixie Cat Teaser14', price: 400, image: 'pics/F4.jpg' },
//         { id: 15, name: 'Trixie Cat Teaser15', price: 150, image: 'pics/F5.jpg' },
//         { id: 16, name: 'Trixie Cat Treats16', price: 180, image: 'pics/F1.jpg' },
//         { id: 17, name: 'Trixie Cat Biscuits17', price: 220, image: 'pics/F2.webp' },
//         { id: 18, name: 'Trixie Cat Snacks18', price: 270, image: 'pics/F3.webp' },
//         { id: 19, name: 'Trixie Cat Crunchies19', price: 310, image: 'pics/F4.jpg' },
//         { id: 20, name: 'Trixie Cat Mix', price: 290, image: 'pics/F5.jpg' },
//     ];

//     return (
//         <div className="food-section">
//             <h1>Pet Food</h1>
//             <div className="food-items">
//                 {productData.map((product) => (
//                     <div key={product.id} className="food-item">
//                         <Link to={`/ProductPage/${product.id}`}>
//                             <img src={product.image} alt={product.name} />
//                             <p>{product.name}</p>
//                         </Link>
//                         <p>₹{product.price} <span>Save 25%</span></p>
//                         <button 
//                             className="add-to-cart-btn" 
//                             onClick={() => handleAddToCart(product)}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default PetFood;





// import React, { useEffect, useContext } from "react"; 
// import './PetFood.css'; 
// import { Link } from 'react-router-dom';
// import { CartContext } from '../CartContext.js'; 
// import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// function PetFood() {
//     const { addToCart } = useContext(CartContext); 

//     useEffect(() => {
//         window.scrollTo(0, 0); 
//     }, []);

//     const handleAddToCart = (item) => {
//         addToCart(item);
//         // Show toast notification
//         toast.success(`${item.name} added to cart!`, { 
//             // position: "top-center",
//             // autoClose: 3000, // Auto close after 3 seconds
//             // hideProgressBar: false,
//             // closeOnClick: true,
//             // pauseOnHover: true,
//             // draggable: true,
//             // progress: undefined,
//             position: "top-center", // Set position to top-center
//             autoClose: 3000, 
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             className: 'toast-message', // Add custom class name for further styling
//             bodyClassName: "toast-body",
//         });
//     };
//   return (
//     <div className="food-section">
//       <h1>Pet Food</h1>
//       <div className="food-items">
       
//             <div className="food-item">
//             <Link to="/ProductPage11">
//                 <img src="pics/F1.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Food</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 11, name: 'Trixie Cat Food', price: 206, image: 'pics/F1.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage12">
//                 <img src="pics/F2.webp" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 12, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F2.webp' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage13">
//                 <img src="pics/F3.webp" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 13, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F3.webp' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage14">
//                 <img src="pics/F4.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 14, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F4.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage15">
//                 <img src="pics/F5.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 15, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F5.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage16">
//                 <img src="pics/F1.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 16, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F1.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>
//             <div className="food-item">
//             <Link to="/ProductPage17">
//                 <img src="pics/F2.webp" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 17, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F2.webp' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage18">
//                 <img src="pics/F3.webp" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 18, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F3.webp' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage19">
//                 <img src="pics/F4.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//             </Link>    
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 19, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F4.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>

//             <div className="food-item">
//             <Link to="/ProductPage20">
//                 <img src="pics/F5.jpg" alt="Toy 2" />
//                 <p>Trixie Cat Teaser - Playing Rod with Fish</p>
//              </Link>   
//                 <p>₹206 <span>Save 25%</span></p>
//                 <button 
//                         className="add-to-cart-btn" 
//                         onClick={() => handleAddToCart({ id: 20, name: 'Trixie Cat Teaser', price: 206, image: 'pics/F5.jpg' })} >
//                         Add to Cart
//                     </button>
//             </div>

//         {/* Add more accessory items here */}
//       </div>
//       <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
//     </div>
//   );
// }

// export default PetFood;





import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PetFood.css'; // Ensure this file exists for styles

function PetFood() {
    const { addToCart } = useContext(CartContext);

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
    <div className="food-section">
      <h1>Pet Food</h1>
      <div className="food-items">
       
            <div className="food-item">
            <Link to="/ProductPage11">
                <img src="pics/F1.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 11</p>
            </Link>    
                <p>₹ 188 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 11, name: 'Trixie Cat Food 11', price: 206, image: 'pics/F1.jpg' })} >
                        Add to Cart
                    </button> */}
                <Link to= "/ProductPage11">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage12">
                <img src="pics/F2.webp" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 12</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 12, name: 'Trixie Cat Teaser - Playing Rod with Fish 12', price: 206, image: 'pics/F2.webp' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage12">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage13">
                <img src="pics/F3.webp" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 13</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 13, name: 'Trixie Cat Teaser - Playing Rod with Fish 13', price: 206, image: 'pics/F3.webp' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage13">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage14">
                <img src="pics/F4.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 14</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 14, name: 'Trixie Cat Teaser - Playing Rod with Fish 14', price: 206, image: 'pics/F4.jpg' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage14">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage15">
                <img src="pics/F5.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 15</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 15, name: 'Trixie Cat Teaser - Playing Rod with Fish 15', price: 206, image: 'pics/F5.jpg' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage15">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage16">
                <img src="pics/F1.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 16</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 16, name: 'Trixie Cat Teaser - Playing Rod with Fish 16 ', price: 206, image: 'pics/F1.jpg' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage16">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>
            <div className="food-item">
            <Link to="/ProductPage17">
                <img src="pics/F2.webp" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 17</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 17, name: 'Trixie Cat Teaser - Playing Rod with Fish 17', price: 206, image: 'pics/F2.webp' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage17">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage18">
                <img src="pics/F3.webp" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 18</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 18, name: 'Trixie Cat Teaser - Playing Rod with Fish 18', price: 206, image: 'pics/F3.webp' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage18">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage19">
                <img src="pics/F4.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 19</p>
            </Link>    
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 19, name: 'Trixie Cat Teaser - Playing Rod with Fish 19', price: 206, image: 'pics/F4.jpg' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage19">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

            <div className="food-item">
            <Link to="/ProductPage20">
                <img src="pics/F5.jpg" alt="Toy 2" />
                <p>Trixie Cat Teaser - Playing Rod with Fish 20</p>
             </Link>   
                <p>₹206 <span>Save 25%</span></p>
                {/* <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart({ id: 20, name: 'Trixie Cat Teaser - Playing Rod with Fish 20', price: 206, image: 'pics/F5.jpg' })} >
                        Add to Cart
                    </button> */}
                      <Link to= "/ProductPage20">
                    <button className=' add-to-cart-btn'> Add to Cart</button>
                </Link>
            </div>

        {/* Add more accessory items here */}
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
    </div>
  );
}

export default PetFood;
