// utils/Modal.jsx

import React from 'react';
import './Modal.css'; // Include CSS styling for your modal

const Modal = ({ message, onConfirm, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p id='message'>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Log In</button>
          <br/><br/>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
