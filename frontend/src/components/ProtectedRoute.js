import { Outlet } from "react-router-dom";
import { useContextData } from "../hooks/useContextData";

const ProtectedRoute = ({ allowedRole }) => {
  const { role } = useContextData();

  return role && allowedRole.find((item) => item === role) && (
    <Outlet />
  )
};

export default ProtectedRoute;
