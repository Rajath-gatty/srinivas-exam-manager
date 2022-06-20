import { Outlet,Navigate } from "react-router-dom";
import { useContextData } from "../hooks/useContextData";

const ProtectedRoute = ({ allowedRole }) => {

  const { role } = useContextData();
  return allowedRole.find((item) => item === role) ? (
    <Outlet />
  ):<Navigate to="/login"/>;
};

export default ProtectedRoute;
