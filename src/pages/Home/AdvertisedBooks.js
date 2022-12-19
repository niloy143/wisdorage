import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Book from '../../components/Book';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const AdvertisedBooks = () => {
    const { user, userLoading } = useContext(WisdorageContext);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['advertised'],
        queryFn: () => axios.get(`https://wisdorage-server.vercel.app/ad/books`)
    })

    return (
        isLoading || userLoading ? <Loader section /> : !(data.data?.length) || data.data?.filter(({ available }) => !!available).length === 0 ? <></> :
            <div className='my-12 sm:my-24'>
                <h2 className='text-3xl sm:text-4xl font-bold text-center my-8 sm:my-12'>Advertised Books</h2>
                <div className='px-3 flex justify-center flex-wrap gap-5'>
                    {
                        data.data.filter(({ available, reportedBy }) => !!available && (!reportedBy || !(reportedBy.includes(user?.email)))).map(book => <Book key={book._id} book={book} user={user} refetch={refetch} />)
                    }
                </div>
            </div>
    );
};

export default AdvertisedBooks;