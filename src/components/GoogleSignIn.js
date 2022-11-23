import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Loader from '../components/Loader';

const GoogleSignIn = () => {
    const [signing, setSigning] = useState(false);
    return (
        <button className={`flex justify-center items-center gap-2 border rounded-lg px-5 py-3 w-full ${signing ? 'cursor-not-allowed bg-gray-200' : 'active:scale-95 transition border-gray-300 cursor-pointer hover:bg-gray-200'} select-none`}
            disabled={signing}
            onClick={() => setSigning(true)}
        >
            {
                signing ? <Loader /> : <>
                    <FcGoogle className='text-2xl' />
                    <span className='text-xl font-semibold'>SIGN IN WITH GOOGLE</span>
                </>
            }
        </button>
    );
};

export default GoogleSignIn;