import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { async } from "@firebase/util";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
        console.log(auth);
    };
    // console.log(auth)
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <Link to="/createpost">Create Post</Link>
                )}
            </div>

            <div className="account-detail" style={{ marginLeft: "auto" }}>
                {user && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <img src={auth.currentUser?.photoURL} width="50" height="50" /> */}
                        <p className="username">{user?.displayName} </p>
                        <button onClick={signUserOut}>Log out</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
