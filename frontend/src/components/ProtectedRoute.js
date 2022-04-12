import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useContextData} from "../hooks/useContextData";

const ProtectedRoute = ({ allowedRole }) => {
    const {role} = useContextData();
    const location = useLocation();
    return (
           allowedRole.find(item => item===role)
           ?<Outlet/>
           :<Navigate to="/notfound" replace state={{from: location}}/>
    )
}

export default ProtectedRoute;