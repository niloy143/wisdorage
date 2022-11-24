import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
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
    }, [userLoading])

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const updateUser = (name, photo) => updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    const logOut = () => signOut(auth);

    const contexts = {
        user,
        userLoading,
        googleSignIn,
        createUser,
        updateUser,
        logOut
    }

    return (
        <WisdorageContext.Provider value={contexts}>
            {children}
        </WisdorageContext.Provider>
    );
};

export default ContextProvider;