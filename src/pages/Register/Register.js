import React, { useContext, useState } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn';
import { Navigate, useLocation } from 'react-router-dom';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import useImage from '../../hooks/useImage';

const Register = () => {
    const { user, userLoading, googleSignIn } = useContext(WisdorageContext);
    const { state } = useLocation();
    const [imgFile, setImgFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [role, setRole] = useState('buyer');
    useImage(imgFile, setPhotoURL);

    return (
        userLoading ? <Loader body /> : user ? <Navigate to={state || '/'} /> :
            <div className='px-3 py-24'>
                <div className='max-w-xl px-5 py-12 mx-auto border rounded-xl shadow-xl'>
                    <div className="avatar flex justify-center">
                        <div className="w-40 rounded-full">
                            <img src={photoURL || 'https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg'} alt="" />
                        </div>
                    </div>
                    <h2 className='text-2xl font-semibold text-center mb-5 mt-2'>REGISTER AS A {role.toUpperCase()}</h2>
                    <form>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Your Name </label>
                            <input type="text" placeholder="Enter your full name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Email Address </label>
                            <input type="email" placeholder="Enter your email address" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Password </label>
                            <input type="password" placeholder="Choose password" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Confirm Password </label>
                            <input type="password" placeholder="Confirm password" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control my-2">
                            <label className="font-semibold label"> Your Photo (optional) </label>
                            <input type="file" className="file-input file-input-bordered w-full" onChange={e => {
                                const file = e.target.files[0];
                                file ? setImgFile(file) : setPhotoURL(null)
                            }} />
                        </div>
                        <div className='font-semibold flex items-center gap-2'>
                            <label className='label text-lg'>Account Type: </label>
                            <span>Buyer</span>
                            <input type="checkbox" className="toggle" onChange={() => setRole(role === 'seller' ? 'buyer' : 'seller')} />
                            <span>Seller</span>
                        </div>
                        <button className='btn btn-primary mt-5 btn-block'>register as a {role.toUpperCase()}</button>
                    </form>
                    <div className="divider my-7 text-xl font-semibold">OR</div>
                    <GoogleSignIn googleSignIn={googleSignIn} />
                </div>
            </div>
    );
};

export default Register;