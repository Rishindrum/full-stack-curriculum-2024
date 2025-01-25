// Importing necessary hooks and functionalities
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';


//env variable not working for some reason
const firebaseConfig = {
    apiKey: "AIzaSyDGmx8zmEig_WZzZ-UvYRozZalr_BbrNy0",
    authDomain: "todoapp-a6fa8.firebaseapp.com",
    projectId: "todoapp-a6fa8",
    storageBucket: "todoapp-a6fa8.firebasestorage.app",
    messagingSenderId: "914976888545",
    appId: "1:914976888545:web:6606dbd2cc94999d3a49a0",
    measurementId: "G-Y607PS12C5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Creating a context for authentication. Contexts provide a way to pass data through 
// the component tree without having to pass props down manually at every level.
const AuthContext = createContext();

// This is a custom hook that we'll use to easily access our authentication context from other components.
export const useAuth = () => {
    return useContext(AuthContext);
};

// This is our authentication provider component.
// It uses the context to provide authentication-related data and functions to its children components.
export function AuthProvider({ children }) {
    const navigate = useNavigate();
    
    const [user, setCurrentUser] = useState(null);
    const [error, setLoginError] = useState(null);

    // const VALID_USERNAME = 'rishindra';
    // const VALID_PASSWORD = 'password';
    

    // Sign up new users
    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setCurrentUser(userCredential.user);
            // correct and formal way of getting access token
            // userCredential.user.getIdToken().then((accessToken) => {
            //     console.log(accessToken)
            // })
            navigate("/");
        })
        .catch((error) => {
            setLoginError(error.message);
        });
    };

    // Sign in existing users
    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setCurrentUser(userCredential.user);
            // this method of retrieving access token also works
            // console.log(userCredential.user.accessToken)
            navigate("/");
        })
        .catch((error) => {
            setLoginError(error.message);
        });
    };

    // Sign out users
    const logout = () => {
        auth.signOut().then(() => {
        setCurrentUser(null);
        navigate("/login");
        });
    };

    // An object containing our state and functions related to authentication.
    // By using this context, child components can easily access and use these without prop drilling.
    const contextValue = {
        user,
        login,
        logout,
        error,
        register
    };

    // The AuthProvider component uses the AuthContext.Provider to wrap its children.
    // This makes the contextValue available to all children and grandchildren.
    // Instead of manually passing down data and functions, components inside this provider can
    // simply use the useAuth() hook to access anything they need.
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}