import React, { useState } from 'react';
import './DropdownMenu.css'; // Make sure the CSS file is in the same directory

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Our Services
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item">Training</li>
          <li className="dropdown-item">Pet Grooming</li>
          <li className="dropdown-item">Pet Boarding</li>
          <li className="dropdown-item">Dog Walking</li>
          <li className="dropdown-item">Quality Food</li>
          <li className="dropdown-item">Other Services</li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
