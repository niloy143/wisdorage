import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <NavigationBar />
                <div className='h-screen flex flex-col justify-center items-center'>
                    <img className='mx-auto' src="https://i.ibb.co/VJtqFMD/error-404-concept-illustration-114360-1811-removebg-preview.png" alt="" />
                    <h2 className='text-2xl sm:text-3xl font-semibold text-gray-500 text-center'>Page not Found</h2>
                    <NavLink className='btn btn-primary mx-auto mt-5' to="/">Back to Home</NavLink>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;