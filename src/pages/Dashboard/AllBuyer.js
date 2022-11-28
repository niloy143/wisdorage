import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';
import useTitle from '../../hooks/useTitle';

const AllBuyer = () => {
    useTitle('All Buyer');
    const [modalData, setModalData] = useState(null);
    const { user } = useContext(WisdorageContext);
    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers', user?.email],
        queryFn: () => fetch(`https://wisdorage-server.vercel.app/users?role=buyer&email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    const deleteUser = ({ email }) => {
        fetch(`https://wisdorage-server.vercel.app/user/${email}?email=${user?.email}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        })
            .then(res => res.json())
            .then(({ done }) => {
                if (done) {
                    toast.success(`Successfully deleted`);
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
            <h2 className='text-3xl py-6 font-semibold text-center'>All Buyer List</h2>
            <div className='w-11/12 mx-auto'>
                {
                    isLoading ? <Loader section /> : <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Buyer</th>
                                    <th>Email</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    buyers.filter(({ deleted }) => !deleted).map(({ _id, displayName, email, photoURL, role }) => <tr key={_id}>

                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={photoURL} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{displayName}</div>
                                                    <div className="text-sm opacity-50">{role.toUpperCase()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td> {email} </td>
                                        <td>
                                            <label htmlFor='confirm-delete' className='btn btn-sm btn-error' onClick={() => setModalData({
                                                email,
                                                setData: setModalData,
                                                action: deleteUser,
                                                message: `Dangerous decision! Think again and again and again before deleting ${displayName}. \n 
                                                Once you delete him, all of his data (e.g. orders, books, and etc.) will be lost forever. \n 
                                                And most dangerously, It can never be undone! \n 
                                                Think ${user.displayName} think, don't misuse your power.`,
                                                button: { bg: 'btn-error', text: `Delete ${displayName}` }
                                            })}>Delete</label>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {
                modalData && <ConfirmModal data={modalData} modalId="confirm-delete" />
            }
            <Toaster position='bottom-left' />
        </div>
    );
};

export default AllBuyer;