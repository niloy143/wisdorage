import React from 'react';
import AdvertisedBooks from './AdvertisedBooks';
import Banner from './Banner';
import BookCategories from './BookCategories';
import WhyWisdorage from './WhyWisdorage';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    useTitle('', 'Wisdorage')
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