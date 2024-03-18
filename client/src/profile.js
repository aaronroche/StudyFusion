import React, { useState } from 'react';
import './profile.css';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [major, setMajor] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    // Handle image upload logic here
    setProfilePicture(imageFile);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="major">Major:</label>
        <input
          type="text"
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {profilePicture && (
          <img
            src={URL.createObjectURL(profilePicture)}
            alt="Profile"
            className="profile-picture"
          />
        )}
        <button type="submit">Save</button>
      </div>
    </div>
  );
};

export default ProfilePage;
