import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuthInfo = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }
        })
    }, [])

const signOutAction = () => {
    signOut(getAuth()).then(() => {
        console.log("Signed out")
    }).catch(error =>
    console.log(error))
}

    return (
        (authUser ? <li className="navbar-item"><Link class="nav-link" to="/signup" onClick={signOutAction}>Sign Out</Link></li> : <><li className="navbar-item"><Link class="nav-link" to="/signup">Sign Up</Link></li><li className="navbar-item"><Link class="nav-link" to="/login">Log In</Link></li></>)
    )
}

export default AuthInfo;