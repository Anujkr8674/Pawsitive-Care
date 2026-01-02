import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './UserDashboard.css';
import { Link } from 'react-router-dom';

// import petAdoption from '../../../backend/models/petAdoption';

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [donations, setDonations] = useState([]); // Add state for donations
  const [petAdoptions, setPetAdoptions] = useState([]);

  // const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


 
  const [orders, setOrders] = useState([]);
  const [userregs, setUserRegs] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const [userId, setUserId] = useState('');

  const [email, setEmail] = useState('');





  const [activeSection, setActiveSection] = useState('appointments'); // Define activeSection in state



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section); // Update activeSection when a section is clicked
  };

  useEffect(() => {


        // Retrieve userId from localStorage
        // const storedUserId = localStorage.getItem('userId');
        // setUserId (storedUserId );

        // useEffect(() => {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) {
            setUserId(storedUserId);
          }

          const storedEmail = localStorage.getItem('email');
          if (storedEmail) {
            setEmail(storedEmail);
          }
        // }, []);
        
    
        // Fetch admin email from the backend using the storedAdminId
        const fetchAdminDetails = async () => {
          try {
            const response = await axios.get(API_ENDPOINTS.GET_ADMIN(storedUserId));
           //  setAdminEmail(response.data.email);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };



    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('User is not authenticated');
          return;
        }


          const [appointmentResponse, volunteerResponse, contactResponse, donationResponse, petAdoptionResponse, orderResponse, userregsResponse] = await Promise.all([
          axios.get(API_ENDPOINTS.USER_APPOINTMENTS, {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer token format
            },
          }),
          axios.get(API_ENDPOINTS.USER_VOLUNTEERS, {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer token format
            },
          }),
          axios.get(API_ENDPOINTS.USER_CONTACTS, {
            headers: {
              Authorization: `Bearer ${token}`, // Fetch contacts using token
            },
          }),
          axios.get(API_ENDPOINTS.USER_DONATIONS, {
            headers: {
              Authorization: `Bearer ${token}`, // Fetch donations using token
            },
          }),
          axios.get(API_ENDPOINTS.USER_PET_ADOPTIONS, { // Fetch pet adoptions
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(API_ENDPOINTS.USER_ORDERS, {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer token format
            },
          }),
          // axios.get('http://localhost:5000/api/admin/userregs', { // Fetch pet adoptions
          // axios.get(`http://localhost:5000/api/user/userregs/${userId}`, {
          //   // axios.get(`http://localhost:5000/api/user/userregs/email/${email}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }),

          // axios.get(`http://localhost:5000/api/user/userregs/${userId}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // })


          // axios.get('http://localhost:5000/api/user/userregs/:id', {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // Use Bearer token format
          //   },
          // }),

          // axios.get(`http://localhost:5000/api/user/userregs/${userId}`, {
          //   axios.get('http://localhost:5000/api/user/userregs', {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // Use Bearer token format
          //   },
          // }),
          
        ]);

        setAppointments(appointmentResponse.data.reverse());
        setVolunteers(volunteerResponse.data.reverse());
        setContacts(contactResponse.data.reverse()); 
        setDonations(donationResponse.data.reverse()); // Set donations data
        setPetAdoptions(petAdoptionResponse.data.reverse());
        
        // Handle orders response - check if data is array
        if (orderResponse.data && Array.isArray(orderResponse.data)) {
          console.log('Orders fetched:', orderResponse.data.length);
          setOrders(orderResponse.data.reverse());
        } else {
          console.error('Invalid orders response:', orderResponse.data);
          setOrders([]);
        }

        // setUserRegs(userregsResponse.data.reverse());
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          if (error.response.status === 401) {
            setError('Authentication failed. Please login again.');
          } else {
            setError(error.response?.data?.message || 'Failed to fetch data. Please try again later.');
          }
        } else {
          setError('Network error. Please check your connection and try again.');
        }
        // Set empty arrays on error to prevent undefined errors
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  // const handleCancelOrder = async (orderId, itemId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.put(
  //       `http://localhost:5000/api/user/cancel-order/${orderId}/${itemId}`,
  //       { status: 'Cancelled' },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  
  //     // Update UI after successful cancellation
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === orderId
  //           ? {
  //               ...order,
  //               cartItems: order.cartItems.map((item) =>
  //                 item._id === itemId ? { ...item, itemStatus: 'Cancelled' } : item
  //               ),
  //             }
  //           : order
  //       )
  //     );
  
  //     // Show success alert
  //     alert('Order item cancelled successfully!');
  //   } catch (error) {
  //     console.error('Error cancelling order:', error);
      
  //     // Show error alert
  //     alert('Failed to cancel order. Please try again later.');
  //   }
  // };
  








  // Function to handle order cancellation
  const handleCancelOrder = async (orderId, itemId) => {
    try {
      const token = localStorage.getItem('token');
      
      // API call to cancel the order item
      const response = await axios.put(
        API_ENDPOINTS.USER_CANCEL_ORDER(orderId, itemId),
        { status: 'Cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Get the new estimated pickup date from the response
      const { estimatedPickupDate } = response.data;

      // Update the UI after successful cancellation
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                cartItems: order.cartItems.map((item) =>
                  item._id === itemId
                    ? {
                        ...item,
                        itemStatus: 'Cancelled',
                        estimatedPickupDate: new Date(estimatedPickupDate).toLocaleDateString(), // Update the pickup date
                      }
                    : item
                ),
              }
            : order
        )
      );

      // Show success alert with estimated pickup date
      alert('Order item cancelled successfully! Estimated pickup date: ' + new Date(estimatedPickupDate).toLocaleDateString());
    } catch (error) {
      console.error('Error cancelling order:', error);
      
      // Show error alert
      alert('Failed to cancel order. Please try again later.');
    }
  };







  if (loading) {
    return <div>Loading your data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleViewImage = (imagePath) => {
    window.open(imagePath, '_blank'); // Open the image in a new tab
  };


  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  
  return (
    // <div className="user-dashboard" id='user'>
    //   <div className="sidebar1" id='sidebar1'>
      <div className="admin-dashboard" id='admin'>
      <div className="sidebar" id='sidebar'> 

        
      <ul>
      <div className="top-sidebar1">
        <p id='user' className='userclass'>Logged in as:</p>
        {/* <p id='user'><strong id='adminid'>User ID:</strong> {userId}</p> */}
        <p id='user1'><strong id='adminid'></strong> {userId}</p>
        <p><strong id='adminid'></strong> {email}</p>
        <hr></hr>
        
        {/* <p><strong>Email:</strong> {email}</p> */}
      </div>
      <div className="top-sidebar1">
      <li 
            className={activeSection === 'appointments' ? 'active' : ''} 
            onClick={() => handleSectionChange('appointments')}
          >
            Appointments
          </li>

          <li 
            className={activeSection === 'orders' ? 'active' : ''} 
            onClick={() => handleSectionChange('orders')}>Orders
          
          </li>

          <li 
            className={activeSection === 'contacts' ? 'active' : ''} 
            onClick={() => handleSectionChange('contacts')}
          >
            Contacts
          </li>

          
          {/* <li 
            className={activeSection === 'userregs' ? 'active' : ''} 
            onClick={() => handleSectionChange('userregs')}
          >
            userregs
          </li> */}

          <li 
            className={activeSection === 'donations' ? 'active' : ''} 
            onClick={() => handleSectionChange('donations')}
          >
            Donations
          </li>

          <li 
            className={activeSection === 'petAdoptions' ? 'active' : ''} 
            onClick={() => handleSectionChange('petAdoptions')}
          >
            Pet Adoptions
          </li>

          <li 
            className={activeSection === 'volunteers' ? 'active' : ''} 
            onClick={() => handleSectionChange('volunteers')}
          >
            Volunteers
          </li>

         
        
        </div>
        </ul>
      </div>
      

      {activeSection === 'appointments' && (
  <div className="card-wrapper1">
    <h3>Your Appointments</h3>
    {appointments.length > 0 ? (
      <div className="card-container">
        {appointments.map((appointment) => (
          <div className="appointment-card" key={appointment._id}>
            {/* <h4>Service: {appointment.service}</h4> */}
            <div className="card-header">
            <h4>Owner Name :  {`${appointment.firstName} ${appointment.lastName}`} </h4>
            <p><strong>Appointment Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Services: </strong>{appointment.service}</p>
            <p><strong>Status:</strong> {appointment.status ? appointment.status : "Pending"}</p>
            <p>
            <strong>Image:</strong>
            {appointment.image ? (
              <span>
                {/* <button id='vi' onClick={() => handleViewImage(`http://localhost:5000/uploads/${pet.image}`)}>View Image</button> */}
                <button   id='vi' onClick={() => handleViewImage(API_ENDPOINTS.UPLOAD_APPOINTMENT(appointment.image))}>View Image</button>
              </span>
            ) : (
              <span>  No Image</span>
            )}
          </p>

          </div>
            
            
            <p><strong>Email:</strong> {appointment.email}</p>
            <p><strong>Phone:</strong> {appointment.phone}</p>
            <p><strong>Address:   </strong>
            
              {appointment.address1},
              {appointment.address2 && (
                <>
                  <span>&nbsp;&nbsp;{appointment.address2}</span><br />
                </>
              )}
              <span>&nbsp;&nbsp;{appointment.city}, {appointment.state}, {appointment.zip}, {appointment.country}</span>
            </p>

            <p><strong>Pet Name:</strong> {`${appointment.petFirstName} ${appointment.petLastName}`}</p>
            <p><strong>Breed:</strong> {appointment.breed}</p>
            <p><strong>Age:</strong> {appointment.age}</p>
            <p><strong>Gender:</strong> {appointment.gender}</p>
            <p><strong>Signature:</strong> {appointment.signature}</p>
           
            
            
          </div>
        ))}
      </div>
    ) : (
      <p>No appointments found.</p>
    )}
  </div>
)}




      {activeSection === 'volunteers' && ( 
        //  <div className="table-wrapper1">
         <div className=" card-wrapper1">
          <section>
            <h3>Your Volunteer Applications</h3>
            {volunteers.length > 0 ? (
              <div className="card-container">
                {volunteers.map((volunteer) => (
                  <div className="card" key={volunteer._id}>
                    <h4> Name: {`${volunteer.firstName} ${volunteer.lastName}`}</h4>
                    <p> <strong>Email:</strong> {volunteer.email}</p>
                    <p><strong>Phone:</strong> {volunteer.phone}</p>
                    <p><strong>Address:</strong> {`${volunteer.address || ''}, ${volunteer.address2 || ''}, ${volunteer.city || ''}, ${volunteer.state || ''}, ${volunteer.zip || ''}, ${volunteer.country || ''}`}</p>
                    <p><strong>Skills:</strong> {Array.isArray(volunteer.skills) ? volunteer.skills.join(', ') : (volunteer.skills || 'N/A')}</p>
                    <p><strong>Days of Work: </strong>{Array.isArray(volunteer.daysOfWork) ? volunteer.daysOfWork.join(', ') : (volunteer.availability || 'N/A')}</p>
                    <p><strong>Comments: </strong>{volunteer.message || volunteer.commentsInput || 'N/A'}</p>
                    <p><strong>Submitted At:</strong> {new Date(volunteer.createdAt).toLocaleDateString()}</p>
                    {/* <p><strong>Status:</strong> {volunteer.status || 'Pending'}</p> */}
                    <p>
                        {/* <strong>Status:</strong>
                        <span 
                          className={
                            volunteer.status === 'pending' ? 'status-pending' : 
                            volunteer.status === 'cancel' ? 'status-cancel' : 
                            volunteer.status === 'approved' ? 'status-approved' : ''
                          }
                        >
                          {volunteer.status}
                        </span> */}


<strong>Status:</strong>
<span
  id={`status-${volunteer.status}`}  // Adding id attribute based on volunteer status
>
  {volunteer.status}
</span>

                      </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No volunteer applications found.</p>
            )}
          </section>
      </div>

      )}

      {/* Display user contact messages */}

      {activeSection === 'contacts' && (
        //  <div className="table-wrapper1">
        <div className="card-wrapper1">
      


        <section>
          <h3>Your Contact Messages</h3>
          {contacts.length > 0 ? (
            <div className="contact-cards-container">
              {contacts.map((contact) => (
                <div key={contact._id} className="contact-card">
                  <h4>{contact.name}</h4>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Contact No.:</strong> {contact.contactNo}</p>
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                  <p><strong>Submitted At:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {contact.status ? contact.status : "Pending"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No contact messages found.</p>
          )}
        </section>

      </div>

     )}



        {/* Display user contact messages */}

       {activeSection === 'userregs' && (
         <div className="card-wrapper1">
      <section>
        <h3>Your Profile</h3>
        {userregs.length > 0 ? (
          <table>
            <thead>
              <tr>
              <th>First Name</th>
                    <th>Last Name</th>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Date of Birth</th>
                    <th>Created At</th>
                    <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userregs.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                      <td>{user.userId}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                      {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> */}
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contact messages found.</p>
        )}
      </section>
      </div>

      )} 

      {/* Display user donation messages */}
     

        {activeSection === 'donations' && (
          <div className='card-wrapper1'>
            <section className='user-dash-section'>
              <h3 className='user-dash-title'>Your Donations</h3>
              {donations.length > 0 ? (
                <div className="card-container">
                  {donations.map((donation) => (
                    <div key={donation._id} className="card donation-card">
                      <h4>{`${donation.firstName} ${donation.lastName}`}</h4>
                      <p><strong>Email:</strong> {donation.email}</p>
                      <p><strong>Phone:</strong> {donation.phone}</p>
                      <p><strong>Donation Type:</strong> {donation.donationType}</p>
                      <p><strong>Amount:</strong> {donation.amount || "N/A"}</p>
                      <p><strong>Payment Method:</strong> {donation.paymentMethod || "N/A"}</p>
                      <p><strong>Selected Item:</strong> {donation.selectedItem || "N/A"}</p>
                      <p><strong>Quantity:</strong> {donation.quantity || "N/A"}</p>
                      <p><strong>Pet Supplies:</strong> {donation.petSupplies || "N/A"}</p>
                      <p><strong>Submitted At:</strong> {new Date(donation.createdAt).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {donation.status ? donation.status : "Pending"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No donations found.</p>
              )}
            </section>
          </div>
        )}




      {activeSection === 'petAdoptions' && (
         <div id='card' className='card-wrapper1'>
        {/* //  <div id='card' className="card-container1"> */}
          {/* <h3>Your Pet Adoptions</h3> */}
          {petAdoptions.length > 0 ? (
            petAdoptions.map((pet) => (
              <div className="adoption-card" key={pet._id}>
                <div className="card-header">
                  {/* <h4>{`${pet.firstName} ${pet.lastName}`}</h4> */}
                  <h4>Client Name: {`${pet.firstName} ${pet.lastName},`} </h4>
                  <p><strong>Apply Date:</strong> {new Date(pet.createdAt).toLocaleDateString()}</p>
                  <p><strong>Adoption Date:</strong> {new Date(pet.date).toLocaleDateString()}</p>
                  <p><strong> Status:</strong> {pet.status ? pet.status : 'Pending'}</p>
                  <p>
                  <strong>Image:</strong>
                  {pet.image ? (
                    <span>
                      <button id='vi' onClick={() => handleViewImage(API_ENDPOINTS.UPLOADS(pet.image))}>View Image</button>
                    </span>
                  ) : (
                    <span>  No Image</span>
                  )}
                </p>

                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {pet.email}</p>
                  <p><strong>Phone:</strong> {pet.phone}</p>
                  <p><strong>Pet Name:</strong> {pet.petName}</p>
                  <p><strong>Address:</strong> {`${pet.address}, ${pet.address2}, ${pet.city}, ${pet.state}, ${pet.zip}, ${pet.country}`}</p>
                  <p><strong>Reference Name:</strong> {pet.referenceName}</p>
                  <p><strong>Reference Email:</strong> {pet.referenceEmail}</p>
                  <p><strong>Reference Contact No.:</strong> {pet.referenceContactNo}</p>

                  <p><strong>Own Pets:</strong> {pet.ownPets}</p>
                  <p><strong>Additional Pet Name:</strong> {pet.petName1}</p>



                  <p><strong>Email:</strong> {pet.email}</p>
                  <p><strong>Phone:</strong> {pet.phone}</p>
                  <p><strong>Pet Name:</strong> {pet.petName}</p>
                  <p><strong>Address:</strong> {`${pet.address}, ${pet.address2}, ${pet.city}, ${pet.state}, ${pet.zip}, ${pet.country}`}</p>
                  <p><strong>Reference Name:</strong> {pet.referenceName}</p>
                  <p><strong>Reference Email:</strong> {pet.referenceEmail}</p>
                  <p><strong>Reference Contact No.:</strong> {pet.referenceContactNo}</p>


                  
                  <p><strong>Pet Breed:</strong> {pet.petBreed}</p>
                  <p><strong>Pet Details:</strong> {pet.petDetails}</p>
                  <p><strong>Veterinarian Name:</strong> {`${pet.veterinarianFirstName} ${pet.veterinarianLastName}`}</p>
                  <p><strong>Veterinarian Phone:</strong> {pet.veterinarianPhone}</p>
                  <p><strong>Home Ownership:</strong> {pet.homeOwnership}</p>
                  <p><strong>Landlord Info:</strong> {pet.landlordInfo}</p>
                  <p><strong>Yard:</strong> {pet.yard}</p>
                  <p><strong>Fenced:</strong> {pet.isFenced}</p>
                  <p><strong>Pet Policy:</strong> {pet.petPolicy}</p>
                  <p><strong>Surrendered:</strong> {pet.surrendered}</p>
                  <p><strong>Children at Home:</strong> {pet.childrenHome}</p>
                  <p><strong>Hours Alone:</strong> {pet.hoursAlone}</p>
                  <p><strong>Emergency Plan:</strong> {pet.emergencyPlan}</p>
                  
                  <p><strong>Animal Crimes:</strong> {pet.animalCrimes}</p>
                  <p><strong>Crime Details:</strong> {pet.crimeDetails}</p>

                  
                  <p><strong>Amount:</strong> {pet.amount}</p>
                  <p><strong>Payment Method:</strong> {pet.paymentMethod}</p>
                </div>
              
              </div>
            ))
          ) : (
            <p>No pet adoptions found.</p>
          )}
        </div>
      )}



          {activeSection === 'orders' && (
            <div className="card-wrapper1">
              <section>
                <h3>Your Orders</h3>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div className="order-card" key={order._id}>
                      <div className="order-info">
                        <h4>Order ID: {order._id}</h4>
                        <p><strong>User ID:</strong> {order.userId}</p>
                        <p><strong>Name:</strong> {order.address.name}</p>
                        <p><strong>Order Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                       
                        <p><strong>Email:</strong> {order.address.email}</p>
                        <p><strong>Mobile No:</strong> {order.address.mobile}</p>
                      
                        <p>
                          <strong>Address:   </strong> 
                          {order.address.address}, {order.address.locality}, {order.address.landmark}, {order.address.city}, {order.address.state}, {order.address.pincode}
                        </p>

                        <p><strong>Alternate Mobile:</strong> {order.address.alternateMobile}</p>
                        <p><strong>Total Amount:</strong> {order.totalAmount} ₹</p>
                        <p><strong>Order Type:</strong> {order.orderType}</p>
                        
                       
                      </div>

                    

          <div className="cart-items">
            <h5><b>Order Items</b></h5>
            {order.cartItems.length > 0 ? (
              <div className="cart-items-wrapper">
                {order.cartItems.map((item) => (
                  <div className="cart-item-card" key={item._id}>
                    <div className="cart-item-info">
                      <p><strong>Item ID:</strong> {item.id}</p>
                      {/* <p><strong>Item Name:</strong> {item.name}</p> */}
                      <p>
                        <strong>Item Name:</strong>{" "}
                        <Link to={`/ProductPage${item.id}`}>{item.name}</Link>
                      </p>

                      <p>
                        <strong>Status:  </strong>
                        <span 
                          className={
                            item.status === 'Pending' ? 'status-pending' :
                            item.status === 'Accepted' ? 'status-accepted' :
                            item.status === 'Rejected' ? 'status-rejected' :
                            item.status === 'Processing' ? 'status-processing' :
                            item.status === 'Shipped' ? 'status-Shipped' :
                            item.status === 'Transit' ? 'status-transit' :
                            
                            item.status === 'Out for Delivery' ? 'status-out-for-delivery' :
                            item.status === 'Delivered' ? 'status-delivered' :
                            item.status === 'Failed Delivery' ? 'status-failed' :
                            item.status === 'Return Initiated' ? 'status-return-initiated' :
                            item.status === 'Return Picked Up' ? 'status-return-picked-up' :
                            ''
                          }
                        >
                          {item.status}
                        </span>
                      </p>

{/* 
                      <p>
  <strong>Order Cancel:  </strong> 
  <span  id='can' className={item.itemStatus === 'Canceled' ? 'status-canceled' : ''}>
    {item.itemStatus}
  </span>

  {item.itemStatus === 'N/A' && (
    <button id='cancel'
      className="cancel-order-button"
      onClick={() => handleCancelOrder(order._id, item._id)}
    >
      Cancel Order
    </button>
  )}
</p> */}






<p>
  <strong>Order Cancel:  </strong> 
  <span id='can' className={item.itemStatus === 'Cancelled' ? 'status-canceled' : ''}>
    {item.itemStatus}
  </span>

  {item.itemStatus === 'N/A' && (
    <>
      {/* Show the estimated pickup date
      <p>Estimated Pickup Date: {new Date(item.estimatedPickupDate).toLocaleDateString()}</p> */}

      <button 
        id='cancel'
        className="cancel-order-button"
        onClick={() => handleCancelOrder(order._id, item._id)}
        // Disable the button if the estimated pickup date has passed
        disabled={new Date(item.estimatedPickupDate) < new Date()}
      >
        Cancel Order
      </button>
    </>
  )}


        {/* Show the estimated pickup date */}
        {/* <p><strong>Estimated Pickup Date:   </strong> {new Date(item.estimatedPickupDate).toLocaleDateString()}</p> */}


  {/* Optionally, show a message if the pickup date has passed */}
  {item.itemStatus === 'N/A' && new Date(item.estimatedPickupDate) < new Date() && (
    <p style={{ color: 'red' }}>Cannot cancel, pickup date has passed.</p>
  )}
</p>




                      {item.date && <p><strong>Order Date :  </strong> {new Date(item.date).toLocaleDateString()}</p>}
                      {item.estimatedDeliveryDate && <p><strong>Estimate Delivery Date : </strong> {new Date(item.estimatedDeliveryDate).toLocaleDateString()}</p>}
                      {/* Conditionally render Size if it exists */}
                      {/* <p><strong>Estimated Pickup Date:   </strong> {new Date(item.estimatedPickupDate).toLocaleDateString()}</p> */}
                      {item.size && <p><strong>Size:</strong> {item.size}</p>}

                      {/* Conditionally render Color if it exists */}
                      {item.color && <p><strong>Color:</strong> {item.color}</p>}
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> {item.price} ₹</p>
                      <p><strong>Sub-Total:</strong> {item.subtotal} ₹</p>
                       
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                        onClick={() => openModal(item.image)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No items found in this order.</p>
            )}
          </div>


          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
            {/* <img src={selectedImage} alt="Selected" style={{ width: '50%', height:"50%" }} /> */}
          </div>
        </div>
      )}
    </section>
  </div>
)}

    </div>
    
  );
   
};


export default UserDashboard;




