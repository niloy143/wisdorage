import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { WisdorageContext } from "../ContextProvider/ContextProvider";
import useRoleCheck from "../hooks/useRoleCheck";

const AdminRoute = ({ children }) => {
    const { user } = useContext(WisdorageContext);
    const [role, loading] = useRoleCheck(user?.email);

    return loading ? <Loader body /> : role === 'admin' ? children : <Navigate to="/" />
};

export default AdminRoute;