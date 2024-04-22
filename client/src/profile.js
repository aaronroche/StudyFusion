import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, onValue, off, set } from 'firebase/database'; 
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import app from './Firebase.js'; 
import './profile.css';
import Modal from './editprofile.js'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserKey(user.uid);
      } else {
        setUserKey(null);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const db = getDatabase(app);
    const userRef = ref(db, 'users/' + userKey);
  
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log('User Data:', data); // Log user data to console
      setUserData(data);
    });
  
    return () => {
      off(userRef, 'value', unsubscribe);
    };
  }, [userKey]);

  const handleProfilePictureChange = (e) => {
    const imageFile = e.target.files[0];
    setNewProfilePicture(imageFile);
  };

  const uploadProfilePicture = async () => {
    if (newProfilePicture && newProfilePicture.name) {
      const storage = getStorage(app); 
      const storageRef = ref(storage, `profileImage/${newProfilePicture.name}`); 
      await uploadBytes(storageRef, newProfilePicture);
      
      const downloadURL = await getDownloadURL(storageRef);
  
      const db = getDatabase(app);
      const userImageRef = child(ref(db, `users/${userKey}`), 'profileImage'); // Navigate to the profileImage node under the user's data
      set(userImageRef, downloadURL); // Update profile picture URL in the database
  
      // Update profile picture URL in the userData state
      setUserData(prevUserData => ({
        ...prevUserData,
        profileImage: downloadURL
      }));
    }
  };
  
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = (editedData) => {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userKey), editedData); 
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture-container">
    {userData?.profileImage && (
      <img
        src={userData.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
    )}
  </div>
      <div className="profile-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userData?.username || ''}
          disabled 
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={userData?.email || ''}
          disabled
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={userData?.phoneNumber || ''}
          disabled
        />
        <label htmlFor="major">Major:</label>
        <input
          type="text"
          id="major"
          value={userData?.major || ''}
          disabled
        />
        <label htmlFor="profilePicture">Profile Picture:</label>
        {userData?.profileImage && (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="profile-picture"
          />
        )}
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        <button onClick={uploadProfilePicture}>Upload Profile Picture</button>
        <button onClick={handleEdit}>Edit Profile</button>
      </div>

      {isEditing && (
        <Modal onClose={handleClose} onSave={handleSaveChanges} userData={userData}>
          <h2>Edit Profile</h2>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
