import { Navigate, Outlet } from "react-router-dom";
import {useContextData} from "../hooks/useContextData";

const ProtectedRoute = ({ allowedRole, ...rest }) => {
    const {role} = useContextData();

    return (
           allowedRole.find(item => item===role)?<Outlet/>:<Navigate to="/notfound" replace/>
    )
}

export default ProtectedRoute;