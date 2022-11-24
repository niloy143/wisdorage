import React, { useContext } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn';
import { Navigate, useLocation } from 'react-router-dom';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';

const Login = () => {
    const { user, userLoading, googleSignIn } = useContext(WisdorageContext);
    const { state } = useLocation();

    return (
        userLoading ? <Loader body /> : user ? <Navigate to={state || '/'} /> :
            <div className='px-3 py-24'>
                <div className='max-w-xl px-5 py-12 mx-auto border rounded-xl shadow-xl'>
                    <h2 className='text-2xl font-semibold text-center mb-5'>Log In</h2>
                    <form>
                        <div className="form-control my-1">
                            <label className="text-lg font-semibold label"> Email Address </label>
                            <input type="email" placeholder="Enter your email address" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control my-1">
                            <label className="text-lg font-semibold label"> Password </label>
                            <input type="password" placeholder="Enter password" className="input input-bordered w-full" />
                        </div>
                        <button className='btn btn-primary mt-5 btn-block'>Log In</button>
                    </form>
                    <div className="divider my-7 text-xl font-semibold">OR</div>
                    <GoogleSignIn googleSignIn={googleSignIn} />
                </div>
            </div>
    );
};

export default Login;