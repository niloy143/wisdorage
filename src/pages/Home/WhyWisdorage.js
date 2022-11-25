import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const WhyWisdorage = () => {
    const { user, userLoading } = useContext(WisdorageContext);
    const navigate = useNavigate();
    return (
        <div className="hero min-h-[50vh] my-12">
            <div className="hero-content flex-col lg:flex-row-reverse gap-5">
                <img src="https://www.pngitem.com/pimgs/m/381-3815761_stack-of-books-clipart-blue-transparent-background-books.png" className="max-w-sm w-full rounded-lg shadow-2xl" alt="" />
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold">Why Wisdorage</h1>
                    <p className="py-6">Because we provide different kinds of books from several countries by famous and well-known writers. We also provide flexible price for certain books. We only collect un-corrupted books meaning they are fresh like new.</p>
                    <button className="btn btn-primary" onClick={() => navigate(`${user ? '/categories' : '/register'}`)}>{userLoading ? <Loader /> : user ? 'Continue' : 'Register Now'}</button>
                </div>
            </div>
        </div>
    );
};

export default WhyWisdorage;