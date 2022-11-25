import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';

const OrderNowModal = ({ orderModal: { _id, buyer, buyerEmail, title, location, resalePrice }, setOrderModal, refetch }) => {
    const [ordering, setOrdering] = useState(false);
    const orderHandler = e => {
        e.preventDefault();
        setOrdering(true);
        const orderInformation = {
            bookId: _id, buyer, buyerEmail, title, location, resalePrice,
            buyerNumber: e.target.phone.value,
            orderDate: Date.now()
        }

        fetch(`http://localhost:1234/order?email=${buyerEmail}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            },
            body: JSON.stringify(orderInformation)
        })
            .then(res => res.json())
            .then(({ acknowledged }) => {
                if (acknowledged) {
                    setOrdering(false);
                    setOrderModal(null);
                    refetch();
                    toast.success('Order placed successfully.')
                }
                else {
                    toast.error('Something Went Wrong!')
                }
            })
            .catch(() => toast.error('Something Went Wrong!'))
            .finally(() => setOrdering(false))
    }
    return (
        <>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <h2 className='text-2xl sm:text-3xl font-bold text-center my-6'>Your Order</h2>
                        <form className='flex flex-col gap-5' onSubmit={orderHandler}>
                            <div className='form-control'>
                                <label className='label font-semibold'>Book</label>
                                <input type="text" className='input input-bordered' value={title} disabled />
                            </div>
                            <div className='form-control'>
                                <label className='label font-semibold'>Handover Location</label>
                                <input type="text" className='input input-bordered' value={location} disabled />
                            </div>
                            <div className='form-control'>
                                <label className='label font-semibold'>Buyer's Name</label>
                                <input type="text" className='input input-bordered' value={buyer} disabled />
                            </div>
                            <div className='form-control'>
                                <label className='label font-semibold'>Buyer's Email</label>
                                <input type="email" className='input input-bordered' value={buyerEmail} disabled />
                            </div>
                            <div className='form-control'>
                                <label className='label font-semibold'>Buyer's Phone Number</label>
                                <input type="number" className='input input-bordered' placeholder='Enter your phone number' name="phone" required />
                            </div>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-xl text-primary font-semibold'><span className='text-neutral'>Price: </span>{resalePrice} BDT</h3>
                                <button className='btn btn-primary sm:btn-wide' type="submit" disabled={ordering}>{ordering ? <Loader /> : 'Order'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderNowModal;