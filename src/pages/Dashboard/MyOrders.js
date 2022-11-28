import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';
import PaymentModal from '../../components/PaymentModal';
import useTitle from '../../hooks/useTitle';

const MyOrders = () => {
    useTitle('My Orders');
    const [modalData, setModalData] = useState(null);
    const [paymentModal, setPaymentData] = useState(null);
    const { user } = useContext(WisdorageContext);
    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => fetch(`https://wisdorage-server.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const cancelOrder = ({ id }) => {
        fetch(`https://wisdorage-server.vercel.app/order/${id}?email=${user?.email}`, {
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
                                    <th>Transaction ID</th>
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
                                                paid ? <span className='bg-green-500 text-white'>{paid.transactionId}</span> : <label htmlFor='payment-modal' className='btn btn-sm btn-neutral' onClick={() => setPaymentData({
                                                    _id, setPaymentData, title, resalePrice, email: user.email, refetch
                                                })}>Pay Now</label>
                                            }
                                        </td>
                                        <td><label htmlFor='cancel-order' className='btn btn-error btn-sm' onClick={() => setModalData({
                                            id: bookId,
                                            action: cancelOrder,
                                            setData: setModalData,
                                            message: `Make sure you are aware of that your order for ${title} will be cancelled and anyone could buy this book after you cancel.`,
                                            button: { bg: 'btn-error', text: 'Cancel Order' }
                                        })}>Cancel Order</label></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <Toaster position='bottom-left' />
            {
                modalData && <ConfirmModal data={modalData} modalId="cancel-order" />
            }
            {
                paymentModal && <PaymentModal data={paymentModal} />
            }
        </>
    );
};

export default MyOrders;