import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import './login.css'; // Import CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Firebase to sign in user
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
        });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="form-container">
            <Stack spacing={2}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                </form>
                <Link to="/signup">Don't have an account? Sign up here.</Link>
            </Stack>
        </div>
  );
};

export default LoginPage;
