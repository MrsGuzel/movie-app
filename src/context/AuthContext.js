import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { createContext } from 'react'
import { auth } from '../auth/firebase'
import { useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';


export const AuthContext  = createContext();

const AuthContextProvider = ({children}) => {
let navigate = useNavigate();

    const createUser = async (email, password) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
            toastSuccessNotify("Registered successfully!")
            // console.log(userCredential);

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
    }

    const values={createUser, signIn}

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;