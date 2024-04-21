import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import './login.css'; // Import CSS file

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                navigate("/"); // Navigate after successful login
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                alert("Login failed: " + error.message); // Display alert for login failure
            });
    };

    return (
        <div className="form-container">
            <Stack spacing={2}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
