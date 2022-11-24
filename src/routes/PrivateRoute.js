import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { WisdorageContext } from '../ContextProvider/ContextProvider';

const PrivateRoute = ({ children }) => {
    const { userLoading, user } = useContext(WisdorageContext);
    const { pathname } = useLocation();
    
    return userLoading ? <Loader body /> : user ? children : <Navigate to="/login" state={pathname} />
};

export default PrivateRoute;