import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const BookCategories = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get(`https://wisdorage-server.vercel.app/categories`)
    })
    const navigate = useNavigate();

    return (
        isLoading ? <Loader section /> : !(data?.data?.length) ? <></> :
            <div className='my-24'>
                <h2 className='text-3xl sm:text-4xl my-12 text-center font-bold'>Select a Category</h2>
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3 my-12`}>
                    {
                        data.data.map(({ categoryId, name, des, bgImg }) => <div className="card max-w-xs mx-auto bg-base-100 shadow-xl image-full" key={categoryId}>
                            <figure><img src={bgImg} alt={name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-white text-2xl">{name}</h2>
                                <p className='text-white/90'>{des}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => navigate(`/books/${categoryId}`)}>View</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
    );
};

export default BookCategories;