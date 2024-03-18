import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = (l) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (s) => {
    s.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((userInfo) => {
      console.log(userInfo);
    });
  };

  return (
    <div id="login">
      <h1>Log In</h1>
      <form onSubmit={logIn}>
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
        <button type='submit'>Log In</button>
      </form>
    </div>
    
  );
}

export default LoginPage;
