import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthInfo = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

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
    navigate("/");
}

    return (
        (authUser ? <div>
            <button className="btn btn-link nav-link" onClick={signOutAction}>Sign Out</button>
        </div> : <><div className="mr-3 nav-item">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </div>
                            <div className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </div></>)
    )
}

export default AuthInfo;