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
                <div className="flex items-start gap-3">
                    <img className='w-36 h-52 rounded' src={picture} alt={title} />
                    <div className='flex flex-col text-sm sm:text-base'>
                        <div>
                            <h2 className='font-semibold'>{title}</h2>
                            <h4> <small>by {writer}</small> </h4>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h3>Seller:</h3>
                            <p className='w-full flex items-center gap-1 font-semibold'>
                                <span>{seller}</span>
                                <span>{<span className="tooltip flex items-center" data-tip={`${!!verifiedSeller ? "Verified Seller" : "Not Verified"}`}><MdVerifiedUser className={!!verifiedSeller ? 'text-blue-600' : 'text-gray-400'} /></span>}</span>
                            </p>
                        </div>
                        <div className='flex gap-3 justify-between'>
                            <h3 className='font-semibold'>Resale:</h3>
                            <p>{resalePrice} BDT</p>
                        </div>
                        <div className='flex gap-3 justify-between'>
                            <h3 className='font-semibold'>Regular:</h3>
                            <p>{originalPrice} BDT</p>
                        </div>
                        <div className='flex gap-3 justify-between'>
                            <h3 className='font-semibold'>Usage:</h3>
                            <p>{yearsOfUse > 0 && yearsOfUse} {`${yearsOfUse === 1 ? 'Year' : yearsOfUse > 1 ? 'Years' : 'Less than a year'}`}</p>
                        </div>
                        <p>{location}</p>
                        <small className='text-end pt-3'>{formatDistanceToNowStrict(postedIn)} ago</small>
                    </div>
                    <div className='flex items-center gap-1 absolute bottom-2 left-3 right-3 mt-2'>
                        {
                            !!orderedBy ? <label htmlFor='cancel-modal' className='btn btn-primary grow' disabled={orderedBy !== user?.email || cancelling} onClick={() => setCancelModal({
                                id: _id,
                                setData: setCancelModal,
                                action: cancelOrder,
                                message: `Make sure you are aware of that your order for ${title} will be cancelled and anyone could buy this book after you cancel.`,
                                button: { bg: 'btn-error', text: 'Cancel Order' }
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