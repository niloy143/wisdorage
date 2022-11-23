import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const MainLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <NavigationBar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;