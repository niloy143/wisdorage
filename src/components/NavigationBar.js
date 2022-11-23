import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { WisdorageContext } from '../ContextProvider/ContextProvider';

const NavigationBar = () => {
    const { user } = useContext(WisdorageContext);

    const navItems = <>
        <li><NavLink to="/home" className={`rounded-md`}>Home</NavLink></li>
        <li><NavLink to="/blog" className={`rounded-md`}>Blog</NavLink></li>
        <li><NavLink to="/about" className={`rounded-md`}>About</NavLink></li>
        <li><NavLink to="/contact" className={`rounded-md`}>Contact</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    user ? <div className="dropdown">
                        <label tabIndex={0}>
                            <div className="avatar transition active:scale-95 cursor-pointer">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={undefined || "https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg"} alt="" />
                                </div>
                            </div>
                        </label>
                        <div tabIndex={0} className="dropdown-content p-2 shadow rounded-box w-52">
                            <ul className='menu'>
                                <li><button className='btn btn-primary rounded-md text-white'>Log Out</button></li>
                            </ul>
                        </div>
                    </div> : <button className='btn btn-primary'>Log In</button>
                }
            </div>
        </div>
    );
};

export default NavigationBar;