import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const MyBooks = () => {
    const { user } = useContext(WisdorageContext);
    const [modalData, setModalData] = useState(null);
    const { data: books, isLoading, refetch } = useQuery({
        queryKey: ['books', 'seller', user?.email],
        queryFn: () => fetch(`http://localhost:1234/my-books?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const advertise = ({ _id }) => {
        fetch(`http://localhost:1234/ad/book/${_id}?email=${user?.email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (modifiedCount > 0) {
                    toast.success('Advertised Successfully.');
                    refetch();
                }
                else {
                    toast.error('Something went wrong!');
                }
            })
            .catch(() => toast.error('Something went wrong!'))
    }

    return (
        <>
            {
                isLoading ? <Loader body /> : !books?.length ? <h2 className='text-center my-12 text-2xl sm:text-3xl text-gray-500 font-semibold'>No Books to Show!</h2> : <div className='my-12'>
                    <h2 className='text-3xl text-gray-700 my-8 text-center'>Your Books</h2>
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL.</th>
                                    <th>Book</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Advertisement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map(({ _id, title, picture, advertised, available }, i) => <tr key={_id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img className='w-12' src={picture} alt={title} />
                                        </td>
                                        <td>{title}</td>
                                        <td>{available ? 'Available' : 'Sold'}</td>
                                        <td>
                                            <label htmlFor='' className='btn btn-sm mr-1'>Edit</label>
                                        </td>
                                        <td className='text-center'>
                                            {
                                                advertised ? <i>Advertised</i> :
                                                    <label htmlFor='my-books' className='btn btn-sm btn-block' onClick={() => setModalData({
                                                        _id,
                                                        action: advertise,
                                                        setData: setModalData,
                                                        message: `Your book "${title}" will be advertised.`,
                                                        button: { bg: 'btn-accent', text: 'Advertise' }
                                                    })}>Advertise</label>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <Toaster position='bottom-left' />
            {
                modalData && <ConfirmModal data={modalData} modalId="my-books" />
            }
        </>
    );
};

export default MyBooks;