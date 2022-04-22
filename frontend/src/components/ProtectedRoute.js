import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useContextData} from "../hooks/useContextData";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const ProtectedRoute = ({ allowedRole }) => {
    const {role} = useContextData();
    const location = useLocation();
    return (
           allowedRole.find(item => item===role)
           ?<Outlet/>
           :<PageNotFound/>
    )
}

export default ProtectedRoute;