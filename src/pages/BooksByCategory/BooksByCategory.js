import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Book from '../../components/Book';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const BooksByCategory = () => {
    const categoryId = useLoaderData();
    const { user } = useContext(WisdorageContext);

    const { data: books, isLoading, refetch } = useQuery({
        queryKey: [categoryId],
        queryFn: () => fetch(`https://wisdorage-server.vercel.app/books/${categoryId}?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    return (
        isLoading ? <Loader body /> : !books?.length ? <div className='h-[80vh] flex items-center justify-center text-3xl text-gray-400 font-semibold'> Nothing to show!</div> :
            <div className='my-12'>
                <h2 className='text-3xl sm:text-5xl px-5 font-bold mb-5'>{categoryId.split('-').map(w => w.split('')[0].toUpperCase() + w.slice(1, w.length)).join(' ')}</h2>
                <div className='mx-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        books.filter(({ available }) => !!available).map(book => <Book key={book._id} book={book} user={user} refetch={refetch} />)
                    }
                </div>
            </div >
    );
};

export default BooksByCategory;