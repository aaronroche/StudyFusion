import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from "./Firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import './signup.css'; // Import CSS file

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isProfessor, setIsProfessor] = useState(false); // State for checkbox
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State for password match
    const navigate = useNavigate();

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "users"));

    const signUp = (e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        } else {
            setPasswordsMatch(true);
        }
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userInfo) => { // first is onfulfilled, second is onrejected
                console.log(userInfo);
                set(newDocRef, {
                    email: email,
                    username: username,
                    isProfessor: isProfessor,
                    groups: {}, // this doesn't actually add anything to the database, no groups key shows up
                    profileImage: "https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
                }).then(() => {
                    console.log("data saved successfully");
                    navigate("/"); // Navigate after successful signup
                }).catch((error) => {
                    console.log("error: " + error.message);
                    alert("Signup failed: " + error.message); // Display alert for signup failure
                });
            })
            .catch((error) => {
                console.error("Error signing up:", error);
                alert("Signup failed: " + error.message); // Display alert for signup failure
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
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                    <label>
                        <input type="checkbox" checked={isProfessor} onChange={(e) => setIsProfessor(e.target.checked)} />
                        Are you a professor?
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/login">Already have an account? Login here.</Link>
            </Stack>
        </div>
    );
};

export default Signup;
