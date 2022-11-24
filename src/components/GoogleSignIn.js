import axios from 'axios';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Loader from '../components/Loader';

const GoogleSignIn = ({ googleSignIn }) => {
    const [signing, setSigning] = useState(false);

    const handleGoogleSignIn = () => {
        setSigning(true);
        googleSignIn()
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                axios.post('http://localhost:1234/users', {
                    uid, displayName, email, photoURL,
                    role: 'buyer'
                })
            })
            .catch(err => console.error(err))
            .finally(() => setSigning(false))
    }

    return (
        <button className={`flex justify-center items-center gap-2 border rounded-lg px-5 py-3 w-full ${signing ? 'cursor-not-allowed bg-gray-200' : 'active:scale-95 transition border-gray-300 cursor-pointer hover:bg-gray-200'} select-none`}
            disabled={signing}
            onClick={handleGoogleSignIn}
        >
            {
                signing ? <Loader /> : <>
                    <FcGoogle className='text-2xl' />
                    <span className='text-xl font-semibold'>CONTINUE WITH GOOGLE</span>
                </>
            }
        </button>
    );
};

export default GoogleSignIn;