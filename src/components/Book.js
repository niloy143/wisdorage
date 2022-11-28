import { formatDistanceToNowStrict } from 'date-fns';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MdVerifiedUser } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import OrderNowModal from './OrderNowModal';
import { GoReport } from 'react-icons/go';
import ConfirmModal from './ConfirmModal';

const Book = ({ book: { _id, picture, title, writer, location, resalePrice, originalPrice, yearsOfUse, postedIn, seller, verifiedSeller, orderedBy, reportedBy }, user, refetch }) => {
    const [orderModal, setOrderModal] = useState(null);
    const [cancelModal, setCancelModal] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [reportModal, setReportModal] = useState(null);
    const navigate = useNavigate();

    const cancelOrder = ({ id }) => {
        setCancelling(true);
        fetch(`https://wisdorage-server.vercel.app/order/${id}?email=${user?.email}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ deletedCount }) => {
                if (deletedCount > 0) {
                    toast.success('Order cancelled successfully');
                    refetch();
                }
                else {
                    toast.error('Something Went Wrong!')
                }
            })
            .catch(() => toast.error('Something Went Wrong!'))
            .finally(() => setCancelling(false))
    }

    const reportBook = ({ _id, reportedBy }) => {
        fetch(`https://wisdorage-server.vercel.app/report/book/${_id}?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            },
            body: JSON.stringify(reportedBy ? [...reportedBy, user.email] : [user.email])
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (modifiedCount > 0) {
                    toast.success('Reported Successful');
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
            <div className="relative pb-16 p-3 border rounded-xl shadow-lg m-1">
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
                                    <span>{<span className="tooltip flex items-center" data-tip={`${!!verifiedSeller ? "Verified Seller" : "Not Verified"}`}><MdVerifiedUser className={!!verifiedSeller ? 'text-blue-600' : 'text-gray-400'} /></span>}</span>
                                </p>
                            </div>
                            <div className='flex gap-3 justify-between'>
                                <h3 className='font-semibold w-full'>Posted:</h3>
                                <p className='w-full text-end'>{formatDistanceToNowStrict(postedIn)} ago</p>
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
                                <p className='w-full text-end'>{yearsOfUse > 0 && yearsOfUse} {`${yearsOfUse === 1 ? 'Year' : yearsOfUse > 1 ? 'Years' : 'Less than a year'}`}</p>
                            </div>
                            <div className='flex gap-3 justify-between'>
                                <h3 className='font-semibold w-full'>Where to get from:</h3>
                                <p className='w-full text-end'>{location}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-1 absolute bottom-4 left-4 right-4 mt-3'>
                        {
                            !!orderedBy ? <label htmlFor='cancel-modal' className='btn btn-primary grow' disabled={orderedBy !== user?.email || cancelling} onClick={() => setCancelModal({
                                id: _id,
                                setData: setCancelModal,
                                action: cancelOrder,
                                message: `Make sure you are aware of that your order for ${title} will be cancelled and anyone could buy this book after you cancel.`,
                                button: {bg: 'btn-error', text: 'Cancel Order'}
                            })}>{orderedBy === user?.email ? cancelling ? <Loader /> : 'Cancel Order' : 'Ordered'}</label> : !user ? <button className='btn btn-primary grow' onClick={() => navigate('/login')}>Login to Order</button> :
                                < label htmlFor='order-modal' className='btn btn-primary grow' onClick={() => setOrderModal({ _id, buyer: user?.displayName, buyerEmail: user?.email, title, picture, location, resalePrice })}>Order Now</label>
                        }
                        <div className="tooltip" data-tip="Report">
                            <label htmlFor='report-modal' className='btn btn-primary' onClick={() => setReportModal({
                                _id, reportedBy,
                                setData: setReportModal,
                                action: reportBook,
                                message: `You will no longer be able to see or order "${title}".`,
                                button: { text: 'Report' }
                            })}><GoReport className='text-xl' /></label>
                        </div>
                    </div>
                </div>
            </div>

            {
                orderModal && <OrderNowModal orderModal={orderModal} setOrderModal={setOrderModal} refetch={refetch} />
            }
            <Toaster position='bottom-left' />
            {
                reportModal && <ConfirmModal data={reportModal} modalId="report-modal" />
            }
            {
                cancelModal && <ConfirmModal data={cancelModal} modalId="cancel-modal" />
            }
        </>
    );
};

export default Book;