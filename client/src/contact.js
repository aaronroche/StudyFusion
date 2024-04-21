import React, { useState } from 'react';
import './contact.css';
import Popup from './contactPopup'; // Import the Popup component

const ContactUs = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { firstName, lastName, email, phoneNumber, message });
    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
    // Display the popup
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us!</h1>
      <p>We are here to help with any questions you may have about StudyFusion. Feel free to reach out at any time!</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Anything Else?</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" />
        </div>
        <button type="submit">Submit</button>
      </form>
      {showPopup && <Popup onClose={closePopup} />} {/* Render the popup if showPopup is true */}
    </div>
  );
};

export default ContactUs;
