import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const EditProfileModal = ({ onClose, onSave }) => {
  const [editedData, setEditedData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    major: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Modal
      open={true} // Set to true to display the modal
      onClose={onClose}
      aria-labelledby="edit-profile-modal"
      aria-describedby="edit-profile-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Display input fields for editing user information */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={editedData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editedData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={editedData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={editedData.major}
          onChange={handleChange}
        />
        {/* Add more input fields for other user information */}

        {/* Save and Cancel buttons */}
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
