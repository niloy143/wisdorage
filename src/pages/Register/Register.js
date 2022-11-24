import React, { useContext, useState } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import useImage from '../../hooks/useImage';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
    const { user, userLoading, googleSignIn, createUser, updateUser } = useContext(WisdorageContext);
    const { state } = useLocation();
    const [imgFile, setImgFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [role, setRole] = useState('buyer');
    useImage(imgFile, setPhotoURL);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [submitting, setSubmitting] = useState(false);

    const submissionHandler = ({ name, email, password, photo }) => {

        const formData = new FormData();
        formData.append('image', photo[0]);

        setSubmitting(true);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbApiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(({ data: { url: imgURL } }) => {
                createUser(email, password)
                    .then(({ user }) => {
                        updateUser(name, imgURL)
                            .then(() => { })
                            .catch(err => console.error(err.code))
                            .finally(() => {
                                const { uid, displayName, email, photoURL } = user;
                                axios.post('http://localhost:1234/users', { uid, displayName, email, photoURL, role });
                                setSubmitting(false);
                            })
                    })
                    .catch(err => {
                        console.error(err.code);
                        setSubmitting(false);
                    })
            })
            .catch(err => {
                console.error(err.code);
                setSubmitting(false);
            })
    }

    return (
        userLoading ? <Loader body /> : user && !submitting ? <Navigate to={state || '/'} /> :
            <div className='px-3 py-24'>
                <div className='max-w-xl px-5 py-12 mx-auto border rounded-xl shadow-xl'>
                    <div className="avatar flex justify-center">
                        <div className="w-40 rounded-full">
                            <img src={photoURL || 'https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg'} alt="" />
                        </div>
                    </div>
                    <h2 className='text-2xl font-semibold text-center mb-5 mt-2'>REGISTER AS A {role.toUpperCase()}</h2>
                    <form onSubmit={handleSubmit(submissionHandler)}>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Your Name </label>
                            <input type="text" placeholder="Enter your full name" className={`input input-bordered ${errors.name && 'input-error'}`} {
                                ...register('name', {
                                    required: 'Please enter your name.'
                                })
                            } />
                            {
                                errors.name && <label className='label label-text-alt text-red-600'>{errors.name?.message}</label>
                            }
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Email Address </label>
                            <input type="email" placeholder="Enter your email address" className={`input input-bordered ${errors.email && 'input-error'}`} {
                                ...register('email', {
                                    required: 'Please enter your email address.',
                                    pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/g, message: 'Please enter a valid email address.' }
                                })
                            } />
                            {
                                errors.email && <label className='label label-text-alt text-red-600'>{errors.email?.message}</label>
                            }
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Password </label>
                            <input type="password" placeholder="Choose password" className={`input input-bordered ${errors.password && 'input-error'}`} {
                                ...register('password', {
                                    required: 'Please choose a password.',
                                    minLength: { value: 6, message: 'Password is too short!' },
                                    maxLength: { value: 20, message: 'Password is too long!' },
                                    pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/g, message: 'Password should contain at least a capital letter, a small letter and a number' }
                                })
                            } />
                            {
                                errors.password && <label className='label label-text-alt text-red-600'>{errors.password?.message}</label>
                            }
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Confirm Password </label>
                            <input type="password" placeholder="Confirm password" className={`input input-bordered ${errors.confirmPass && 'input-error'}`} {
                                ...register('confirmPass', {
                                    required: 'Please confirm your password.',
                                    validate: v => v === watch().password || "Confirm password should be same as password"
                                })
                            } />
                            {
                                errors.confirmPass && <label className='label label-text-alt text-red-600'>{errors.confirmPass?.message}</label>
                            }
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Your Photo </label>
                            <input type="file" className={`file-input file-input-bordered w-full ${errors.photo && 'file-input-error'}`} {
                                ...register('photo', {
                                    required: 'Please insert your photo',
                                    onChange: e => {
                                        const file = e.target.files[0];
                                        file ? setImgFile(file) : setPhotoURL(null)
                                    }
                                })
                            } />
                            {
                                errors.photo && <label className='label label-text-alt text-red-600'>{errors.photo?.message}</label>
                            }
                        </div>
                        <div className='font-semibold flex items-center gap-2'>
                            <label className='label text-lg'>Account Type: </label>
                            <span>Buyer</span>
                            <input type="checkbox" className="toggle" onChange={() => setRole(role === 'seller' ? 'buyer' : 'seller')} />
                            <span>Seller</span>
                        </div>
                        <button className='btn btn-primary mt-5 btn-block' disabled={submitting}>{!submitting ? `register as a ${role.toUpperCase()}` : <Loader />}</button>
                        <p className='text-center my-2'>Already have an account? <NavLink className='text-blue-600 hover:text-black' to="/login" state={state}>Log In</NavLink>.</p>
                    </form>
                    <div className="divider my-7 text-xl font-semibold">OR</div>
                    <GoogleSignIn googleSignIn={googleSignIn} />
                </div>
            </div>
    );
};

export default Register;