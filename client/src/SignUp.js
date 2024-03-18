import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userInfo) => {
      console.log(userInfo);
    });
  };

  return (
    <div id="signup">
      <h1>Sign Up</h1>
      <form onSubmit={signUp}>
        <input type='username'
        placeholder='Username'
        value = {username}
        onChange={(e) => setUsername(e.target.value)}>
        </input>
        <input type='email'
        placeholder='Email'
        value = {email}
        onChange={(e) => setEmail(e.target.value)}>
        </input>
        <input type='password'
        placeholder='Password'
        value = {password}
        onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
      
    );
}

export default SignUp;
