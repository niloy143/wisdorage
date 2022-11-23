import { Footer } from 'flowbite-react';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';

const NotFound = () => {
    return (
        <div>
            <NavigationBar />
            <h2 className='text-3xl font-semibold my-12 text-center'>Page not Found</h2>
            <Footer />
        </div>
    );
};

export default NotFound;