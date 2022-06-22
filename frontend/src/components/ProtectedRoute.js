import { Outlet,Navigate } from "react-router-dom";
import { useContextData } from "../hooks/useContextData";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const ProtectedRoute = ({ allowedRole }) => {
  const { role } = useContextData();

  return role && allowedRole.find((item) => item === role) ? (
    <Outlet />
  ):<Navigate to="/login"/>
};

export default ProtectedRoute;
