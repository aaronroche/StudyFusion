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
    const [isProfessor, setIsProfessor] = useState(false); // State for checkbox
    const navigate = useNavigate();

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "users"));

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then(((userInfo) => { // first is onfulfilled, second is onrejected
            console.log(userInfo);
            set(newDocRef, {
                email: email,
                username: username,
                isProfessor: isProfessor,
                groups: {}, // this doesn't actually add anything to the database, no groups key shows up
                profileImage: "https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
        
            }).then( () => {
                console.log("data saved successfully");
            }).catch((error) => {
                console.log("error: " + error.message);
            })
        }), (((userInfo) => {

        })));

        navigate("/");
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
                        <button type="submit">Sign Up</button>
                </form>
                <Link to="/login">Already have an account? Login here.</Link>
            </Stack>
        </div>
    );
};

export default Signup;
