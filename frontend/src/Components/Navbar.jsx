
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('token'));
//   const [userId, setUserId] = useState('');
//   const [adminId, setAdminId] = useState('');

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 769);
//     };

//     const updateLoginState = () => {
//       const adminToken = localStorage.getItem('adminToken');
//       const userToken = localStorage.getItem('token');

//       if (adminToken && userToken) {
//         localStorage.removeItem('token');
//         setIsUserLoggedIn(false);
//       }

//       setIsAdminLoggedIn(!!adminToken);
//       setIsUserLoggedIn(!!userToken);

//       if (userToken) {
//         setUserId(localStorage.getItem('userId') || '');
//       }

//       if (adminToken) {
//         setAdminId(localStorage.getItem('adminId') || '');
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('storage', updateLoginState);

//     updateLoginState();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('storage', updateLoginState);
//     };
//   }, []);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   const isActive = (path) => (location.pathname === path ? 'active' : '');

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminId'); // Remove adminId
    
//     setIsAdminLoggedIn(false);
//     navigate('/');
//   };

//   const handleUserLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId'); // Remove userId
//     localStorage.removeItem('cartItems');
//     setIsUserLoggedIn(false);
//     navigate('/');
//   };

//   useEffect(() => {
//     const adminToken = localStorage.getItem('adminToken');
//     const userToken = localStorage.getItem('token');

//     if (adminToken && userToken) {
//       localStorage.removeItem('token');
//       setIsUserLoggedIn(false);
//     }

//     setIsAdminLoggedIn(!!adminToken);
//     setIsUserLoggedIn(!!userToken);

//     if (userToken) {
//       setUserId(localStorage.getItem('userId') || '');
//     }

//     if (adminToken) {
//       setAdminId(localStorage.getItem('adminId') || '');
//     }
//   }, [location]);

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">Pawsitive Care</div>
//       {isMobile && (
//         <div className="hamburger" onClick={toggleNavbar}>
//           ☰
//         </div>
//       )}
//       <ul className={`navbar-links ${isMobile ? (isOpen ? 'show' : '') : ''}`}>
//         <li><Link to="/" className={isActive('/')}>Home</Link></li>
//         <li
//           className={`dropdown ${isActive('/pet-care') || isActive('/street-animal') ? 'active' : ''}`}
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           <span className={isActive('/pet-care') || isActive('/street-animal') ? 'active' : ''}>Services</span>
//           {isDropdownOpen && (
//             <ul className="dropdown-menu">
//               <li><Link to="/pet-care" className={isActive('/pet-care')}>Pet Care</Link></li>
//               <li><Link to="/street-animal" className={isActive('/street-animal')}>Street Animal</Link></li>
//             </ul>
//           )}
//         </li>
//         <li><Link to="/appointment" className={isActive('/appointment')}>Appointment</Link></li>
//         <li><Link to="/adopt" className={isActive('/adopt')}>Adopt</Link></li>
//         <li><Link to="/donation" className={isActive('/donation')}>Donation</Link></li>
//         <li><Link to="/shop" className={isActive('/shop')}>ShopNow</Link></li>
//         <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
//         <li><Link to="/aboutus" className={isActive('/aboutus')}>About</Link></li>

//         {isAdminLoggedIn && (
//           <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard ({adminId})</Link></li>
//         )}

//         {isUserLoggedIn && (
//           <li><Link to="/userdashboard" className={isActive('/userdashboard')}>Dashboard ({userId})</Link></li>
//         )}
//       </ul>
//       <div className="navbar-icons" onMouseEnter={() => setIsUserDropdownOpen(true)} onMouseLeave={() => setIsUserDropdownOpen(false)}>
//         <span className="user-icon">
//           👤
//           {isUserDropdownOpen && (
//             <ul className="user-dropdown-menu">
//               {!isUserLoggedIn && !isAdminLoggedIn && <li><Link to="/userlogin" className={isActive('/userlogin')}>User Login</Link></li>}
//               {!isAdminLoggedIn && !isUserLoggedIn && <li><Link to="/adminlogin" className={isActive('/adminlogin')}>Admin Login</Link></li>}
//               {isUserLoggedIn && <li id='userlog' onClick={handleUserLogout}>Logout</li>}
//               {isAdminLoggedIn && <li id='userlog' onClick={handleLogout}>Logout</li>}
//             </ul>
//           )}
//         </span>
//         <Link to="/CartPage">
//           <span className="cart-icon">🛒</span>
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;







import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [adminId, setAdminId] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    const updateLoginState = () => {
      const adminToken = localStorage.getItem('adminToken');
      const userToken = localStorage.getItem('token');

      if (adminToken && userToken) {
        localStorage.removeItem('token');
        setIsUserLoggedIn(false);
      }

      setIsAdminLoggedIn(!!adminToken);
      setIsUserLoggedIn(!!userToken);

      if (userToken) {
        setUserId(localStorage.getItem('userId') || '');
      }

      if (adminToken) {
        setAdminId(localStorage.getItem('adminId') || '');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', updateLoginState);

    updateLoginState();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', updateLoginState);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId'); // Remove adminId
    localStorage.removeItem('email');

    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const handleUserLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove userId
    localStorage.removeItem('cartItems');
    localStorage.removeItem('email');
    setIsUserLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('token');

    if (adminToken && userToken) {
      localStorage.removeItem('token');
      setIsUserLoggedIn(false);
    }

    setIsAdminLoggedIn(!!adminToken);
    setIsUserLoggedIn(!!userToken);

    if (userToken) {
      setUserId(localStorage.getItem('userId') || '');
    }

    if (adminToken) {
      setAdminId(localStorage.getItem('adminId') || '');
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Pawsitive Care</div>
      {isMobile && (
        <div className="hamburger" onClick={toggleNavbar}>
          ☰
        </div>
      )}
      <ul className={`navbar-links ${isMobile ? (isOpen ? 'show' : '') : ''}`}>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li
          className={`dropdown ${isActive('/pet-care') || isActive('/street-animal') ? 'active' : ''}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className={isActive('/pet-care') || isActive('/street-animal') ? 'active' : ''}>Services</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/pet-care" className={isActive('/pet-care')}>Pet Care</Link></li>
              <li><Link to="/street-animal" className={isActive('/street-animal')}>Street Animal</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/appointment" className={isActive('/appointment')}>Appointment</Link></li>
        <li><Link to="/adopt" className={isActive('/adopt')}>Adopt</Link></li>
        <li><Link to="/donation" className={isActive('/donation')}>Donation</Link></li>
        <li><Link to="/shop" className={isActive('/shop')}>ShopNow</Link></li>
        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
        <li><Link to="/aboutus" className={isActive('/aboutus')}>About</Link></li>

        {isAdminLoggedIn && (
          <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard ({adminId})</Link></li>
          // <li><Link to="/dashboard" className={isActive('/dashboard')}>🙎🏻‍♂ {adminId}</Link></li>
        )}

        {isUserLoggedIn && (
          <li><Link to="/userdashboard" className={isActive('/userdashboard')}>Dashboard ({userId})</Link></li>
          // <li><Link to="/userdashboard" className={isActive('/userdashboard')}>🙎🏻‍♂{userId}</Link></li>
        )}
      </ul>
      <div className="navbar-icons" onMouseEnter={() => setIsUserDropdownOpen(true)} onMouseLeave={() => setIsUserDropdownOpen(false)}>
        <span className="user-icon">
          👤
          {isUserDropdownOpen && (
            <ul className="user-dropdown-menu">
              {!isUserLoggedIn && !isAdminLoggedIn && <li><Link to="/userlogin" className={isActive('/userlogin')}>User Login</Link></li>}
              {!isAdminLoggedIn && !isUserLoggedIn && <li><Link to="/adminlogin" className={isActive('/adminlogin')}>Admin Login</Link></li>}
              {isUserLoggedIn && <li id='userlog' onClick={handleUserLogout}>Logout</li>}
              {isAdminLoggedIn && <li id='userlog' onClick={handleLogout}>Logout</li>}
            </ul>
          )}
        </span>
        {/* Conditionally render cart icon based on admin login state */}
        {!isAdminLoggedIn && (
          <Link to="/CartPage">
            <span className="cart-icon">🛒</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
