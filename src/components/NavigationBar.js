import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WisdorageContext } from '../ContextProvider/ContextProvider';
import useValidImg from '../hooks/useValidImg';
import Loader from './Loader';

const NavigationBar = () => {
    const { user, userLoading, logOut, updatingUser } = useContext(WisdorageContext);
    const [userPhoto, setUserPhoto] = useState(null);
    useValidImg(user?.photoURL, setUserPhoto);

    const navItems = <>
        <li><NavLink to="/home" className={`rounded-md`}>Home</NavLink></li>
        <li><NavLink to="/blog" className={`rounded-md`}>Blog</NavLink></li>
        <li><NavLink to="/about" className={`rounded-md`}>About</NavLink></li>
        <li><NavLink to="/contact" className={`rounded-md`}>Contact</NavLink></li>
        {
            user && <>
                <li><NavLink to="/dashboard" className={`rounded-md`}>Dashboard</NavLink></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-primary mr-1 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow gap-1 bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <NavLink to="/" className="normal-case text-xl sm:text-2xl font-bold text-primary">Wisdorage</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 p-0">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    userLoading ? <Loader /> : user && !updatingUser ? <div className="dropdown dropdown-end">
                        <label tabIndex={0}>
                            <div className="avatar transition active:scale-95 cursor-pointer">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={userPhoto || "https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg"} alt="" />
                                </div>
                            </div>
                        </label>
                        <div tabIndex={0} className="dropdown-content bg-base-100 p-5 shadow rounded-box">
                            <div className='flex flex-col items-center mb-5'>
                                <img className='w-24 h-24 rounded-full' src={userPhoto || "https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg"} alt="" />
                                <h3 className='text-xl font-semibold mt-2'>{user?.displayName}</h3>
                                <h4 className='text-sm'>{user?.email}</h4>
                            </div>
                            <div className='divider'></div>
                            <ul className='menu gap-1 whitespace-nowrap'>
                                <li><button className='btn btn-ghost btn-block rounded-md'>Update Profile</button></li>
                                <li><button className='btn btn-primary rounded-md text-white' onClick={() => {
                                    logOut().then(() => setUserPhoto(null)).catch(err => console.error(err.code))
                                }}>Log Out</button></li>
                            </ul>
                        </div>
                    </div> : <NavLink to="/login" className='btn btn-primary'>Log In</NavLink>
                }
            </div>
        </div>
    );
};

export default NavigationBar;