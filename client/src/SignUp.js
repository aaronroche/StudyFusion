import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; // Import CSS file

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessor, setIsProfessor] = useState(false); // State for checkbox

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use Axios to send signup request
            const response = await axios.post('your-signup-endpoint', { username, email, password, isProfessor });
            // Handle successful signup
            console.log(response.data);
        } catch (error) {
            // Handle signup error
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>
                    <input type="checkbox" checked={isProfessor} onChange={(e) => setIsProfessor(e.target.checked)} />
                    Are you a professor?
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <Link to="/">Already have an account? Login here.</Link>
        </div>
    );
};

export default Signup;
