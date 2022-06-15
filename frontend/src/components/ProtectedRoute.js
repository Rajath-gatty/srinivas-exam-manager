import { Navigate, Outlet } from "react-router-dom";
import { useContextData } from "../hooks/useContextData";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const ProtectedRoute = ({ allowedRole }) => {

  const { role,token } = useContextData();
  return allowedRole.find((item) => item === role) ? (
    <Outlet />
  ) :token?<PageNotFound />:<Navigate to="/login"/>;
};

export default ProtectedRoute;
