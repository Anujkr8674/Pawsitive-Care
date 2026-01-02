import React from 'react';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { CartProvider } from './CartContext.js'; // Import CartProvider

// import { AuthProvider } from './context/AuthContext.js';
import { AuthProvider } from './context/AuthProvider.js';
import FormPage from './Pages/FormPage.jsx';

import ProtectedRoute from './Pages/ProtectedRoute.js';
// import PrivateRoute from './Pages/PrivateRoute.js';
// import AdminProtectedRoute from './Pages/ProtectedRouteAdmin.js';
import AdminProtectedRoute from './Pages/ProtectedRouteAdmin.js';

import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import ShopNow from './Pages/ShopNow.jsx';
import Services from './Pages/Services.jsx';
import Body from './Components/body.jsx';
import Contact from './Pages/Contact.jsx';
import Appointment from './Pages/Appointment.jsx';
import StreetAnimals from './Pages/StreetAnimals.jsx';
import PetCare from './Pages/PetCare.jsx';
import Adopt from './Pages/Adopt.jsx';
import Donate from './Pages/Donate.jsx';
import PetAccessories from './Pages/PetAccessories.jsx';
import PetFood from './Pages/PetFood.jsx';
import PetAdoptionForm from './Pages/PetAdoptionForm.jsx';

// import ProductPage from './Pages/ProductPage.jsx';


import Volunteer from './Pages/Volunteer.jsx';
import Donation from './Pages/Donation.jsx';
import CartPage from './Pages/CartPage.jsx';
import UserLogin from './Pages/UserLogin.jsx';
import RegistrationForm from './Pages/RegistrationForm.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import AdminReg from './Pages/AdminReg.jsx';
// import Aboutus from './Pages/Aboutus.jsx';
import Aboutus from './Pages/Aboutus.jsx';

import UserForgotPassword from './Pages/UserForgotPassword.jsx';
import AdminForgotPassword from './Pages/AdminForgotPassword.jsx';

import Order from './Pages/order.jsx';

// import Order from './Pages/order.jsx';

import OrderConfirmation from './Pages/OrderConfirmation.jsx';






import Puppy1 from './Pages/Puppy1';
import Puppy2 from './Pages/Puppy2';
import Puppy3 from './Pages/Puppy3';
import Puppy4 from './Pages/Puppy4';
import Puppy5 from './Pages/Puppy5';
import Puppy6 from './Pages/Puppy6';
import Puppy7 from './Pages/Puppy7';
import Puppy8 from './Pages/Puppy8';
import Puppy9 from './Pages/Puppy9';
import Puppy10 from './Pages/Puppy10';


// import ProductPage from './Pages/ProductPage.jsx';
import ProductPage1 from './Pages/ProductPage1.jsx';
import ProductPage2 from './Pages/ProductPage2.jsx';
import ProductPage3 from './Pages/ProductPage3.jsx';
import ProductPage4 from './Pages/ProductPage4.jsx';
import ProductPage5 from './Pages/ProductPage5.jsx';
import ProductPage6 from './Pages/ProductPage6.jsx';
import ProductPage7 from './Pages/ProductPage7.jsx';
import ProductPage8 from './Pages/ProductPage8.jsx';
import ProductPage9 from './Pages/ProductPage9.jsx';




import FoodProduct1 from './Pages/FoodProduct1.jsx';
import FoodProduct2 from './Pages/FoodProduct2.jsx';
import FoodProduct3 from './Pages/FoodProduct3.jsx';
import FoodProduct4 from './Pages/FoodProduct4.jsx';
import FoodProduct5 from './Pages/FoodProduct5.jsx';
import FoodProduct6 from './Pages/FoodProduct6.jsx';
import FoodProduct7 from './Pages/FoodProduct7.jsx';
import FoodProduct8 from './Pages/FoodProduct8.jsx';
import FoodProduct9 from './Pages/FoodProduct9.jsx';
import FoodProduct10 from './Pages/FoodProduct10.jsx';




import AdminDashboard from './Pages/AdminDashboard.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';







// A mock function for checking user login status
const checkUserAuth = () => {
  // In real case, check from localStorage or API
  const token = localStorage.getItem("token");
  return !!token;  // true if user is logged in
};





function App() {
  // const userToken = localStorage.getItem('token');

  // const isAuthenticated = !!localStorage.getItem('adminToken');
  return (
    <AuthProvider>
    <CartProvider>
    {/* <Router> */}
    {/* <Route> */}
      <Navbar />
      
     <Routes>

     <Route path="/form" element={<FormPage />} />

     <Route path="/" element={<Body />} />
        
       
        <Route path="/shop" element={<ProtectedRoute><ShopNow/></ProtectedRoute> }/>
        
       

        <Route path="/services" element = {<Services/>} />
    

        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute> }/>
        
    
        <Route path="/appointment" element={<ProtectedRoute><Appointment/></ProtectedRoute> }/>
        <Route path="/street-animal" element={<StreetAnimals/>}/>
        <Route path="/pet-care" element={<PetCare/>}/>
        <Route path="/adopt" element={<Adopt/>}/>

      

        <Route path="/donate"element={<ProtectedRoute><Donate /></ProtectedRoute>}/>

        <Route path="/PetAccessories" element={<PetAccessories/>}/>
        <Route path="/PetAccessories" element={<ProtectedRoute><PetAccessories /></ProtectedRoute> }/>
        
        <Route path="/PetFood" element={<ProtectedRoute><PetFood/></ProtectedRoute>}/>

        {/* <Route path="/PetAdoptionForm" element={<PetAdoptionForm/>}/> */}
        <Route path="/PetAdoptionForm" element={<ProtectedRoute><PetAdoptionForm /></ProtectedRoute> }/>
        <Route path="/ProductPage1" element={<ProductPage1/>}/>
        <Route path="donation" element={<Donation/>}/>
         {/* <Route path="/Volunteer" element={<Volunteer/>}/>  */}
         <Route path="/Volunteer" element={<ProtectedRoute><Volunteer /></ProtectedRoute> }/>

         
         <Route path="/CartPage" element={<ProtectedRoute><CartPage /></ProtectedRoute> }/>
         <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute> }/>
        
         <Route path="/OrderConfirmation" element={<ProtectedRoute><OrderConfirmation/></ProtectedRoute>}/>

         <Route path="/aboutus" element={<Aboutus/>}/>
        

         <Route path='/ForgotPassword' element={<UserForgotPassword/>}/>
         <Route path='AdminForgotPassword' element={<AdminForgotPassword/>}/>




         <Route path='/puppy1-detail' element = {<Puppy1/>}/> 
          <Route path='/puppy2-detail' element = {<Puppy2/>}/> 
          <Route path='/puppy3-detail' element = {<Puppy3/>}/> 
          <Route path='/puppy4-detail' element = {<Puppy4/>}/> 
          <Route path='/puppy5-detail' element = {<Puppy5/>}/> 
          <Route path='/puppy6-detail' element = {<Puppy6/>}/> 
          <Route path='/puppy7-detail' element = {<Puppy7/>}/> 
          <Route path='/puppy8-detail' element = {<Puppy8/>}/> 
          <Route path='/puppy9-detail' element = {<Puppy9/>}/> 
          <Route path='/puppy10-detail' element = {<Puppy10/>}/> 


          {/* <Route path="/ProductPage1" element={<ProductPage/>}/>
        <Route path="/ProductPage2" element={<ProductPage1/>}/>
        <Route path="/ProductPage3" element={<ProductPage2/>}/>
        <Route path="/ProductPage4" element={<ProductPage3/>}/>
        <Route path="/ProductPage5" element={<ProductPage4/>}/>
        <Route path="/ProductPage6" element={<ProductPage5/>}/>
        <Route path="/ProductPage7" element={<ProductPage6/>}/>
        <Route path="/ProductPage8" element={<ProductPage7/>}/>
        <Route path="/ProductPage9" element={<ProductPage8/>}/>
        <Route path="/ProductPage10" element={<ProductPage9/>}/> */}
        


        <Route path="/ProductPage1" element={<ProductPage1/>}/>
        <Route path="/ProductPage2" element={<ProductPage2/>}/>
        <Route path="/ProductPage3" element={<ProductPage3/>}/>
        <Route path="/ProductPage4" element={<ProductPage4/>}/>
        <Route path="/ProductPage5" element={<ProductPage5/>}/>
        <Route path="/ProductPage6" element={<ProductPage6/>}/>
        <Route path="/ProductPage7" element={<ProductPage7/>}/>
        <Route path="/ProductPage8" element={<ProductPage8/>}/>
        <Route path="/ProductPage9" element={<ProductPage9/>}/>

        <Route path="/ProductPage11" element={<FoodProduct1/>}/>
        <Route path="/ProductPage12" element={<FoodProduct2/>}/>
        <Route path="/ProductPage13" element={<FoodProduct3/>}/>
        <Route path="/ProductPage14" element={<FoodProduct4/>}/>
        <Route path="/ProductPage15" element={<FoodProduct5/>}/>
        <Route path="/ProductPage16" element={<FoodProduct6/>}/>
        <Route path="/ProductPage17" element={<FoodProduct7/>}/>
        <Route path="/ProductPage18" element={<FoodProduct8/>}/>
        <Route path="/ProductPage19" element={<FoodProduct9/>}/>
        <Route path="/ProductPage20" element={<FoodProduct10/>}/>

        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/> */}
        {/* <Route path="/order" element={<Order />} />
         */}

        <Route path="/product/:productImages" element={<ProductPage1 />} /> {/* Handle dynamic product pages */}

       
         <Route path="/AdminReg" element={<AdminReg/>}/>

          
           {/* Auth Routes */}
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>


        {/* <Route path="/products/:id" component={ProductDetail} /> */}

       
      
        
        
        <Route path="/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}/>
         <Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}/>
         {/* <ProtectedRoute path="/form" page={FormPage} />  */}
         <Route path="/shop" element={<AdminProtectedRoute><ShopNow/></AdminProtectedRoute> }/>
        

         {/* Redirect for non-logged-in users */}
         <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
      <Footer/>

    {/* </Router> */}
    </CartProvider>
    </AuthProvider>
  );
}

export default App;



