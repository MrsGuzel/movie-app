import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { createContext } from 'react'
import { auth } from '../auth/firebase'

export const AuthContext  = createContext()

const AuthContextProvider = ({children}) => {
    const createUser = async (email, password) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredential);
        } catch (error) {
            console.log(error);
        }
        
    }

    const values={createUser}

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider