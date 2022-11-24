import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { WisdorageContext } from "../ContextProvider/ContextProvider";
import useRoleCheck from "../hooks/useRoleCheck";

const BuyerRoute = ({ children }) => {
    const { user } = useContext(WisdorageContext);
    const [role, loading] = useRoleCheck(user?.email);

    return loading ? <Loader /> : role === 'buyer' ? children : <Navigate to="/" />
};

export default BuyerRoute;