import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import './signup.css'; // Import CSS file

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessor, setIsProfessor] = useState(false); // State for checkbox

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userInfo) => {
          console.log(userInfo);
        });
      };

    return (
        <div className="form-container">
            <Stack spacing={2}>
                <h2>Sign Up</h2>
                <form onSubmit={signUp}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>
                        <input type="checkbox" checked={isProfessor} onChange={(e) => setIsProfessor(e.target.checked)} />
                        Are you a professor?
                    </label>
                    <Link to="StudyFusion/">
                        <button type="submit">Sign Up</button>
                    </Link>
                </form>
                <Link to="StudyFusion/login">Already have an account? Login here.</Link>
            </Stack>
        </div>
    );
};

export default Signup;
