import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase-init';

export const WisdorageContext = createContext({});
const auth = getAuth(app);

const ContextProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [updatingUser, setUpdatingUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                fetch(`https://wisdorage-server.vercel.app/is-deleted/${user?.email}`)
                    .then(res => res.json())
                    .then(({ isDeleted }) => {
                        if (isDeleted) {
                            signOut(auth).then(() => localStorage.removeItem('wisdorage-token'));
                        }
                        else {
                            setUser(user);
                        }
                    })
                    .catch(err => console.error(err))
                    .finally(() => setUserLoading(false))
            }
        })

        return () => unsubscribe();
    }, [userLoading])

    const googleProvider = new GoogleAuthProvider();

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const updateUser = (name, photo) => updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    const logOut = () => signOut(auth).then(() => localStorage.removeItem('wisdorage-token'));

    const contexts = {
        user,
        userLoading,
        updatingUser,
        login,
        googleSignIn,
        createUser,
        updateUser,
        setUpdatingUser,
        logOut
    }

    return (
        <WisdorageContext.Provider value={contexts}>
            {children}
        </WisdorageContext.Provider>
    );
};

export default ContextProvider;