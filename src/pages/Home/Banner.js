import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const Banner = () => {
    const { user, userLoading } = useContext(WisdorageContext);
    const navigate = useNavigate();
    return (
        <div className="hero min-h-[50vh]" style={{ backgroundImage: `url("https://i.ibb.co/CPHrgYp/2862102.webp")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-2xl sm:text-4xl font-bold">Welcome to Wisdorage</h1>
                    <p className="mb-5">Wisdorage is book resale platform. You can sell your book which you already read and want to handover to others. Also you can buy your favorite books from here.</p>
                    <button className="btn btn-primary" onClick={() => navigate(`${user ? '/categories' : '/register'}`)}>{userLoading ? <Loader /> : user ? 'Continue' : 'Register Now'}</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;