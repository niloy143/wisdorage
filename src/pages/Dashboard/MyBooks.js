import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const MyBooks = () => {
    const { user } = useContext(WisdorageContext);
    const [advertiseModal, setAdvertiseModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
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
                                    books.map(({ _id, title, picture, resalePrice, location, advertised, available }, i) => <tr key={_id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img className='w-12' src={picture} alt={title} />
                                        </td>
                                        <td>{title}</td>
                                        <td>{available ? 'Available' : <i>Unavailable</i>}</td>
                                        <td>
                                            <label htmlFor='edit-modal' className='btn btn-sm mr-1' onClick={() => setEditModal({
                                                _id, title, resalePrice, location, available, email: user?.email, refetch,
                                                close: setEditModal
                                            })}>Edit</label>
                                        </td>
                                        <td className='text-center'>
                                            {
                                                !available ? <i>Unavailable</i> : advertised ? <i>Advertised</i> :
                                                    <label htmlFor='advertise' className='btn btn-sm btn-block' onClick={() => setAdvertiseModal({
                                                        _id,
                                                        action: advertise,
                                                        setData: setAdvertiseModal,
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
            {advertiseModal && <ConfirmModal data={advertiseModal} modalId="advertise" />}
            {editModal && <EditModal data={editModal} />}
        </>
    );
};

const EditModal = ({ data: { _id, title, close, resalePrice, location, available, email, refetch } }) => {
    const [status, setStatus] = useState(available);
    const [saving, setSaving] = useState(false);

    const handleSave = e => {
        e.preventDefault();
        setSaving(true);
        const modifications = {
            _id,
            resalePrice: parseInt(e.target.resalePrice.value),
            location: e.target.location.value,
            available: status
        }

        fetch(`http://localhost:1234/edit/book/${_id}?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            },
            body: JSON.stringify(modifications)
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (modifiedCount > 0) {
                    toast.success('Saved Successfully');
                    refetch();
                    close(null);
                }
                else {
                    toast.error('Something went wrong!')
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setSaving(false))
    }

    return (
        <>
            <input type="checkbox" id="edit-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close(null)}>✕</button>
                    <h2 className='text-3xl font-semibold text-center my-5'>{title}</h2>
                    <form className='w-full flex flex-col' onSubmit={handleSave}>
                        <label className='label font-semibold text-lg mt-4'>Resale Price: </label>
                        <input className='input input-bordered' name="resalePrice" type="number" placeholder='Resale price' defaultValue={resalePrice} required />
                        <label className='label font-semibold text-lg mt-4'>Location: </label>
                        <input className='input input-bordered' name="location" type="text" placeholder='Resale price' defaultValue={location} required />
                        <label className='label font-semibold text-lg mt-4'>Status: </label>
                        <div className='flex items-center text-lg gap-3'>
                            <span>Unavailable</span>
                            <input type="checkbox" className="toggle" defaultChecked={status} onChange={() => setStatus(!status)} />
                            <span>Available</span>
                        </div>
                        <div className='flex justify-end mt-12'>
                            <button className='btn btn-success text-white btn-wide' type='submit' disabled={saving}>{saving ? <Loader /> : 'Save'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MyBooks;