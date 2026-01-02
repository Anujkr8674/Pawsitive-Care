import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './AdminDashboard.css'; // Ensure this contains styles for proper table formatting


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [email, setAdminEmail] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

     // Retrieve adminId from localStorage
     const storedAdminId = localStorage.getItem('adminId');
     setAdminId(storedAdminId);

     const storedAdminEmail = localStorage.getItem('email');
     setAdminEmail(storedAdminEmail);
 
     // Fetch admin email from the backend using the storedAdminId
     const fetchAdminDetails = async () => {
       try {
         const response = await axios.get(API_ENDPOINTS.GET_ADMIN(storedAdminId));
        //  setAdminEmail(response.data.email);
       } catch (error) {
         console.error('Error fetching admin details:', error);
       }
     };
 
     if (storedAdminId) {
       fetchAdminDetails();
     }

  }, []);

  const navigate = useNavigate();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('email');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const [activeSection, setActiveSection] = useState('adminRegs');
  const [adminregs, setAdminRegs] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [petAdoptions, setPetAdoptions] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [userRegs, setUserRegs] = useState([]);
  const [error, setError] = useState(null); // New state for error handling
  const [subscriptions, setSubscriptions] = useState([]);
  const [review, setReviews] = useState([]);


  const [selectedImage, setSelectedImage] = useState(null);



  // const [loading, setLoading] = useState(false); // Loading state

  // const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);

  // const [reviews, setReviews] = useState([]);

  // Function to fetch data with token
  const fetchData = async (url, setState) => {
    const token = localStorage.getItem('adminToken'); // Retrieve the token from localStorage
    // setLoading(true); // Set loading to true
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the request header
        },
      });
      console.log('Fetched data:', response.data); // Debugging
      setState(response.data.reverse());
    } catch (error) {
      console.error(`Failed to fetch data from ${url}`, error);
      setError('Failed to fetch data'); // Update error state
    }
  };

  // Unified handleDelete function
  const handleDelete = async (url, id, setState) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response); // Check the response
      if (response.status === 200) {
        console.log('Deletion successful');
        fetchData(API_ENDPOINTS.ADMIN_SECTION(activeSection), setState); // Refresh the data
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item'); // Update error state
    }
  };

  // Fetch data based on the active section
  useEffect(() => {
    const urls = {
      adminRegs: API_ENDPOINTS.ADMIN_REGS,
      appointments: API_ENDPOINTS.ADMIN_APPOINTMENTS,
      contacts: API_ENDPOINTS.ADMIN_CONTACTS,
      donations: API_ENDPOINTS.ADMIN_DONATIONS,
      petAdoptions: API_ENDPOINTS.ADMIN_PET_ADOPTIONS,
      registrations: API_ENDPOINTS.ADMIN_REGISTRATIONS,
      volunteers: API_ENDPOINTS.ADMIN_VOLUNTEERS,
      userRegs: API_ENDPOINTS.ADMIN_USER_REGS,
      subscriptions: API_ENDPOINTS.ADMIN_SUBSCRIPTIONS,
      reviews: API_ENDPOINTS.ADMIN_REVIEWS,
      orders: API_ENDPOINTS.ADMIN_ORDERS,
    };

    const fetchAllData = async () => {
      try {
        await fetchData(urls[activeSection], {
          'adminRegs': setAdminRegs,
          'appointments': setAppointments,
          'contacts': setContacts,
          'donations': setDonations,
          'petAdoptions': setPetAdoptions,
          'registrations': setRegistrations,
          'volunteers': setVolunteers,
          'userRegs': setUserRegs,
          'subscriptions': setSubscriptions,
          'reviews' : setReviews,
          'orders': setOrders
          // 'carts': setCarts
          // 'review': setReviews,
        }[activeSection]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data'); // Update error state
      }
    };

    fetchAllData();
  }, [activeSection]);


   // Handle section change
   const handleSectionChange = (section) => {
    setActiveSection(section);
    // Add logic to fetch data or navigate to the corresponding section
  };

  const handleViewImage = (imagePath) => {
    window.open(imagePath, '_blank'); // Open the image in a new tab
  };
  



  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };


  // for update status

// const updateStatus = async (id, newStatus, type) => {
//   // console.log('Volunteer ID:', id); // Log the ID for debugging
//   // console.log('Type:', type); // Log the type for debugging

//   try {
//     const token = localStorage.getItem('adminToken'); // Adjust if needed

//     console.log('URL:', `http://localhost:5000/api/admin/${type}/${id}/status`); // Log the URL for debugging

//     const response = await axios.patch(
//       `http://localhost:5000/api/admin/${type}/${id}/status`,
//       { status: newStatus },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Use Bearer token format
//         },
//       }
//     );

//     if (response.status === 200) {
//       // Update state to reflect the new status
//       console.log('Status updated successfully');
//       if (type === 'appointments') {
//         setAppointments((prev) =>
//           prev.map((appt) =>
//             appt._id === id ? { ...appt, status: newStatus } : appt
//           )
//         );
//       } else if (type === 'volunteers') {
//         setVolunteers((prev) =>
//           prev.map((vol) =>
//             vol._id === id ? { ...vol, status: newStatus } : vol
//           )
//         );
//       }else if (type === 'contacts') {
//         setContacts((prev) =>
//           prev.map((contact) =>
//             contact._id === id ? { ...contact, status: newStatus } : contact    
//           )
//         );
//       }else if (type === 'donations') {
//         setDonations((prev) =>
//           prev.map((donation) =>
//             donation._id === id ? { ...donation, status: newStatus } : donation   
//           )
//         );
//       }else if (type === 'petadoptions') {
//         setPetAdoptions((prev) =>
//           prev.map((petadoption) =>
//             petadoption._id === id ? { ...petadoption, status: newStatus } : petadoption 
//           )
//         );
//       } else if (type === 'orders') {
//         setOrders((prev) =>
//           prev.map((order) =>
//             order._id === id ? { ...order, status: newStatus } : order   
//           )
//         );
//       } 
      
//       alert('Status updated successfully');
//     } else {
//       console.warn('Unexpected response status:', response.status);
//     }
//   } catch (error) {
//     console.error('Error updating status:', error);
//     alert('Failed to update status');
//   }
// };









// const updateStatus = async (id, newStatus, type) => {
//   try {
//     const token = localStorage.getItem('adminToken'); // Adjust if needed

//     console.log('URL:', `http://localhost:5000/api/admin/${type}/${id}/status`); // Log the URL for debugging

//     // Prepare the payload
//     const payload = { status: newStatus };

//     // If the status is 'Delivered', add the current date as the delivery date
//     if (newStatus === 'Delivered') {
//       payload.deliveryDate = new Date(); // Set the current date as the delivery date
//     }

//     const response = await axios.patch(
//       `http://localhost:5000/api/admin/${type}/${id}/status`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Use Bearer token format
//         },
//       }
//     );

//     if (response.status === 200) {
//       // Update state to reflect the new status
//       console.log('Status updated successfully');
//       if (type === 'appointments') {
//         setAppointments((prev) =>
//           prev.map((appt) =>
//             appt._id === id ? { ...appt, status: newStatus } : appt
//           )
//         );
//       } else if (type === 'volunteers') {
//         setVolunteers((prev) =>
//           prev.map((vol) =>
//             vol._id === id ? { ...vol, status: newStatus } : vol
//           )
//         );
//       } else if (type === 'contacts') {
//         setContacts((prev) =>
//           prev.map((contact) =>
//             contact._id === id ? { ...contact, status: newStatus } : contact    
//           )
//         );
//       } else if (type === 'donations') {
//         setDonations((prev) =>
//           prev.map((donation) =>
//             donation._id === id ? { ...donation, status: newStatus } : donation   
//           )
//         );
//       } else if (type === 'petadoptions') {
//         setPetAdoptions((prev) =>
//           prev.map((petadoption) =>
//             petadoption._id === id ? { ...petadoption, status: newStatus } : petadoption 
//           )
//         );
//       } else if (type === 'orders') {
//         setOrders((prev) =>
//           prev.map((order) =>
//             // order._id === id ? { ...order, status: newStatus } : order 
//         order._id === id ? { ...order, status: newStatus, deliveryDate: payload.deliveryDate } : order  
//           )
//         );
//       }

//       alert('Status updated successfully');
//     } else {
//       console.warn('Unexpected response status:', response.status);
//     }
//   } catch (error) {
//     console.error('Error updating status:', error);
//     alert('Failed to update status');
//   }
// };







const updateStatus = async (id, newStatus, type, cartItems) => {
  try {
    const token = localStorage.getItem('adminToken'); // Adjust if needed

    console.log('URL:', API_ENDPOINTS.ADMIN_STATUS_UPDATE(type, id)); // Log the URL for debugging
    console.log('Updating status:', { id, newStatus, type, cartItems }); // Debug log

    // Prepare the payload
    const payload = {};

    // For orders, include cartItems and status
    if (type === 'orders') {
      if (cartItems && Array.isArray(cartItems)) {
        // Ensure all cart items have proper _id
        payload.cartItems = cartItems.map(item => ({
          _id: item._id || item.id, // Use _id or id
          id: item.id, // Preserve id field
          status: item.status || newStatus, // Use item status or newStatus
        }));
      }
      payload.status = newStatus; // Also update order status
      
      // If the status is 'Delivered', add the current date as the delivery date
      if (newStatus === 'Delivered') {
        payload.deliveryDate = new Date(); // Set the current date as the delivery date
      }
    } else {
      // For other types, just send status
      payload.status = newStatus;
    }

    // Include cartItems if updating an order
    // if (type === 'orders' && Array.isArray(cartItems)) {
    //   payload.cartItems = cartItems.map(item => ({
    //     _id: item._id, // Ensure you're sending the correct identifier
    //     status: newStatus // Update the status for each item
    //   }));
    // }

    const response = await axios.patch(
      API_ENDPOINTS.ADMIN_STATUS_UPDATE(type, id),
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer token format
        },
      }
    );

    if (response.status === 200) {
      // Update state to reflect the new status
      console.log('Status updated successfully');
      if (type === 'appointments') {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id ? { ...appt, status: newStatus } : appt
          )
        );
      } else if (type === 'volunteers') {
        setVolunteers((prev) =>
          prev.map((vol) =>
            vol._id === id ? { ...vol, status: newStatus } : vol
          )
        );
      } else if (type === 'contacts') {
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === id ? { ...contact, status: newStatus } : contact    
          )
        );
      } else if (type === 'donations') {
        setDonations((prev) =>
          prev.map((donation) =>
            donation._id === id ? { ...donation, status: newStatus } : donation   
          )
        );
      } else if (type === 'petadoptions') {
        setPetAdoptions((prev) =>
          prev.map((petadoption) =>
            petadoption._id === id ? { ...petadoption, status: newStatus } : petadoption 
          )
        );
      // } else if (type === 'orders') {
      //   setOrders((prev) =>
      //     prev.map((order) =>
      //       order._id === id ? { 
      //         ...order, 
      //         status: newStatus, 
      //         deliveryDate: payload.deliveryDate,
      //         cartItems: payload.cartItems // Update cartItems status
      //       } : order  
      //     )
      //   );
      }  else if (type === 'orders') {
        // Refetch orders to get updated data from backend
        try {
          const token = localStorage.getItem('adminToken');
          const ordersResponse = await axios.get(API_ENDPOINTS.ADMIN_ORDERS, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (ordersResponse.data && Array.isArray(ordersResponse.data)) {
            setOrders(ordersResponse.data.reverse());
          }
        } catch (fetchError) {
          console.error('Error refetching orders:', fetchError);
          // Fallback: update local state
          setOrders((prev) =>
            prev.map((order) =>
              order._id === id
                ? {
                    ...order,
                    cartItems: payload.cartItems || order.cartItems, // Update cart items
                    deliveryDate: payload.deliveryDate || order.deliveryDate, // If applicable
                    status: newStatus, // Update order status
                  }
                : order
            )
          );
        }
      }

      alert('Status updated successfully');
    } else {
      console.warn('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error updating status:', error);
    alert('Failed to update status');
  }
};







  return (
    <div className="admin-dashboard" id='admin'>
      <div className="sidebar" id='sidebar'>

        <ul>
        <div className="top-sidebar">
        <p className='userclass'>Logged in as:</p>
        <p><strong id='adminid'>AdminId: </strong> {adminId}</p>
        
        <p><strong id='adminid'>Email:</strong> {email}</p>
      </div>
      <hr/>
          {/* <li onClick={() => setActiveSection('adminRegs')}>Admin Registrations</li>
          <li onClick={() => setActiveSection('appointments')}>Appointments</li>
          <li onClick={() => setActiveSection('contacts')}>Contact Messages</li>
          <li onClick={() => setActiveSection('donations')}>Donations</li>
          <li onClick={() => setActiveSection('petAdoptions')}>Pet Adoptions</li>
          <li onClick={() => setActiveSection('registrations')}>Registrations</li>
          <li onClick={() => setActiveSection('volunteers')}>Volunteers</li>
          <li onClick={() => setActiveSection('userRegs')}>User Registrations</li> */}


            <li 
            className={activeSection === 'adminRegs' ? 'active' : ''} 
            onClick={() => handleSectionChange('adminRegs')}
          >
            Admin Registrations
          </li>
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


          <li
             className={activeSection === 'registrations' ? 'active' : ''} 
                onClick={() => setActiveSection('registrations')}>Registrations

          </li>

          <li 
                className={activeSection === 'userRegs' ? 'active' : ''}
                onClick={() => setActiveSection('userRegs')}>User Registrations

          </li>

          <li
             className={activeSection === 'subscriptions' ? 'active' : ''} 
                onClick={() => setActiveSection('subscriptions')}>Subscriptions

          </li>

          <li
             className={activeSection === 'reviews' ? 'active' : ''} 
                onClick={() => setActiveSection('reviews')}>Review

          </li>

        

          
          <br/>
          <button className="logout" id='logout' onClick={handleLogout}> LogOut</button>
          {/* <button className="logout" id='logout' onClick={()=>navigate("/")}>LogOut</button> */}

        </ul>
      </div>
      <div className="content">
        <h2>{activeSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
        {error && <div className="error-message">{error}
    </div>} {/* Display error messages */}

        {activeSection === 'adminRegs' && (
          <section>
            {/* <h3>Admin Registrations</h3> */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Admin ID</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Created At</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {adminregs.map(admin => (
                    <tr key={admin._id}>
                      <td>{admin.firstName}</td>
                      <td>{admin.lastName}</td>
                      <td>{admin.adminId }</td>
                      <td>{admin.email}</td>
                      <td>{new Date(admin.dob).toLocaleDateString()}</td>
                      <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                      {/* <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_REGS, admin._id, setAdminRegs)}>Delete</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'appointments' && (
          <section>
            {/* <h3>Appointments</h3> */}
            <div className="table-wrapper">
             

            <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        
        <th>Address 1</th>
        <th>Address 2</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Country</th>
        <th>Pet First Name</th>
        <th>Pet Last Name</th>
        <th>Breed</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Service</th>
        <th> Appoi Date</th>
        <th>Signature</th>
        {/* <th></th> */}
        {/* <th>createdAt</th> */}
        <th>image</th>
        <th>Status</th>
        <th>Action</th>
        <th>Created At</th>
        <th>Erase</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map(appt => (
        <tr key={appt._id}>
          <td>{appt.firstName}</td>
          <td>{appt.lastName}</td>
          <td>{appt.email}</td>
          <td>{appt.phone}</td>
         
          <td>{appt.address1}</td>
          <td>{appt.address2}</td>
          <td>{appt.city}</td>
          <td>{appt.state}</td>
          <td>{appt.zip}</td>
          <td>{appt.country}</td>
          <td>{appt.petFirstName}</td>
          <td>{appt.petLastName}</td>
          <td>{appt.breed}</td>
          <td>{appt.age}</td>
          <td>{appt.gender}</td>
          <td>{appt.service}</td>

          <td>{new Date(appt.date).toLocaleDateString()}</td>
          <td>{appt.signature}</td>
          
          <td>
            {appt.image ? (
                <button onClick={() => handleViewImage(API_ENDPOINTS.UPLOAD_APPOINTMENT(appt.image))}>View</button>
                  ) : (
                    'No Image'
                    )}
          </td>          


                       {/* <td>{vol.createdAt}</td> */}
              {/* <td>{new Date(appt.createdAt).toLocaleDateString()}</td> */}
              <td className={
                appt.status === 'Accepted' ? 'status-accepted' :
                appt.status === 'Rejected' ? 'status-rejected' :
                appt.status === 'Pending' ? 'status-pending' : 
                 ''
                }>
                  {appt.status}
                </td>
                <td className='st'>
                  <button id='status' className="btndash" onClick={() => updateStatus(appt._id, 'Accepted', 'appointments')}>Accept</button>
                  <button id='status' className="btndash" onClick={() => updateStatus(appt._id, 'Rejected', 'appointments')}>Reject</button>
                </td>

                <td>{new Date(appt.createdAt).toLocaleDateString()}</td>

                          <td>
                            <button id="btndash" onClick={() => handleDelete(API_ENDPOINTS.ADMIN_APPOINTMENTS, appt._id, setAppointments)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                    </div>
                </section>
             )}

        {activeSection === 'contacts' && (
          <section>
            {/* <h3>Contact Messages</h3> */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created At</th>
                    <th>status</th>
                    <th>Action</th>
                    <th>Erase</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      {/* <td>{contact.message}</td> */}
                      <td>
                {/* Add the 'Read More' feature for messages */}
                {contact.message && contact.message.length > 100 ? (
                  <>
                    {contact.showFullMessage ? contact.message : `${contact.message.substring(0, 100)}...`}
                    {/* <span 
                      className="read-more" 
                      onClick={() => {
                        const updatedContacts = contacts.map(c => 
                          c._id === contact._id ? { ...c, showFullMessage: !c.showFullMessage } : c
                        );
                        setContacts(updatedContacts);
                      }}
                    >
                      {contact.showFullMessage ? 'Read Less' : 'Read More'}
                    </span> */}
                    <span 
  className="read-more1" 
  onClick={() => {
    const updatedContacts = contacts.map(c => 
      c._id === contact._id ? { ...c, showFullMessage: !c.showFullMessage } : c
    );
    setContacts(updatedContacts);
  }}
>
  {contact.showFullMessage ? 'Read Less' : 'Read More'}
</span>

                  </>
                ) : (
                  contact.message
                )}
              </td>
              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      {/* <td>{new Date(contact.createdAt).toLocaleDateString()}</td> */}

              <td className={
                contact.status === 'Accepted' ? 'status-accepted' :
                contact.status === 'Rejected' ? 'status-rejected' :
                contact.status === 'Pending' ? 'status-pending' : 
                 ''
                }>
                  {contact.status}
                </td>

                <td className='st'>
                  <button id='status' className="btndash" onClick={() => updateStatus(contact._id, 'Accepted', 'contacts')}>Accept</button>
                  <button id='status' className="btndash" onClick={() => updateStatus(contact._id, 'Rejected', 'contacts')}>Reject</button>
                </td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_CONTACTS, contact._id, setContacts)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'donations' && (
          <section>
            {/* <h3>Donations</h3> */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Donation Type</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Selected Item</th>
                    <th>Quantity</th>
                    <th>Pet Supplies</th>
                    {/* <th>Action</th> */}
                    <th>Created At</th>
                    <th>status</th>
                    <th>Action</th>
                    <th>Erase</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(donation => (
                    <tr key={donation._id}>
                      <td>{donation.firstName}</td>
                      <td>{donation.lastName}</td>
                      <td>{donation.email}</td>
                      <td>{donation.phone}</td>
                      <td>{donation.donationType}</td>
                      <td>{donation.amount}</td>
                      <td>{donation.paymentMethod}</td>
                      <td>{donation.selectedItem}</td>
                      <td>{donation.quantity}</td>
                      <td>{donation.petSupplies}</td>
                      <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                      
              <td className={
                donation.status === 'Accepted' ? 'status-accepted' :
                donation.status === 'Rejected' ? 'status-rejected' :
                donation.status === 'Pending' ? 'status-pending' : 
                 ''
                }>
                  {donation.status}
                </td>

                <td className='st'>
                  <button id='status' className="btndash" onClick={() => updateStatus(donation._id, 'Accepted', 'donations')}>Accept</button>
                  <button id='status' className="btndash" onClick={() => updateStatus(donation._id, 'Rejected', 'donations')}>Reject</button>
                </td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_DONATIONS, donation._id, setDonations)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'petAdoptions' && (
          <section>
            {/* <h3>Pet Adoptions</h3> */}
            <div className="table-wrapper">
                        <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Pet Name</th>
                                <th>Address</th>
                                <th>Address 2</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Country</th>
                                
                                <th>Own Pets</th>
                                {/* add */}
                                <th>Pet Name</th>
                                <th>Pet Breed</th>
                                {/* add end */}
                                <th>Pet Details</th>
                                {/* <th>Veterinarian Name</th> */}
                                <th>Veterinarian First Name</th>
                                <th>Veterinarian Last Name</th>
                                <th>Veterinarian Phone</th>
                                <th>Home Ownership</th>
                                <th>Landlord Info</th>
                                <th>Yard</th>
                                <th>Fenced</th>
                                <th>Pet Policy</th>
                                <th>Surrendered</th>
                                <th>Children Home</th>
                                <th>Hours Alone</th>
                                {/* <th>Crate Pet</th> */}
                                <th>Emergency Plan</th>
                                {/* <th>Behavioral Issues</th> */}
                                <th>Reference Name</th>
                                <th>Reference Email</th>
                                <th>Reference Contact No.</th>
                                <th>Animal Crimes</th>
                                <th>Crime Details</th>
                                <th> Adoption Date</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                {/* <th>Signature</th> */}
                                {/* <th>Action</th> */}
                                <th>Image</th>
                                {/* <th>Action</th> */}
                                <th>Created At</th>
                                <th>status</th>
                                <th>Action</th>
                                <th>Erase</th>
                            </tr>
                            </thead>
                            <tbody>
                            {petAdoptions.map(pet => (
                                <tr key={pet._id}>
                                <td>{pet.firstName}</td>
                                <td>{pet.lastName}</td>
                                <td>{pet.email}</td>
                                <td>{pet.phone}</td>
                                <td>{pet.petName}</td>
                                <td>{pet.address}</td>
                                <td>{pet.address2}</td>
                                <td>{pet.city}</td>
                                <td>{pet.state}</td>
                                <td>{pet.zip}</td>
                                <td>{pet.country}</td>
                               
                                <td>{pet.ownPets}</td>
                                {/* add */}
                                <td>{pet.petName1}</td>
                                <td>{pet.petBreed}</td>
                                {/* end */}
                                <td>{pet.petDetails}</td>
                                {/* <td>{pet.veterinarianName}</td> */}
                                <td>{pet.veterinarianFirstName}</td>
                                <td>{pet.veterinarianLastName}</td>
                                <td>{pet.veterinarianPhone}</td>
                                <td>{pet.homeOwnership}</td>
                                <td>{pet.landlordInfo}</td>
                                <td>{pet.yard}</td>
                                <td>{pet.isFenced}</td>
                                <td>{pet.petPolicy}</td>
                                <td>{pet.surrendered}</td>
                                <td>{pet.childrenHome}</td>
                                <td>{pet.hoursAlone}</td>
                                {/* <td>{pet.cratePet}</td> */}
                                <td>{pet.emergencyPlan}</td>
                                {/* <td>{pet.behavioralIssues}</td> */}
                                <td>{pet.referenceName}</td>
                                <td>{pet.referenceEmail}</td>
                                <td>{pet.referenceContactNo}</td>
                                <td>{pet.animalCrimes}</td>
                                <td>{pet.crimeDetails}</td>
                                <td>{new Date(pet.date).toLocaleDateString()}</td>
                                <td>{pet.amount}</td>
                                <td>{pet.paymentMethod}</td>
                                {/* <td>{pet.paymentMethod}</td> */}
                                {/* <td>{pet.signature}</td> */}
                                {/* {pet.image && (
                                    <img src={`http://localhost:5000/uploads/${pet.image}`} alt="Pet" width="100"  height="100" />
                                  )} */}


                                  <td>
                                    {pet.image ? (
                                      <button onClick={() => handleViewImage(API_ENDPOINTS.UPLOADS(pet.image))}>View</button>
                                    ) : (
                                      'No Image'
                                    )}
                                  </td>

                                  <td>{new Date(pet.createdAt).toLocaleDateString()}</td>
                      
                      <td className={
                        pet.status === 'Accepted' ? 'status-accepted' :
                        pet.status === 'Rejected' ? 'status-rejected' :
                        pet.status === 'Pending' ? 'status-pending' : 
                         ''
                        }>
                          {pet.status}
                        </td>
        
                        <td className='st'>
                          <button id='status' className="btndash" onClick={() => updateStatus(pet._id, 'Accepted', 'petadoptions')}>Accept</button>
                          <button id='status' className="btndash" onClick={() => updateStatus(pet._id, 'Rejected', 'petadoptions')}>Reject</button>
                        </td>


                                <td>
                                    <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_PET_ADOPTIONS, pet._id, setPetAdoptions)}>
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </section>
        )}

        {activeSection === 'registrations' && (
          <section>
            {/* <h3>Registrations</h3> */}
            <div className="table-wrapper">
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
                  {registrations.map(reg => (
                    <tr key={reg._id}>
                      <td>{reg.firstName}</td>
                      <td>{reg.lastName}</td>
                      <td>{reg.userId}</td>
                      <td>{reg.email}</td>
                      <td>{reg.mobileNumber}</td>
                      <td>{new Date(reg.dateOfBirth).toLocaleDateString()}</td>
                      <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_REGISTRATIONS, reg._id, setRegistrations)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'volunteers' && (
          <section>
            {/* <h3>Volunteers</h3> */}
            <div className="table-wrapper">
             
              <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            {/* <th>Pet Name</th> */}
                            <th>Address</th>
                            <th>Address 2</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Country</th>
                            <th>Skills</th>
                            <th>Days of Work</th>
                            <th>Skill</th>
                            <th>Comments</th>
                            <th>Created At</th>
                            <th>Status</th>

                            <th>Action</th>
                            <th>Erase</th>
                        </tr>
                        </thead>
                        <tbody>
                        {volunteers.map(vol => (
                            <tr key={vol._id}>
                            <td>{vol.firstName}</td>
                            <td>{vol.lastName}</td>
                            <td>{vol.email}</td>
                            <td>{vol.phone}</td>
                            {/* <td>{vol.petName}</td> */}
                            <td>{vol.address}</td>
                            <td>{vol.address2}</td>
                            <td>{vol.city}</td>
                            <td>{vol.state}</td>
                            <td>{vol.zip}</td>
                            <td>{vol.country}</td>
                            <td>{Array.isArray(vol.skills) ? vol.skills.join(", ") : (vol.skills || 'N/A')}</td>
                            <td>{Array.isArray(vol.daysOfWork) ? vol.daysOfWork.join(", ") : (vol.availability || 'N/A')}</td> 
                            <td>{vol.skillInput}</td>
                            {/* <td>{vol.commentsInput}</td> */}
                            <td>
                {/* Add the 'Read More' feature for comments */}
                {vol.commentsInput && vol.commentsInput.length > 25 ? (
                  <>
                    {vol.showFullComment ? vol.commentsInput : `${vol.commentsInput.substring(0, 100)}...`}
                    <span 
                      className="read-more1" 
                      onClick={() => {
                        const updatedVolunteers = volunteers.map(v => 
                          v._id === vol._id ? { ...v, showFullComment: !v.showFullComment } : v
                        );
                        setVolunteers(updatedVolunteers);
                      }}
                    >
                      {vol.showFullComment ? 'Read Less' : 'Read More'}
                    </span>
                  </>
                ) : (
                  vol.commentsInput
                )}
              </td>

              {/* <td>{vol.createdAt}</td> */}
              <td>{new Date(vol.createdAt).toLocaleDateString()}</td>
              <td className={
                vol.status === 'Accepted' ? 'status-accepted' :
                vol.status === 'Rejected' ? 'status-rejected' :
                vol.status === 'Pending' ? 'status-pending' : 
                 ''
                }>
                  {vol.status}
                </td>
                <td className='st'>
                  <button id='status' className="btndash" onClick={() => updateStatus(vol._id, 'Accepted', 'volunteers')}>Accept</button>
                  <button id='status' className="btndash" onClick={() => updateStatus(vol._id, 'Rejected', 'volunteers')}>Reject</button>
                </td>
            
            <td>
                <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_VOLUNTEERS, vol._id, setVolunteers)}>Delete</button>
           </td>
        </tr>
       ))}
       </tbody>
      </table>
      </div>
      </section>        
    )}

        {activeSection === 'userRegs' && (
          <section>
            {/* <h3>User Registrations</h3> */}
            <div className="table-wrapper">
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
                  {userRegs.map(user => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.userId}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                      {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> */}
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_USER_REGS, user._id, setUserRegs)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'subscriptions' && (
          <section>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Subscribed At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(sub => (
                    <tr key={sub._id}>
                      <td>{sub._id}</td>
                      <td>{sub.email}</td>
                      <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_SUBSCRIPTIONS, sub._id, setSubscriptions)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        )}



        {activeSection === 'reviews' && (
          <section>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {review.map(rev => (
                    <tr key={rev._id}>
                      <td>{rev._id}</td>
                      <td>{rev.name}</td>
                      <td>{rev.email}</td>
                      <td>
                        {/* Check if message is longer than the defined limit */}
                        {rev.message.length > 100 ? (
                          <>
                            {rev.showFullMessage ? rev.message : `${rev.message.substring(0, 100)}...`}
                            <span 
                              className="read-more1" 
                              onClick={() => {
                                const updatedReviews = review.map(r => 
                                  r._id === rev._id ? { ...r, showFullMessage: !r.showFullMessage } : r
                                );
                                setReviews(updatedReviews);
                              }}
                            >
                              {rev.showFullMessage ? 'Read Less' : 'Read More'}
                            </span>
                          </>
                        ) : (
                          rev.message
                        )}
                      </td>
                      <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button id='btndash' onClick={() => handleDelete(API_ENDPOINTS.ADMIN_REVIEWS, rev._id, setReviews)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}




        {activeSection === 'orders' && (
          <section>
            <div className="table-wrapper">
              <table>

                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      {/* Repeated main table header for each order */}
                      <tr >
                        <td colSpan="18">
                        <div className="nested-table-wrapper">
                            <table className="nested-table">
                              <thead>
                                <tr>
                                {/* <th>Item ID</th>
                                <th>Item ID</th>
                                <th>Item ID</th>
                                <th>Item ID</th> */}
                                  <th>Order ID</th>
                                  <th>User ID</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Mobile No</th>
                                  <th>Pincode</th>
                                  <th>Address</th>
                                  <th>Locality</th>
                                  <th>Landmark</th>
                                  <th>City</th>
                                  <th>State</th>
                                  <th>Alternate Mobile</th>
                                  <th>Total Amount</th>
                                  <th>Order Type</th>
                                  {/* <th>Status</th>
                                  <th>Action</th> */}
                                  <th>Order Date</th>
                                  <th>Erase</th>
                                </tr>
                                </thead>

                                <tbody>
                      <tr className="order-row">
                        <td>{order._id}</td>
                        <td>{order.userId}</td>
                        <td>{order.address.name}</td>
                        <td>{order.address.email}</td>
                        <td>{order.address.mobile}</td>
                        <td>{order.address.pincode}</td>
                        <td>{order.address.address}</td>
                        <td>{order.address.locality}</td>
                        <td>{order.address.landmark}</td>
                        <td>{order.address.city}</td>
                        <td>{order.address.state}</td>
                        <td>{order.address.alternateMobile}</td>
                        <td>{order.totalAmount}&nbsp;₹</td>
                        <td>{order.orderType}</td>
                       




                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            id="btndash"
                            onClick={() =>
                              handleDelete(API_ENDPOINTS.ADMIN_ORDERS, order._id, setOrders)
                            }
                          >
                            Delete
                          </button>
                        </td>





                      </tr>
                      </tbody>

                                </table>
                                </div>
                                </td>

                        {/* <th colSpan="18">New Order</th> */}
                      </tr>


                      <tr>
                        <td colSpan="18">
                          <div className="nested-table-wrapper">
                            <table className="nested-table">
                              <thead>
                                <tr>
                                  <th>Item ID</th>
                                  <th>Item Name</th>
                                  <th>Size</th>
                                  <th>Colour</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th>Sub-Total</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                  <th>Order Date</th>
                                 
                                  <th>Estimated Delivery Date</th>
                                  <th>Order Status</th>
                                  <th>Image</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                {order.cartItems.map((item) => (
                                  <tr key={item._id}>
                                    <td>{item.id}</td>
                                    {/* <td>{item.name}</td> */}
                                    <td>
                                      <strong>Item Name:</strong>{" "}
                                      <Link to={`/ProductPage${item.id}`}>{item.name}</Link>
                                    </td>
                                    <td>{item.size || 'N/A'}</td>
                                    <td>{item.color || 'N/A'}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}&nbsp;₹</td>
                                    <td>{item.subtotal}&nbsp;₹</td>



                                              
          <td
            className={
              item.status === 'Accepted'
                ? 'status-accepted'
                // : item.status.status === 'Rejected'
                // ? 'item.itemStatus-rejected'
                 : item.status === 'Rejected'
                ? 'status-rejected'
                : item.status === 'Pending'
                ? 'status-pending'
                : item.status === 'Processing'
                ? 'status-processing'
              

                  : item.status === 'Shipped'
                ? 'status-Shipped'

                : item.status === ' Transit'
                ? 'status-transit'
                : item.status === 'Out for Delivery'
                ? 'status-out-for-delivery'
                : item.status === 'Delivered'
                ? 'status-delivered'
                : item.status === 'Failed Delivery'
                ? 'status-failed'
                : item.status === 'Return Initiated'
                ? 'status-return-initiated'
                : item.status === 'Return Picked Up'
                ? 'status-return-picked-up'
                : ''
            }
          >
            {/* {order.status} */}
            {item.status}
          </td>




          <td>
  <select
    className="btndash"
    value={item.status}
    onChange={(e) => {
      const newStatus = e.target.value;

      // Update the status of only the selected cart item
      const updatedCartItems = order.cartItems.map(cartItem => {
        // Match by _id or id field
        const isMatch = cartItem._id?.toString() === item._id?.toString() || 
                       cartItem._id === item._id ||
                       cartItem.id === item.id ||
                       (cartItem._id && item._id && String(cartItem._id) === String(item._id));
        
        if (isMatch) {
          return { 
            ...cartItem, 
            status: newStatus,
            _id: cartItem._id || item._id, // Preserve _id
            id: cartItem.id || item.id // Preserve id
          };
        }
        return cartItem;
      });

      // Call updateStatus with updated cart items
      updateStatus(order._id, newStatus, 'orders', updatedCartItems);
    }}
  >
   <option value="Pending">Pending</option>
              <option value="Accepted">Accept</option>
              <option value="Rejected">Reject</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              {/* <option value="Out for Pickup">Out for Pickup</option> */}
              {/* <option value="Picked Up">Picked Up</option> */}
              <option value=" Transit"> Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed Delivery">Failed Delivery</option>
              <option value="Return Initiated">Return Initiated</option>
              <option value="Return Picked Up">Return Picked Up</option>
  </select>
</td>



                                  <td>{new Date(item.date).toLocaleDateString()}</td>
                                    {/* <td>{item.date}</td> */}
                                    <td>{new Date(item.estimatedDeliveryDate).toLocaleDateString()}</td>
                                    {/* <td>{item.estimatedDeliveryDate}</td> */}
                                    <td id='can'>{item.itemStatus}</td>
                                    <td>
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                        onClick={() => openModal(item.image)}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>

                      {/* Spacer row for visual separation */}
                      <tr className="spacer-row">
                        <td colSpan="18"></td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {selectedImage && (
                <div className="modal" onClick={closeModal}>
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}






      </div>
    </div>
  );
};

export default AdminDashboard;
