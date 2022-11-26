import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';

const MyOrders = () => {
    const { user } = useContext(WisdorageContext);
    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => fetch(`http://localhost:1234/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const cancelOrder = id => {
        fetch(`http://localhost:1234/order/${id}?email=${user?.email}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ deletedCount }) => {
                if (deletedCount > 0) {
                    refetch();
                    toast.success('Order cancelled successfully');
                }
                else {
                    toast.error('Something Went Wrong!')
                }
            })
            .catch(() => toast.error('Something Went Wrong!'))
    }

    return (
        <>
            {
                isLoading ? <Loader body /> : !orders?.length ? <h2 className='text-center my-12 text-2xl sm:text-3xl text-gray-500 font-semibold'>No Orders to Show!</h2> : <div className='my-12'>
                    <h2 className='text-3xl text-gray-700 my-8 text-center'>Your Orders</h2>
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL.</th>
                                    <th>Book</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(({ _id, bookId, title, picture, resalePrice, paid }, i) => <tr key={_id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img className='w-12' src={picture} alt={title} />
                                        </td>
                                        <td>{title}</td>
                                        <td>{resalePrice} BDT</td>
                                        <td>
                                            {
                                                paid ? <i>Paid</i> : <button className='btn btn-sm btn-neutral'>Pay Now</button>
                                            }
                                        </td>
                                        <td><button className='btn btn-error btn-sm' onClick={() => cancelOrder(bookId)}>Cancel Order</button></td>
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

export default MyOrders;