import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../auth/firebase'
import { useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';


export const AuthContext  = createContext();

const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);
let navigate = useNavigate();

useEffect(() => {
  userObserver();

}, []);


    const createUser = async (email, password, displayName) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName,
            });
                
            // console.log(userCredential);
            navigate("/");
            toastSuccessNotify("Registered successfully!")
        } catch (error) {
            toastErrorNotify(error.message);
        }
        
    };

    const signIn = async (email, password) => {
        try {
           let userCredential = await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
           toastSuccessNotify("Logged in successfully!")
           console.log(userCredential);         
        } catch (error) {
            toastErrorNotify(error.message);
        }
    };

    const logOut = () => {
        signOut(auth)
        toastSuccessNotify("Logged out successfully!");
    };

    const userObserver = () =>{
        onAuthStateChanged(auth, (user) => {
            if (user){
               const {email, displayName, photoURL} = user;
               setCurrentUser({email, displayName, photoURL} );
                console.log(user);
            }else{
                setCurrentUser(false);
                console.log("logged out");
            }
        });
    };

    const values={createUser, signIn, logOut, currentUser}

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;