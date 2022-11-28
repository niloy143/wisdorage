import React from 'react';
import useTitle from '../../hooks/useTitle';
import BookCategories from '../Home/BookCategories';

const Categories = () => {
    useTitle('Categories');
    return (
        <div>
            <BookCategories />
        </div>
    );
};

export default Categories;