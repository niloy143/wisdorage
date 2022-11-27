import React, { useContext, useState } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
    const { user, userLoading, googleSignIn, login } = useContext(WisdorageContext);
    const { state } = useLocation();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [logging, setLogging] = useState(false);
    const [googleSigning, setGoogleSigning] = useState(false);

    const loginHandler = ({ email, password }) => {
        setLogging(true);

        fetch(`https://wisdorage-server.vercel.app/is-deleted/${email}`)
            .then(res => res.json())
            .then(({ isDeleted }) => {
                if (isDeleted) {
                    setError('email', {
                        type: 'allowance',
                        message: 'Blocked user!'
                    })
                    setLogging(false);
                }
                else {
                    login(email, password)
                        .then(({ user: { email } }) => {
                            axios.get(`https://wisdorage-server.vercel.app/jwt?email=${email}`)
                                .then(({ data: { token } }) => localStorage.setItem('wisdorage-token', token))
                                .catch(err => console.error(err))
                                .finally(() => setLogging(false))
                        })
                        .catch(err => {
                            switch (err.code) {
                                case 'auth/user-not-found':
                                    setError('email', {
                                        type: 'authentication',
                                        message: 'No user found with this email address.'
                                    }); break;
                                case 'auth/wrong-password':
                                    setError('password', {
                                        type: 'authentication',
                                        message: 'Wrong Password!'
                                    }); break;
                                case 'auth/too-many-requests':
                                    setError('password', {
                                        type: 'authentication',
                                        message: 'You entered wrong password several times. Try later.'
                                    }); break;
                                default:
                            }
                            setLogging(false);
                        })
                }
            })
            .catch(err => console.error(err))
    }

    return (
        userLoading ? <Loader body /> : user && !logging && !googleSigning ? <Navigate to={state || '/'} /> :
            <div className='px-3 py-24'>
                <div className='max-w-xl px-5 py-12 mx-auto border rounded-xl shadow-xl'>
                    <h2 className='text-2xl font-semibold text-center mb-5'>Log In</h2>
                    <form onSubmit={handleSubmit(loginHandler)}>
                        <div className="form-control my-1">
                            <label className="text-lg font-semibold label"> Email Address </label>
                            <input type="email" placeholder="Enter your email address" className={`input input-bordered ${errors.email && 'input-error'}`} {
                                ...register('email', {
                                    required: 'Please enter your email.',
                                    pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/g, message: 'Please enter a valid email address.' }
                                })
                            } />
                            {
                                errors.email && <label className='label label-text-alt text-red-600'>{errors.email?.message}</label>
                            }
                        </div>
                        <div className="form-control my-1">
                            <label className="text-lg font-semibold label"> Password </label>
                            <input type="password" placeholder="Enter password" className={`input input-bordered ${errors.password && 'input-error'}`} {
                                ...register('password', {
                                    required: 'Please enter your password'
                                })
                            } />
                            {
                                errors.password && <label className='label label-text-alt text-red-600'>{errors.password?.message}</label>
                            }
                        </div>
                        <button className='btn btn-primary mt-5 btn-block' disabled={logging}>{logging ? <Loader /> : 'Log In'}</button>
                        <p className='text-center my-2'>Don't have any account? <NavLink className='text-blue-600 hover:text-black' to="/register" state={state}>Register</NavLink>.</p>
                    </form>
                    <div className="divider my-7 text-xl font-semibold">OR</div>
                    <GoogleSignIn googleSignIn={googleSignIn} googleSigning={googleSigning} setGoogleSigning={setGoogleSigning} />
                </div>
            </div>
    );
};

export default Login;