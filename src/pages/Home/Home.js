import React from 'react';
import AdvertisedBooks from './AdvertisedBooks';
import Banner from './Banner';
import BookCategories from './BookCategories';
import WhyWisdorage from './WhyWisdorage';

const Home = () => {
    return (
        <div>
            <Banner />
            <AdvertisedBooks />
            <BookCategories />
            <WhyWisdorage />
        </div>
    );
};

export default Home;