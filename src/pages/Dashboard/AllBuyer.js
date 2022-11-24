import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';

const AllBuyer = () => {
    const { user } = useContext(WisdorageContext);
    const { data: buyers, isLoading } = useQuery({
        queryKey: ['buyers', user?.email],
        queryFn: () => fetch(`http://localhost:1234/buyers?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

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
                                    buyers.map(({ _id, displayName, email, photoURL, role }) => <tr key={_id}>

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
                                            <button className='btn btn-sm btn-error'>Delete</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default AllBuyer;