import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { MdVerifiedUser } from 'react-icons/md';
import ConfirmModal from '../../components/ConfirmModal';

const AllSeller = () => {
    const [modalData, setModalData] = useState(null);
    const { user } = useContext(WisdorageContext);
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers', user?.email],
        queryFn: () => fetch(`http://localhost:1234/users?role=seller&email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const verifySeller = ({ email, name }) => {
        fetch(`http://localhost:1234/user/verify/${email}?email=${user?.email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ verified }) => {
                if (verified) {
                    toast.success(`${name} is now a verified seller.`);
                    refetch();
                }
                else {
                    toast.error('Something went wrong!')
                }
            })
            .catch(() => toast.error('Something went wrong!'))
    }

    const cancelVerified = ({ email, name }) => {
        fetch(`http://localhost:1234/user/cancel-verified/${email}?email=${user?.email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ cancelled }) => {
                if (cancelled) {
                    toast.success(`${name} is now a normal seller.`);
                    refetch();
                }
                else {
                    toast.error('Something went wrong!')
                }
            })
            .catch(() => toast.error('Something went wrong!'))
    }

    return (
        <div>
            <h2 className='text-3xl py-6 font-semibold text-center'>All Seller List</h2>
            <div className='w-11/12 mx-auto'>
                {
                    isLoading ? <Loader section /> : <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Seller</th>
                                    <th>Email</th>
                                    <th>Verify</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sellers.map(({ _id, displayName, email, photoURL, role, verified }) => <tr key={_id}>

                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={photoURL} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="w-full text-end flex items-center justify-end gap-1 font-semibold">
                                                        <span>{displayName}</span>
                                                        <span>{<span className="tooltip flex items-center" data-tip={`${!!verified ? "Verified Seller" : "Not Verified"}`}><MdVerifiedUser className={!!verified ? 'text-blue-600' : 'text-gray-400'} /></span>}</span>
                                                    </div>
                                                    <div className="text-sm opacity-50">{role.toUpperCase()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td> {email} </td>
                                        <td>
                                            {
                                                verified ? <label htmlFor='confirm-modal' className='btn btn-sm btn-error btn-block' onClick={() => setModalData({
                                                    email, name: displayName,
                                                    action: cancelVerified,
                                                    setData: setModalData,
                                                    message: `Make sure you are aware of that ${displayName} will not be verified seller anymore.`,
                                                    button: { bg: 'btn-error', text: 'Cancel Verified' }
                                                })}>Cancel Verified</label> :
                                                    <label htmlFor='confirm-modal' className='btn btn-sm btn-block bg-blue-500 border-0 text-white' onClick={() => setModalData({
                                                        email, name: displayName,
                                                        action: verifySeller,
                                                        setData: setModalData,
                                                        message: `Make sure you are aware of that ${displayName} will be a verified seller.`,
                                                        button: { bg: 'bg-blue-500 border-0 text-white', text: 'Verify' }
                                                    })}>Verify</label>
                                            }
                                        </td>
                                        <td>
                                            <button className='btn btn-sm btn-error'>Delete</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <Toaster position='bottom-left' />
            {
                modalData && <ConfirmModal data={modalData} />
            }
        </div>
    );
};

export default AllSeller;