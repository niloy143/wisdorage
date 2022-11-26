import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MdMenuOpen } from 'react-icons/md';
import { WisdorageContext } from '../ContextProvider/ContextProvider';
import useRoleCheck from '../hooks/useRoleCheck';
import Loader from '../components/Loader';

const DashboardLayout = () => {
    const { user, logOut } = useContext(WisdorageContext);
    const [role, loading] = useRoleCheck(user?.email);

    return (
        loading ? <Loader body /> : !role ? <p className='h-[80vh] text-center my-12 text-gray-500 italic'>Something Went Wrong, Please <button className='text-blue-500 not-italic hover:text-black' onClick={logOut}>Log Out</button> and log back in. </p> :
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="dashboard-drawer" className="btn btn-primary m-2 drawer-button lg:hidden"><MdMenuOpen className='text-xl' /></label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu gap-1 p-4 bg-base-100 lg:bg-none max-w-[90vw] w-80 text-base-content">
                        <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
                        {
                            role === 'seller' ? <>
                                <li><NavLink to="/dashboard/my-books">My Books</NavLink></li>
                                <li><NavLink to="/dashboard/add-book">Add Book</NavLink></li>
                            </> : role === 'admin' ? <>
                                <li><NavLink to="/dashboard/all-seller">All Seller</NavLink></li>
                                <li><NavLink to="/dashboard/all-buyer">All Buyer</NavLink></li>
                                <li><NavLink to="/dashboard/reported-items">Reported Items</NavLink></li>
                            </> : <></>
                        }
                    </ul>

                </div>
            </div >
    );
};

export default DashboardLayout;