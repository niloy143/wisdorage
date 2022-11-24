import React, { createContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase-init';

export const WisdorageContext = createContext({});
const auth = getAuth(app);

const ContextProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setUserLoading(false);
        })

        return () => unsubscribe();
    }, [])

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const logOut = () => signOut(auth);

    const contexts = {
        user,
        userLoading,
        googleSignIn,
        logOut
    }

    return (
        <WisdorageContext.Provider value={contexts}>
            {children}
        </WisdorageContext.Provider>
    );
};

export default ContextProvider;