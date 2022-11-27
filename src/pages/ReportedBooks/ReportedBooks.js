import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const ReportedBooks = () => {
    const { user } = useContext(WisdorageContext);
    const { data: books, isLoading, refetch } = useQuery({
        queryKey: ['reported-books'],
        queryFn: () => fetch(`http://localhost:1234/reported-books?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const removeReport = id => {
        fetch(`http://localhost:1234/remove-report/${id}?email=${user?.email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (modifiedCount > 0) {
                    toast.success('Report is removed successfully')
                    refetch();
                }
                else {
                    toast.error('Something went wrong!')
                }
            })
            .catch(() => toast.error('Something went wrong!'))
    }

    return (
        <>
            {
                isLoading ? <Loader body /> : !books?.length ? <h2 className='text-center my-12 text-2xl sm:text-3xl text-gray-500 font-semibold'>No Books to Show!</h2> : <div className='my-12'>
                    <h2 className='text-3xl text-gray-700 my-8 text-center'>Reported Books Books</h2>
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL.</th>
                                    <th>Book</th>
                                    <th>Title</th>
                                    <th>Reported By</th>
                                    <th>Remove Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map(({ _id, title, picture, reportedBy }, i) => <tr className='border-b border-gray-300' key={_id}>
                                        <th className='border-0'>{i + 1}</th>
                                        <td className='border-0'>
                                            <img className='w-12' src={picture} alt={title} />
                                        </td>
                                        <td className='border-0'>{title}</td>
                                        <td className='grid border-0'>{
                                            reportedBy.map((user, i) => <span key={i}>{user}</span>)
                                        }</td>
                                        <td className='border-0'><button className='btn btn-primary btn-sm' onClick={() => removeReport(_id)}>Remove</button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <Toaster position='bottom-left' />
        </>
    );
};

export default ReportedBooks;