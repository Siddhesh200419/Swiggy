import { signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import { provider, auth } from "../config/fireBaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";

function SigninPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector ((state) => state.authSlice.userData)


    async function handleAuth() {
        try {
            let data = await signInWithPopup(auth, provider);
            const userData = {
                name: data.user.displayName,
                photo: data.user.photoURL
            };
            dispatch(addUserData(userData));
            navigate("/")
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }

    async function handleLogout(userData) {
        await signOut(auth)
        dispatch(removeUserData())
    }

    return (
        <>
        {
            !userData && 
            <button 
                onClick={handleAuth}  // Add this onClick handler
                className="w-full bg-orange-500 text-white py-4 rounded font-medium hover:bg-orange-600 transition-colors"
            >
                Google Login
            </button>
        }
        
        {
            userData &&
            <button onClick={handleLogout}  className="w-full bg-orange-500 text-white py-4 rounded font-medium hover:bg-orange-600 transition-colors">
                Logout
            </button>
        }
    </>
    );
}

export default SigninPage;
