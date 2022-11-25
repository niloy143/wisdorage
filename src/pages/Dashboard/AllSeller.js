import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';
import Loader from '../../components/Loader';

const AllSeller = () => {
    const { user } = useContext(WisdorageContext);
    const { data: sellers, isLoading } = useQuery({
        queryKey: ['sellers', user?.email],
        queryFn: () => fetch(`https://wisdorage-server.vercel.app/sellers?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

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
                                                    <div className="font-bold">{displayName}</div>
                                                    <div className="text-sm opacity-50">{role.toUpperCase()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td> {email} </td>
                                        <td>
                                            {
                                                verified ? <i>Verified</i> : <button className='btn btn-sm bg-blue-500 border-0 text-white'>Verify</button>
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
        </div>
    );
};

export default AllSeller;