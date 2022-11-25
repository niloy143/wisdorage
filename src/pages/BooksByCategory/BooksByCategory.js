import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const BooksByCategory = () => {
    const categoryId = useLoaderData();
    const { user } = useContext(WisdorageContext);

    const { data: books, isLoading } = useQuery({
        queryKey: [categoryId],
        queryFn: () => fetch(`http://localhost:1234/books/${categoryId}?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    return (
        isLoading ? <Loader body /> : !books?.length ? <div className='h-[80vh] flex items-center justify-center text-3xl text-gray-400 font-semibold'> Nothing to show!</div> :
            <div className='my-12'>
                <h2 className='text-5xl font-bold mb-5'>{categoryId.split('-').map(w => w.split('')[0].toUpperCase() + w.slice(1, w.length)).join(' ')}</h2>
                <div className='mx-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        books.filter(({ available }) => !!available).map(({ _id, picture, title, writer, location, resalePrice, originalPrice, yearsOfUse, postedIn, seller, verifiedSeller }) => <div key={_id} className="relative pb-16 p-3 border rounded-xl shadow-lg m-1">
                            <div className="flex flex-col gap-3">
                                <div className='flex flex-col items-center text-center gap-5'>
                                    <img className='w-full h-full' src={picture} alt={title} />
                                    <div>
                                        <h2 className='font-semibold text-3xl'>{title}</h2>
                                        <h4> {writer} </h4>
                                    </div>
                                </div>
                                <div className='px-5 flex flex-col'>
                                    <div className='py-8 flex flex-col gap-3'>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Seller:</h3>
                                            <p className='w-full text-end flex items-center justify-end gap-1 text-lg font-semibold'>
                                                <span>{seller}</span>
                                                <span>{!!verifiedSeller && <span className="tooltip flex items-center" data-tip="Verified Seller"><MdVerifiedUser className='text-blue-600' /></span>}</span>
                                            </p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Posted In:</h3>
                                            <p className='w-full text-end'>{format(postedIn, 'PP')}</p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Resale Price:</h3>
                                            <p className='w-full text-end'>{resalePrice} BDT</p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Original Price:</h3>
                                            <p className='w-full text-end'>{originalPrice} BDT</p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Year(s) of Usage:</h3>
                                            <p className='w-full text-end'>{yearsOfUse > 0 && yearsOfUse} {`${yearsOfUse > 0 ? yearsOfUse > 1 ? 'Years' : 'Year' : 'Less than a year'}`}</p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className='font-semibold w-full'>Where to get from:</h3>
                                            <p className='w-full text-end'>{location}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className='btn btn-primary absolute bottom-4 left-4 right-4 mt-3'>Order Now</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
    );
};

export default BooksByCategory;