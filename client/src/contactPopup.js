import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './contactPopup.css';

const Popup = ({ onClose }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleClose = () => {
    onClose();
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Thank you for your submission!</h2>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default Popup;
