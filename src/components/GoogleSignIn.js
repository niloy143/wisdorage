import axios from 'axios';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Loader from '../components/Loader';

const GoogleSignIn = ({ googleSignIn, googleSigning, setGoogleSigning }) => {

    const handleGoogleSignIn = () => {
        setGoogleSigning(true);
        googleSignIn()
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                axios.post('http://localhost:1234/user', {
                    uid, displayName, email, photoURL,
                    role: 'buyer'
                });
                axios.get(`http://localhost:1234/jwt?email=${email}`)
                    .then(({ data: { token } }) => localStorage.setItem('wisdorage-token', token))
                    .catch(err => console.error(err))
                    .finally(() => setGoogleSigning(false))
            })
            .catch(() => setGoogleSigning(false))
    }

    return (
        <button className={`flex justify-center items-center gap-2 border rounded-lg px-2 sm:px-5 py-3 w-full ${googleSigning ? 'cursor-not-allowed bg-gray-200' : 'active:scale-95 transition border-gray-300 cursor-pointer hover:bg-gray-200'} select-none`}
            disabled={googleSigning}
            onClick={handleGoogleSignIn}
        >
            {
                googleSigning ? <Loader /> : <>
                    <FcGoogle className='text-2xl' />
                    <span className='sm:text-xl font-semibold'>CONTINUE WITH GOOGLE</span>
                </>
            }
        </button>
    );
};

export default GoogleSignIn;